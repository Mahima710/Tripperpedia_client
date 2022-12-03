import React, { useEffect, useState } from "react";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
  SingleDatePicker,
} from "react-dates";
import { DateRage } from "./AdventureSearchForm";
import { FC } from "react";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";
import moment from "moment";

export interface DatePickerInputProps {
  defaultValue?: moment.Moment | null;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: moment.Moment) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  className?: string;
  fieldClassName?: string;
  wrapClassName?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

const DatePickerInput: FC<DatePickerInputProps> = ({
  defaultValue = moment().add(4, "days"),
  onChange,
  defaultFocus = null,
  onFocusChange,
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding ]",
  wrapClassName = "",
  numberOfMonths,
  anchorDirection,
}) => {
  const [date, setDate] = useState(defaultValue);
  const [focus, setFocus] = useState(false);
  const windowSize = useWindowSize();

  const renderInputCheckInDate = () => {
    return (
      <div
        className={`relative flex ${fieldClassName} items-center space-x-3 cursor-pointer ${
          focus ? "nc-hero-field-focused" : " "
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <span className="block xl:text-lg font-semibold">
            {date ? date.format("DD MMM") : "Start Date"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {date ? "Start Date" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`DatePickerInput relative flex z-10 ${className} ${
        !!focus ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="absolute inset-0 flex">
        <SingleDatePicker
          id="mahima"
          date={date} // momentPropTypes.momentObj or null
          onDateChange={(date) => {
            date && setDate(date);
          }} // PropTypes.func.isRequired
          daySize={
            windowSize.width >= 1024
              ? windowSize.width > 1279
                ? 56
                : 44
              : undefined
          }
          focused={focus} // PropTypes.bool
          onFocusChange={({ focused }) => setFocus(focused)} // PropTypes.func.isRequired
          numberOfMonths={
            numberOfMonths || (windowSize.width < 1024 ? 1 : undefined)
          }
          displayFormat="DD-MMM-YYYY"
          showClearDate={true}
          isOutsideRange={() => false}
          orientation={"horizontal"}
          noBorder
          hideKeyboardShortcutsPanel
          anchorDirection={anchorDirection}
          reopenPickerOnClearDate
        />
      </div>

      <div className={`flex-1 grid grid-cols-2 relative ${wrapClassName}`}>
        {renderInputCheckInDate()}
        {/* {renderInputCheckOutDate()} */}
      </div>
    </div>
  );
};

export default DatePickerInput;
