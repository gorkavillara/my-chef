import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type InputProps = {
  name: string;
  title?: string;
  type?: string;
  placeholder?: string;
  onChange: any;
  required?: boolean;
  options?: string[];
  value: any;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
};

const Input = ({
  name,
  title = name,
  type = "text",
  placeholder,
  onChange,
  required = false,
  options = [],
  value,
  labelClassName = "",
  inputClassName = "",
  containerClassName = "",
  disabled = false,
}: InputProps) => {
  return (
    <>
      {type === "select" && (
        <label className={`flex flex-col gap-4 mx-6 ${containerClassName}`}>
          <span className={`uppercase ${labelClassName}`}>
            {`${title}${required ? "*" : ""}`}
          </span>
          <select
            disabled={disabled}
            className={`input-contact disabled:opacity-25 col-span-2 ring-indigo-200 cursor-pointer pb-6 border-b border-slate-700 outline-none ${inputClassName}`}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
          >
            <option value={null}></option>
            {options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}

      {type === "chip-select" && (
        <label className={`flex flex-col gap-4 mx-6 ${containerClassName}`}>
          <span className={`uppercase ${labelClassName}`}>{title}</span>
          <div className="flex flex-wrap gap-1">
            {options.map((option, i) => (
              <button
                key={i}
                disabled={disabled}
                className={`${
                  value.includes(option) ? "bg-red-400" : "bg-slate-300"
                } text-white py-1 px-2 disabled:opacity-25  rounded-full`}
                onClick={() => !disabled && onChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </label>
      )}
      {type === "textarea" && (
        <label
          className={`grid grid-cols-1 md:grid-cols-3 place-items-stretch gap-4 ${containerClassName}`}
        >
          <span
            className={`uppercase text-xs md:normal-case md:text-base place-self-start self-center ${labelClassName}`}
          >
            {`${title}${required ? "*" : ""}`}
          </span>
          <textarea
            disabled={disabled}
            className={`input-contact disabled:opacity-25 col-span-2 ring-indigo-200 ${inputClassName}`}
            placeholder={placeholder}
            rows={3}
            name={name}
            onChange={onChange}
            value={value}
          ></textarea>
        </label>
      )}
      {(type === "text" ||
        type === "number" ||
        type === "email" ||
        type === "password") && (
        <label className={`flex flex-col gap-4 mx-6 ${containerClassName}`}>
          <span className={`uppercase text-lg ${labelClassName}`}>
            {`${title}${required ? "*" : ""}`}
          </span>
          <input
            disabled={disabled}
            className={`input-contact disabled:opacity-25 col-span-2 ring-indigo-200 outline-none pb-6 border-b border-slate-700 ${inputClassName}`}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            required={required && typeof value !== "undefined" && value === ""}
            value={value}
          ></input>
        </label>
      )}
      {type === "datetime" && (
        <label className={`flex flex-col gap-4 mx-6 ${containerClassName}`}>
          <span className={`uppercase text-lg ${labelClassName}`}>
            {`${title}${required ? "*" : ""}`}
          </span>
          <DatePicker
            selected={value}
            onChange={onChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full border-b border-slate-700 pb-6 outline-none"
          />
        </label>
      )}
      {type === "toggle" && (
        <label className={`flex items-center gap-4 mx-6 ${containerClassName}`}>
          <span className={`uppercase text-lg ${labelClassName}`}>
            {`${title}${required ? "*" : ""}`}
          </span>
          <button
            className="relative disabled:opacity-25"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onChange();
            }}
          >
            <span
              className={`block w-10 h-6 ${
                value === true ? "bg-green-500" : "bg-slate-400"
              } bg-green-300 rounded-full shadow-inner transition duration-300 ease-in-out`}
            ></span>
            <span
              className={`absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 bg-white ${
                value === true && "translate-x-full"
              } focus-within:shadow-outline transition-transform duration-300 ease-in-out`}
            ></span>
          </button>
        </label>
      )}
    </>
  );
};

export default Input;
