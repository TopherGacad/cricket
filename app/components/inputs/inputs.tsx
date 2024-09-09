import clsx from "clsx";
import { ReactNode } from "react"; 
import { FieldErrors } from "react-hook-form";

interface InputProps{
    title?: string;
    placeholder?: string;
    label: React.ReactNode;
    id: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    disabled?: boolean;
}

const Inputs: React.FC<InputProps> = ({
    title,
    placeholder,
    label,
    id,
    type,
    required,
    errors,
    disabled
}) => {
    return(
        <div className="flex justify-center items-center w-full mb-[30px]">
            <label htmlFor={id} className="cursor-pointer rounded-l-[10px] w-[50px] h-[44px] bg-[#FAFAFA] border-[1px] border-solid border-[#D9D9D9] flex justify-center items-center">
                {label}
            </label>

            <input
                type={type}
                id={id}
                placeholder={title}
                disabled={disabled}
                className={clsx(
                    `
                    px-[20px]
                    py-[10px]
                    form-input
                    w-[400px]
                    text-[#352F36]
                    bg-[#FAFAFA]
                    text-[#]
                    border-0
                    ring-1
                    ring-inset
                    ring-[#D9D9D9]
                    focus:ring-[#61DADA]
                    focus:ring-inset
                    focus:ring-1
                    placeholder:text-[#797979]
                    focus:outline-[#61DADA]
                    focus:outline-1
                    rounded-r-[10px]
                    `,
                    disabled && "opacity-50 cursor-default"
                )}


            />
        </div>
    );
};

export default Inputs;