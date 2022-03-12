import React, { MouseEventHandler } from "react"

type ButtonProps = {
    style?: string
    onClick?: MouseEventHandler
    children?: any
    loading?: boolean
    disabled?: boolean
    className?: string
    color?: string
}

const Button = ({
    style = "primary",
    onClick = () => null,
    children,
    loading = false,
    disabled = false,
    className = "",
    color = "green",
}: ButtonProps) => {
    const btnClassName = `btn-${style}-${color}`
    console.log(btnClassName)
    return (
        <>
            {style === "primary" && (
                <button
                    className={`${btnClassName} ${
                        loading && "animate-pulse"
                    } ${className}`}
                    onClick={onClick}
                    disabled={disabled || loading}
                >
                    {loading ? "Loading..." : children}
                </button>
            )}
            {style === "secondary" && (
                <button
                    className={`${btnClassName} ${
                        loading && "animate-pulse"
                    }  ${className}`}
                    onClick={onClick}
                    disabled={disabled || loading}
                >
                    {loading ? "Loading..." : children}
                </button>
            )}
            {style === "tertiary" && (
                <button
                    className={`btn-tertiary ${
                        loading && "animate-pulse"
                    } ${className}`}
                    onClick={onClick}
                    disabled={disabled || loading}
                >
                    {loading ? "Loading..." : children}
                </button>
            )}
        </>
    )
}

export default Button
