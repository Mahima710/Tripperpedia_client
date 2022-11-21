import React, { FC, ReactNode, useState } from "react";
import { IAdventureActivities, IRentalActivities } from "data/types";
import HeaderFilter from "./HeaderFilter";
import {
  useGetAllAdventureActivities,
  useGetAllRentalActivities,
} from "api/hooks";
import ActivitiesCard from "components/ActivitiesCard/ActivitiesCard";
import BookARide from "components/BookaRide/BookARide";


export interface IrenderTabs {
  tabActive: string;
  AdventureActivityData: IAdventureActivities[];
}

export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

export type Itabs =
  | "Adventure Activities"
  | "Rental Activities"
  | "Taxi Services";

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Explore our Services",
  subHeading = "Popular activities and services that we present for you",
  headingIsCenter,
  tabs = ["Adventure Activities", "Rental Activities", "Taxi Services"],
}) => {
  const [tabActive, setTabActive] = useState("Adventure Activities");
  const {
    data: AdventureActivityData,
    status: AdventureActivityStatus,
    error: AdventureActivityError,
  } = useGetAllAdventureActivities({enabled:tabActive==="Adventure Activities"});
  const {
    data: RentalActivityData,
    status: RentalActivityStatus,
    error: RentalActivityError,
  } = useGetAllRentalActivities({enabled:tabActive==="Rental Activities"});
  const renderCard = (
    AdventureActivities: IAdventureActivities | IRentalActivities,
    activeTab: Itabs
  ) => {
    if (activeTab === "Adventure Activities")
      return (
        <ActivitiesCard
          key={AdventureActivities.id}
          data={AdventureActivities as IAdventureActivities}
        />
      );
    else if (activeTab === "Rental Activities")
      return (
        <ActivitiesCard
          key={AdventureActivities.id}
          data={AdventureActivities as IRentalActivities}
        />
      );
  };
 let classgrid = tabActive === "Taxi Services"? "w-50 my-20 mx-auto": `grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`;
  const renderTabs = () => {
    switch (tabActive) {
      case "Adventure Activities":
      default:
        return AdventureActivityData?.map((stay) =>
          renderCard(stay, "Adventure Activities")
        );
      case "Rental Activities":
        return RentalActivityData?.map((stay) =>
          renderCard(stay, "Rental Activities")
        );
      case "Taxi Services":
        return <BookARide />;
    }
  };
  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={tabActive}
        setTabActive={setTabActive}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={classgrid}
      >
        {renderTabs()}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
