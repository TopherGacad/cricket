"use client";

import { clsx } from "clsx"; 

interface ButtonProps{
    type?: "button" | "submit" | "reset" | "undefined" ;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

const Buttons: React.FC<ButtonProps> = ({
    type,
    disabled,   
    children,
    onClick
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
                font-bold
                cursor-pointer
                flex
                justify-center
                items-center
                `
            )}
        >
            {children}
        </button>
    )
}

export default Buttons;