interface IDatePickerProps {
  // Define any props if needed in the future
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function DatePicker({
  label,
  value,
  onChange,
  id,
  ...props
}: IDatePickerProps) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={label} className=" text-gray-700 text-sx">
        {label}
      </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        {...props}
        className="border border-gray-300 rounded px-2 py-1 text-black"
      />
    </div>
  );
}
