import React, { FC, useState } from "react";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface BookARideProps {
  className?: string;
  currentTab?: SearchTab;
}

export type SearchTab = "Instant Booking" | "Outstation";

export interface FormSearchRideProps {
  tabActive: string;
}
const FormSearchRideInstant: FC = () => {
  return (
    <form className="grid grid-cols-1 gap-6" action="#" method="post">
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          Pickup Location
        </span>
        <Input
          type="text"
          placeholder="Enter Pickup Location"
          className="mt-1"
        />
      </label>
      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Drop Location
        </span>
        <Input type="text" className="mt-1" placeholder="Enter Drop Location" />
      </label>
      <ButtonPrimary type="submit">Search</ButtonPrimary>
    </form>
  );
};

const FormSearchRideOutstation: FC = () => {
  return (
    <form className="grid grid-cols-1 gap-6" action="#" method="post">
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          Pickup Location
        </span>
        <Input
          type="text"
          placeholder="Enter Pickup Location"
          className="mt-1"
        />
      </label>
      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Drop Location
        </span>
        <Input type="text" className="mt-1" placeholder="Enter Drop Location" />
      </label>
      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Start Date and time
        </span>
        <Input type="datetime-local" className="mt-1" placeholder="Enter Drop Location" />
      </label>
      <ButtonPrimary type="submit">Search</ButtonPrimary>
    </form>
  );
};

const BookARide: FC<BookARideProps> = ({
  className = "",
  currentTab = "Instant Booking",
}) => {
  const tabs: SearchTab[] = ["Instant Booking", "Outstation"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <ul className="flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar justify-center">
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? ""
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32 bg-white p-6 dark:bg-black">
        <h2 className="my-5 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Book your Ride
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {renderTab()}
          {/* FORM */}
          {tabActive === "Instant Booking" ? (
            <FormSearchRideInstant />
          ) : (
            <FormSearchRideOutstation />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookARide;
