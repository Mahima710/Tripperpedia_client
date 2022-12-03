import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import ActivityInput from "./ActivityInput";
import { FocusedInputShape } from "react-dates";
import moment from "moment";
import { FC } from "react";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface AdventureSearchFormProps {
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultActivityValue = "Skiing";

const AdventureSearchForm: FC<AdventureSearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const [locationInputValue, setLocationInputValue] = useState("");
  const [ActivityInputValue, setActivityInputValue] = useState("");

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  //
  useEffect(() => {
    if (haveDefaultValue) {
      //setDateRangeValue(defaultDateRange);
      setLocationInputValue(defaultLocationValue);
      setActivityInputValue(defaultActivityValue);
      //setGuestValue(defaultGuestValue);
    }
  }, []);
  //

  const renderForm = () => {
    return (
      <form
        className="relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 "
        style={{ width: "65vw" }}
      >
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
        />
        <ActivityInput
          defaultValue={ActivityInputValue}
          onChange={(e) => setActivityInputValue(e)}
          onInputDone={() => setDateFocused("startDate")}
          className="flex-[2]"
        />
        {/* <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onChange={(data) => setDateRangeValue(data)}
          className="flex-[2]"
    />
        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
          className="flex-[1.2]"
    />*/}
      </form>
    );
  };

  return renderForm();
};

export default AdventureSearchForm;
