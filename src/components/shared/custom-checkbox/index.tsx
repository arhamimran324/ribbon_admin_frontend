import React, {
  Dispatch,
  FC,
  FormEventHandler,
  HTMLProps,
  SetStateAction,
} from "react";

interface CustomCheckboxProps
  extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  label?: string;
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  ...props
}) => {
  const handleCheckboxClick: FormEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    onChange(!checked);
  };

  return (
    <div className="relative flex items-center gap-3 text-sm font-normal text-left cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxClick}
        className="hidden"
        {...props}
      />
      <div
        className={` w-4 h-4 md:w-5 md:h-5 flex justify-center items-center rounded-sm ${
          checked ? "bg-primary-light " : "border border-primary-color"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {/* Label */}
      <span className="leading-none text-[14px] font-[300] text-primary-text md:text-h6 md:text-nowrap">
        {label}
      </span>
    </div>
  );
};

export default CustomCheckbox;
