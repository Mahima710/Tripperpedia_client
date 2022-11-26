import React, { FC } from "react";
import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { IGetAllActivitiesStates, IpopularActivitiesStates, StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import { useParams } from "react-router-dom";
import ActivityStateCard from "components/Statecard/ActivityStateCard";
import ActivityShowCard from "components/Statecard/ActivityShowCard";

export interface SectionGridFilterCardProps {
  heading?:string
  className?: string;
  data?: IpopularActivitiesStates[];
  state?:string
  filter?:boolean
}


const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  state,
  heading =`Explore Activities in ${state}`,
  className = "",
  data ,
  filter = true
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 state={state} heading={heading} count = {data?.length}/>

      <div className="mb-8 lg:mb-11">
       {filter && data?.length!==0 && <TabFilters />}
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((stay) => (
          <ActivityShowCard key={stay.id} data={stay} /> // data prop to be added
        ))}
      </div>

    </div>
  );
};

export default SectionGridFilterCard;
