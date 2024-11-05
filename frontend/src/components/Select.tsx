import React from "react";

interface SelectProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ name, value, onChange, options }) => (
  <div className="flex items-center border border-gray-300 rounded-md p-3 bg-white shadow-sm">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full focus:outline-none bg-transparent text-gray-800"
    >
      <option value="" disabled>Select Role</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
