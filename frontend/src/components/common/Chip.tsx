interface ChipProps {
    children: React.ReactNode;
    className?: string;
    chipColor?: "green" | "red" | "gray";
}

const Chip: React.FC<ChipProps> = (props): React.JSX.Element => {
    const { children, className, chipColor } = props;

    const getColorClasses = () => {
        switch (chipColor) {
            case "green":
                return {
                    bg: "bg-green-50",
                    text: "text-green-700",
                    border: "border-green-200",
                    dot: "bg-green-500"
                };
            case "red":
                return {
                    bg: "bg-red-50", 
                    text: "text-red-700",
                    border: "border-red-200",
                    dot: "bg-red-500"
                };
            case "gray":
                return {
                    bg: "bg-gray-50",
                    text: "text-gray-700", 
                    border: "border-gray-200",
                    dot: "bg-gray-500"
                };
            default:
                return {
                    bg: "bg-gray-50",
                    text: "text-gray-700",
                    border: "border-gray-200", 
                    dot: "bg-gray-500"
                };
        }
    };

    const colors = getColorClasses();

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border} ${className}`}>
            <span className={`mr-1.5 h-2 w-2 rounded-full ${colors.dot}`}></span>
            {children}
        </span>
    );
}

export default Chip;