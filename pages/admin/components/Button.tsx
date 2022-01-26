import React, { MouseEventHandler } from "react";

type ButtonProps = {
  style?: string;
  onClick?: MouseEventHandler;
  children?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  style = "primary",
  onClick = () => null,
  children,
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <>
      {style === "primary" && (
        <button
          className={`${
            loading && "animate-pulse"
          } px-4 py-1 border-2 transition border-green-400 bg-green-400 hover:border-green-500 hover:bg-green-500 active:border-green-600 active:bg-green-600 focus:ring disabled:opacity-40 ring-green-200 text-white rounded-lg outline-none ${className}`}
          onClick={onClick}
          disabled={disabled || loading}
        >
          {loading ? "Loading..." : children}
        </button>
      )}
      {style === "secondary" && (
        <button
          className={`${
            loading && "animate-pulse"
          } px-4 py-1 border-2 transition border-green-500 text-green-500 hover:border-green-600 hover:text-green-600 active:bg-green-600 active:text-white focus:ring disabled:opacity-40 ring-green-200 bg-transparent rounded-lg outline-none ${className}`}
          onClick={onClick}
          disabled={disabled || loading}
        >
          {loading ? "Loading..." : children}
        </button>
      )}
      {style === "tertiary" && (
        <button
          className={`${
            loading && "animate-pulse"
          } px-4 py-1 transition text-green-500 hover:border-green-600 hover:text-green-600 active:bg-green-600 active:text-white focus:ring disabled:opacity-40 ring-green-200 bg-transparent rounded-lg outline-none ${className}`}
          onClick={onClick}
          disabled={disabled || loading}
        >
          {loading ? "Loading..." : children}
        </button>
      )}
    </>
  );
};

export default Button;
