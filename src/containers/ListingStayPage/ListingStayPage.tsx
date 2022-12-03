// Import Modules
import { FC } from "react";
import { useParams } from "react-router-dom";

// Import Components
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
// import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionGridFilterCard from "./SectionGridFilterCard";

// Import Hooks
import {
  useGetAllActivitiesStates,
  useGetAllPopularActivitiesStates,
  useGetAllRentalActivitiesStates,
} from "api/hooks";
import useFilters from "hooks/useFilters";

// Import Types
// import { IpopularActivitiesStates } from "data/types";
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

  const {
    finalData: finalPopularActivitiesData,
    filterData: filterPopularData,
    applyFilter: applyPopularFilter,
    removeFilter: removePopularFilter,
    removeFilterValue: removePopularFilterValue,
    sortData: sortPopularData,
    applySortFilter: applyPopularSortFilter,
    sortConfigs: sortPopularConfigs,
    resetSort: resetPopularSort,
    resetData: resetPopularData,
  } = useFilters({
    data: PopularActivityData ?? [],
    status: PopularActivityStatus,
  });
  const {
    finalData: finalRentalActivitiesData,
    filterData: filterRentalData,
    applyFilter: applyRentalFilter,
    removeFilter: removeRentalFilter,
    removeFilterValue: removeRentalFilterValue,
    sortData: sortRentalData,
    applySortFilter: applyRentalSortFilter,
    sortConfigs: sortRentalConfigs,
    resetSort: resetRentalSort,
    resetData: resetRentalData,
  } = useFilters({
    data: RentalActivityData ?? [],
    status: RentalActivityStatus,
  });

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
          data={finalPopularActivitiesData}
          className="pb-24 lg:pb-28"
          heading={`Explore Popular Adventures in ${state}`}
          applyFilter={applyPopularFilter}
          filterData={filterPopularData}
          removeFilter={removePopularFilter}
          removeFilterValue={removePopularFilterValue}
          sortData={sortPopularData}
          applySortFilter={applyPopularSortFilter}
          sortConfigs={sortPopularConfigs}
          resetSort={resetPopularSort}
          resetData={resetPopularData}
          filter
        />

        <SectionGridFilterCard
          state={state}
          data={finalRentalActivitiesData}
          className="pb-24 lg:pb-28"
          heading={`All Rental Activities in ${state}`}
          applyFilter={applyRentalFilter}
          filterData={filterRentalData}
          removeFilter={removeRentalFilter}
          removeFilterValue={removeRentalFilterValue}
          sortData={sortRentalData}
          applySortFilter={applyRentalSortFilter}
          sortConfigs={sortRentalConfigs}
          resetSort={resetRentalSort}
          resetData={resetRentalData}
          filter
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
