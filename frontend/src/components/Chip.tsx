interface ChipProps {
    children: React.ReactNode;
    className?: string;
    chipColor?: "green" | "red" | "gray";
}

const Chip: React.FC<ChipProps> = (props): React.JSX.Element => {
    const { children, className, chipColor } = props;

    return (
        <div className={`${className} ${chipColor === "green" ? "bg-[#E6F6EC] text-[#008000]" : chipColor === "red" ? "bg-[#FFE3E3] text-[#FF0000]" : chipColor === "gray" ? "bg-[#F1F3F4] text-[#666666]" : ""} inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium`}>
            {children}
        </div>
    )
}

export default Chip;