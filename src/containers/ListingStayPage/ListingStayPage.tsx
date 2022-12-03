import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { useParams } from "react-router-dom";
import {
  useGetAllActivitiesStates,
  useGetAllPopularActivitiesStates,
  useGetAllRentalActivitiesStates,
} from "api/hooks";

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const { state } = useParams();
  const {
    data: activityPlacesData,
    status: activityPlacesStatus,
    error: activityPlacesError,
  } = useGetAllActivitiesStates(state);
  const {
    data: PopularActivityData,
    status: PopularActivityStatus,
    error: PopularActivityError,
  } = useGetAllPopularActivitiesStates(state);
  const {
    data: RentalActivityData,
    status: RentalActivityStatus,
    error: RentalActivityError,
  } = useGetAllRentalActivitiesStates(state);
  console.log(activityPlacesData);
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          state={state}
          currentPage="Adventure"
          currentTab="Adventure"
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        />

        {/* SECTION */}
        {/* <SectionGridFilterCard state={state} data={activityPlacesData} className="pb-24 lg:pb-28" /> */}
        <SectionGridFilterCard
          state={state}
          data={PopularActivityData}
          className="pb-24 lg:pb-28"
          heading={`Explore Popular Adventures in ${state}`}
        />

        <SectionGridFilterCard
          state={state}
          data={RentalActivityData}
          className="pb-24 lg:pb-28"
          heading={`All Rental Activities in ${state}`}
          filter={false}
        />

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingStayMapPage"
          />
        </div> */}

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection />
          <SectionSubscribe2 className="py-24 lg:py-28" />
        </div>

        {/* SECTION */}
        {/* <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
      </div>
    </div>
  );
};

export default ListingStayPage;
