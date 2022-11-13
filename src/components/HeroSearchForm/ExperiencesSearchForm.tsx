import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import { FC } from "react";
import moment from "moment";

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultActivityValue = "Skeeing"
const defaultDate =  moment().add(2, "days")

export interface ExperiencesSearchFormProps {
  haveDefaultValue?: boolean;
}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({
  haveDefaultValue,
}) => {
  const [locationInputValue, setLocationInputValue] = useState("");
  const [dateFocused, setDateFocused] = useState<boolean>(false);
  //

  useEffect(() => {
    if (haveDefaultValue) {
      setLocationInputValue(defaultLocationValue);
    }
  }, []);

  //

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          onInputDone={() => setDateFocused(true)}
          className="flex-[1.5]"
        />

        <ExperiencesDateSingleInput
          defaultValue={defaultDate}
          defaultFocus={dateFocused}
          onFocusChange={(focus: boolean) => {
            setDateFocused(focus);
          }}
          className="flex-1"
        />
      </form>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;
