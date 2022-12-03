import React, { FC } from "react";
import { Slot } from "../../data/types";

export interface RadioProps {
  item?: Slot;
  label?: string;
  subLabel?: string;
  className?: string;
  name?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Radio: FC<RadioProps> = ({
  item,
  className = "",
  defaultChecked,
  onChange,
}) => {
  console.log(item);
  return (
    <>
      <div className={`flex text-sm sm:text-base ${className}`}>
        <input
          id={item ? `${item.start_time} - ${item.end_time}` : ""}
          name="radio"
          type="radio"
          value={item ? `${item.start_time} - ${item.end_time}` : "add slot"}
          className="focus:ring-action-primary mt-2 mb-2 h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
          defaultChecked={defaultChecked}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />

        <label
          htmlFor={item ? `${item.start_time} - ${item.end_time}` : ""}
          className="ml-3.5 flex flex-col flex-1 justify-center"
        >
          <span className=" text-neutral-900 dark:text-neutral-100">
            {item
              ? `${item.start_time} - ${item.end_time}`
              : "Something went wrong"}
          </span>
        </label>
      </div>
    </>
  );
};

export default Radio;
