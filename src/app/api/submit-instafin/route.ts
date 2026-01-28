export async function POST(req: Request) {
  try {
    const { startDate, endDate } = await req.json();

    const auth =
      "Basic " +
      btoa(
        `${process.env.NEXT_PUBLIC_INSTAFIN_API_KEY}:${process.env.NEXT_PUBLIC_INSTAFIN_SECRET_KEY}`,
      );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INSTAFIN_API_URL}/submit/instafin.ExportAllAccounts`,
      {
        method: "POST",
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            createdFrom: startDate,
            createdTo: endDate,
            accountTypes: ["Loan"],
          },
        }),
      },
    );

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
