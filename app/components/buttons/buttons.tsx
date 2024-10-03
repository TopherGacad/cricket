"use client";

import { clsx } from "clsx"; 

interface ButtonProps{
    type?: "button" | "submit" | "reset"; //this is for ts
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
    type,
    disabled,   
    children,
    onClick,
    fullWidth
}) => {
    return(
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={clsx(
                `
                bg-[#61DADA]
               text-[#352F36]
                rounded-[5px]
                w-[450px]
                h-[40px]
                mt-[25px]
                cursor-pointer
                flex
                justify-center
                items-center
                `,
                disabled && "bg-[#459e9e] text-[#535053] cursor-default",
                !fullWidth && "bg-[#61DADA] text-[#352F36] w-[120px] cursor-pointer"
            )}
        >
            {children}
        </button>
    )
}

export default Buttons;