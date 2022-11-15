import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FC } from "react";
import moment from "moment";
import ActivityInput from "./ActivityInput";

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultActivityValue = "Skeeing";

export interface ExperiencesSearchFormProps {
  haveDefaultValue?: boolean;
}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({
  haveDefaultValue,
}) => {
  const [locationInputValue, setLocationInputValue] = useState("");
  const [ActivityInputValue, setActivityInputValue] = useState("");

  const [dateFocused, setDateFocused] = useState<boolean>(false);
  //Heading of sections

  useEffect(() => {
    if (haveDefaultValue) {
      setLocationInputValue(defaultLocationValue);
      setActivityInputValue(defaultActivityValue);
    }
  }, []);

  //

  const renderForm = () => {
    return (
      <form
        className="relative mt-8 flex flex-col md:flex-row  rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0"
        style={{ width: "65vw" }}
      >
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          onInputDone={() => setDateFocused(true)}
          className="flex-[1.5]"
        />

        <ActivityInput
          defaultValue={ActivityInputValue}
          onChange={(e) => setActivityInputValue(e)}
          onInputDone={() => setDateFocused(true)}
          className="flex-[2]"
        />
      </form>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;
