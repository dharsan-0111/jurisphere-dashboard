interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | "tabs";
    active?: boolean;
    size?: "small" | "medium" | "large";
    icon?: React.ReactNode;
    loading?: boolean;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = (props): React.JSX.Element => {
    const { children, onClick, className, disabled, type, variant, size, icon, loading, active, style } = props;

    const variantClass =
            variant === "primary"
                ? active
                ? "bg-[#F0F5F9] text-black"
                : "bg-[#FFFFFF] text-gray-600 hover:bg-[#F0F5F9]"
                : variant === "secondary"
                ? "bg-[#F1F4F5] text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    : variant === "tertiary"
                        ? "bg-gray-200 text-black"
                        :
                        variant === "tabs"
                        ? active
                        ? "bg-[#FFFFFF] text-black rounded-md"
                        : "text-gray-500 hover:text-gray-700"
                        : "";

    return (
        <button
            className={`${className} ${variantClass} ${size === "small" ? "text-sm" : size === "medium" ? "text-base" : size === "large" ? "text-lg" : ""} cursor-pointer`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={style}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {loading ? "Loading..." : children}
        </button>
    )
}

export default Button;