import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

interface InputProps {
  icon?: LucideIcon; // Icon component
  placeholder?: string; // Placeholder text
  type?: "text" | "password" | "email" | "tel"; // Input type
  isContentVisible?: boolean; // Toggle content visibility (for passwords)
  inputClassName?: string; // Custom classes for input styling
  name?: string;
  value?: string; // Controlled value for the input
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  placeholder = "",
  name = "text",
  type = "text",
  isContentVisible = false,
  inputClassName = "",
  value,
  onChange,
}) => {
  const [showContent, setShowContent] = useState(isContentVisible);
  const inputType = type === "password" && !showContent ? "password" : "text";

  const toggleVisibility = () => setShowContent(!showContent);

  return (
    <div className={`flex items-center border border-gray-300 rounded-md p-3 bg-white shadow-sm overflow-hidden ${inputClassName}`}>
      {/* Render the icon if provided */}
      {Icon && <Icon className="mr-2 text-gray-500 flex-shrink-0" />}

      {/* Input Field with custom styling */}
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value} // Bind to value prop
        onChange={onChange} // Attach onChange handler
        className="flex-1 min-w-0 focus:outline-none bg-transparent text-gray-800"
      />

      {/* Toggle button for password visibility */}
      {type === "password" && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="ml-2 text-gray-500 focus:outline-none flex-shrink-0"
        >
          {showContent ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
