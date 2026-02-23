"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { accounts } from "../../utils/account-list";

export default function ChangeAccountStatusPage() {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChangeAccountStatus = async () => {
    try {
      setSubmitting(true);

      const batchSize = 20; // Number of concurrent requests
      for (let i = 0; i < accounts.length; i += batchSize) {
        const batch = accounts.slice(i, i + batchSize);
        await Promise.all(
          batch.map((account) =>
            fetch("/api/change-deposit-account-status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(account),
            }),
          ),
        );
      }
    } catch (err) {
      console.log("err", err);

      throw err;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div>
        <Button
          mode="primary"
          isSubmitting={isSubmitting}
          onClick={handleChangeAccountStatus}
        >
          Closed all accounts
        </Button>
      </div>
    </div>
  );
}
