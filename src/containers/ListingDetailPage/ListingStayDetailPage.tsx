import React, { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import ButtonThird from "shared/Button/ButtonThird";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import { DateRage } from "components/HeroSearchForm/AdventureSearchForm";
import StartRating from "components/StartRating/StartRating";
import GoogleMapReact from "google-map-react";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import {
  DayPickerRangeController,
  FocusedInputShape,
  isInclusivelyAfterDay,
} from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Checkbox from "shared/Checkbox/Checkbox";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import MobileFooterSticky from "./MobileFooterSticky";
import { useParams } from "react-router-dom";
import { useGetActivityDetail } from "api/hooks";
import {
  ActivitySlotData,
  IActivityDetail,
  PriceAdventure,
  PriceRental,
} from "data/types";
import { useQueryClient } from "@tanstack/react-query";
import Radio from "shared/Checkbox/Radio";
import DatePickerInput from "components/HeroSearchForm/DatePicker";

export interface ListingStayDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

export interface SlotRange {
  startTime: moment.Moment | null;
  endTime: moment.Moment | null;
}

const Amenities_demos = [
  { name: "la-key", icon: "la-key" },
  { name: "la-luggage-cart", icon: "la-luggage-cart" },
  { name: "la-shower", icon: "la-shower" },
  { name: "la-smoking", icon: "la-smoking" },
  { name: "la-snowflake", icon: "la-snowflake" },
  { name: "la-spa", icon: "la-spa" },
  { name: "la-suitcase", icon: "la-suitcase" },
  { name: "la-suitcase-rolling", icon: "la-suitcase-rolling" },
  { name: "la-swimmer", icon: "la-swimmer" },
  { name: "la-swimming-pool", icon: "la-swimming-pool" },
  { name: "la-tv", icon: "la-tv" },
  { name: "la-umbrella-beach", icon: "la-umbrella-beach" },
  { name: "la-utensils", icon: "la-utensils" },
  { name: "la-wheelchair", icon: "la-wheelchair" },
  { name: "la-wifi", icon: "la-wifi" },
  { name: "la-baby-carriage", icon: "la-baby-carriage" },
  { name: "la-bath", icon: "la-bath" },
  { name: "la-bed", icon: "la-bed" },
  { name: "la-briefcase", icon: "la-briefcase" },
  { name: "la-car", icon: "la-car" },
  { name: "la-cocktail", icon: "la-cocktail" },
  { name: "la-coffee", icon: "la-coffee" },
  { name: "la-concierge-bell", icon: "la-concierge-bell" },
  { name: "la-dice", icon: "la-dice" },
  { name: "la-dumbbell", icon: "la-dumbbell" },
  { name: "la-hot-tub", icon: "la-hot-tub" },
  { name: "la-infinity", icon: "la-infinity" },
];

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const { Category, id } = useParams();
  var PriceToAdd: { [key: string]: number } = {};

  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [slot, setSlot] = useState<SlotRange | null>(null);
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
    useState<FocusedInputShape>("startDate");
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const renderPriceInitial = () => {
    if (
      queryClient.getQueryData([
        "get-activity-details",
        Category,
        id,
      ]) as IActivityDetail
    ) {
      if (
        (
          queryClient.getQueryData([
            "get-activity-details",
            Category,
            id,
          ]) as IActivityDetail
        )?.activity_category === "Adventure"
      ) {
        return (
          +(
            (
              queryClient.getQueryData([
                "get-activity-details",
                Category,
                id,
              ]) as IActivityDetail
            )?.price as PriceAdventure[]
          )[0].amount || 0
        );
        //return +(activityDetailData?.price as PriceAdventure[])[0].amount || 0;
      } else
        return (
          +(
            (
              queryClient.getQueryData([
                "get-activity-details",
                Category,
                id,
              ]) as IActivityDetail
            )?.price as PriceRental
          ).per_day.amount || 0
        );
    } //+(activityDetailData?.price as PriceRental).per_day.amount || 0;
    return 0;
  };

  const [finalPriceSelected, setFinalPriceSelected] = useState(
    renderPriceInitial()
  ); //selected from price list
  const [addOns, setAddOns] = useState({} as { [key: string]: number });
  const [finalPricePlan, setFinalPricePlan] = useState(finalPriceSelected); //multiply with duration
  const [finalPrice, setFinalPrice] = useState(finalPricePlan); //after adding all charges
  const [AddOnPrice, setAddOnPrice] = useState(0);
  const [duration, setDuration] = useState(1);
  const {
    data: activityDetailData,
    status: activityDetailStatus,
    error: activityDetailError,
  } = useGetActivityDetail(Category, id, {
    onSuccess: (data) => {
      data.activity_category === "Adventure" &&
        setFinalPriceSelected(+(data.price as PriceAdventure[])[0].amount);
      data.activity_category === "Rental" &&
        setFinalPriceSelected(+(data.price as PriceRental).per_day.amount);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFinalPricePlan(finalPriceSelected * duration);
    setFinalPrice(finalPricePlan + AddOnPrice);
    if (AddOnPrice === 0) {
      setFinalPrice(finalPricePlan);
    }
  }, [finalPriceSelected, duration, finalPricePlan, AddOnPrice]);

  const [typeOfCharge, setTypeOfCharge] = useState("day");

  const navigateToCheckout = () => {
    console.log(duration);
    if (duration <= 0) {
      return setMessage("Invalid Duration");
    }
    if (startDate === null && selectedDate.startDate === null) {
      return setMessage("Please Select Date");
    }
    const title = activityDetailData?.title;
    const vars = {
      Category,
      title,
      finalPrice,
      finalPricePlan,
      finalPriceSelected,
      AddOnPrice,
      addOns,
      slot,
      duration,
      startDate,
      typeOfCharge,
      selectedDate,
    };
    const encoded = btoa(JSON.stringify(vars));
    navigate(`/checkout/${encoded}`);
  };

  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const renderDateAdventure = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>
                {startDate
                  ? moment(startDate).format("DD/MM/YYYY")
                  : `Select Date of Adventure`}
              </span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {activityDetailData?.list_date.length !== 0
                      ? activityDetailData?.list_date.map((item) => (
                          <div key={item.start_date} className="">
                            <Checkbox
                              name="check"
                              label={`${item.start_date}`}
                              onChange={(checked) => {
                                setStartDate(moment(item.start_date));
                              }}
                            />
                          </div>
                        ))
                      : "No Dates Available"}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setStartDate(null);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderSlots = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>
                {slot
                  ? `${moment(slot.startTime).format("H:mm:ss")} - ${moment(
                      slot.endTime
                    ).format("H:mm:ss")}`
                  : `Select Slot`}
              </span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {activityDetailData?.activity_slot_data?.slot?.length !==
                    0 ? (
                      <div className="">
                        {activityDetailData?.activity_slot_data.slot.map(
                          (item) => {
                            return (
                              <Radio
                                //make onchange
                                item={item}
                                onChange={() => {
                                  setSlot({
                                    startTime: moment(
                                      item.start_time,
                                      "HH:mm:ss"
                                    ),
                                    endTime: moment(item.end_time, "HH:mm:ss"),
                                  });
                                }}
                              />
                            );
                          }
                        )}
                      </div>
                    ) : (
                      "No Slots Available"
                    )}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setSlot(null);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderAddOns = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Add Ons</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {activityDetailData?.add_ons.map((item) => {
                      return (
                        <NcInputNumber
                          label={`${item.item} RS.${item.price}`}
                          max={item.quantity}
                          onChange={(value) => {
                            PriceToAdd[item.item] = value * +item.price;
                          }}
                          defaultValue={
                            item.item in addOns
                              ? addOns[item.item] / +item.price
                              : 0
                          }
                        />
                      );
                    })}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={async () => {
                        await setAddOnPrice(0);
                        PriceToAdd = {};
                        setAddOns({});
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={async () => {
                        console.log(PriceToAdd);
                        let totalPrice = 0;
                        for (const key in PriceToAdd) {
                          addOns[key] = PriceToAdd[key];
                        }
                        for (const key in addOns) {
                          console.log(addOns[key]);
                          totalPrice += addOns[key];
                        }
                        console.log(totalPrice);
                        await setAddOnPrice(totalPrice);
                        //await setFinalPrice(AddOnPrice + finalPricePlan); //Add Other prices also if applicable
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name={`${activityDetailData?.activity_category}`} />
          {/* <LikeSaveBtns /> */}
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {activityDetailData?.title}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          {activityDetailData?.rating && (
            <StartRating point={activityDetailData?.rating} />
          )}

          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
              {" "}
              {activityDetailData
                ? `${activityDetailData?.user.city} . ${activityDetailData?.user.state} . ${activityDetailData?.user.country}`
                : "Location"}
            </span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {activityDetailData?.user.vendor_business_detail.business_name
                ? activityDetailData?.user.vendor_business_detail.business_name
                : `Local Travels of ${activityDetailData?.user.vendor_business_detail.location}`}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {activityDetailData?.reviews}{" "}
              <span className="hidden sm:inline-block">reviews</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {/* <i className=" las la-bed text-2xl"></i> */}
            <span className=" ">
              {/* 6 <span className="hidden sm:inline-block">beds</span> */}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Activity Highlight</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>{activityDetailData?.description}</span>
        </div>
        {activityDetailData?.thing_service_included.length !== 0 && (
          <>
            <h2 className="text-xl font-semibold">Amenities Included</h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
              {activityDetailData?.thing_service_included.map((item) => (
                <div key={item.name} className="flex items-center space-x-3">
                  <i className={`text-3xl las la-suitcase-rolling`}></i>
                  <span className=" ">{item.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {activityDetailData?.model && (
          <>
            <h2 className="text-xl font-semibold">Vehicle Details</h2>
            <div className="grid grid-cols-3 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
              <div
                key={activityDetailData.model.name}
                className="flex items-center space-x-3"
              >
                <i className={`text-3xl las la-car`}></i>
                <span className=" ">
                  Model : {activityDetailData.model.name}
                </span>
              </div>
              <div
                key={activityDetailData.model.type}
                className="flex items-center space-x-3"
              >
                <i className={`text-3xl las la-car`}></i>

                <span className=" ">
                  Type : {activityDetailData.model.type}
                </span>
              </div>

              {activityDetailData?.brand.name && (
                <div
                  key={activityDetailData.brand.name}
                  className="flex items-center space-x-3"
                >
                  <i className={`text-3xl las la-car`}></i>

                  <span className=" ">
                    Brand : {activityDetailData.brand.name}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            About the property's amenities and services
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {Amenities_demos.filter((_, i) => i < 12).map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=" ">{item.name}</span>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more 20 amenities
          </ButtonSecondary>
        </div>
        {renderMotalAmenities()}
      </div>
    );
  };

  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        <i
                          className={`text-4xl text-neutral-6000 las ${item.icon}`}
                        ></i>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderAdventurePrices = (items: PriceAdventure[]) => {
    return (
      <div
        className={`text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4`}
      >
        {items.map((item, index) => {
          return (
            <div
              className={`p-4  flex justify-between items-center space-x-4 rounded-lg ${
                index % 2 === 0 ? "bg-neutral-200 dark:bg-neutral-800" : ""
              }`}
            >
              <span>
                {+item.admin_amount - +item.amount > 0 && (
                  <Badge
                    color="green"
                    name={`${Math.floor(
                      ((+item.admin_amount - +item.amount) /
                        +item.admin_amount) *
                        100
                    )} % OFF`}
                  />
                )}
              </span>
              <span className="block mt-2 w-40">
                <p className="text-neutral-500 dark:text-neutral-400">
                  {" "}
                  <s>INR {item.admin_amount}</s>{" "}
                </p>

                {`₹${item.amount} /${item.no_of_person} person`}
              </span>

              <span>
                <ButtonPrimary
                  className="bg-primary-6000"
                  onClick={() => {
                    setFinalPriceSelected(+item.amount);
                  }}
                >
                  Apply
                </ButtonPrimary>
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRentalPrices = (items: PriceRental) => {
    return (
      <div
        className={`text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4`}
      >
        <div
          className={`p-4  flex justify-between items-center space-x-4 rounded-lg`}
        >
          <span>
            {+items.per_day.admin_amount - +items.per_day.amount > 0 && (
              <Badge
                color="green"
                name={`${
                  ((+items.per_day.admin_amount - +items.per_day.amount) /
                    +items.per_day.admin_amount) *
                  100
                } % OFF`}
              />
            )}
          </span>

          {items.per_day.amount && (
            <>
              <span className="block mt-2 w-40">
                {items.per_day.admin_amount && (
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {" "}
                    <s>INR {items.per_day.admin_amount}</s>{" "}
                  </p>
                )}
                {`₹${items.per_day.amount} / day`}
              </span>
              <span>
                <ButtonPrimary
                  className="bg-primary-6000 "
                  onClick={() => {
                    setFinalPriceSelected(+items.per_day.amount);
                    setTypeOfCharge("day");
                  }}
                >
                  Apply
                </ButtonPrimary>
              </span>
            </>
          )}
        </div>

        <div
          className={`p-4  flex justify-between items-center space-x-4 rounded-lg bg-neutral-200 dark:bg-neutral-800`}
        >
          <span>
            {+items.per_hour.admin_amount - +items.per_hour.amount > 0 && (
              <Badge
                color="green"
                name={`${
                  ((+items.per_hour.admin_amount - +items.per_hour.amount) /
                    +items.per_hour.admin_amount) *
                  100
                } % OFF`}
              />
            )}
          </span>
          {items.per_hour.amount && (
            <>
              <span className="block mt-2 w-40">
                {items.per_hour.admin_amount && (
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {" "}
                    <s>INR {items.per_hour.admin_amount}</s>{" "}
                  </p>
                )}
                {`₹${items.per_hour.amount} / hour`}
              </span>
              <span>
                <ButtonPrimary
                  className="bg-primary-6000 "
                  onClick={() => {
                    setFinalPriceSelected(+items.per_hour.amount);
                    setTypeOfCharge("hour");
                  }}
                >
                  Apply
                </ButtonPrimary>
              </span>
            </>
          )}{" "}
        </div>
      </div>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Prices </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          {/* <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Friday - Sunday</span>
              <span>$219</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Rent by month</span>
              <span>-8.34 %</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div>
          </div> */}
          {activityDetailData?.activity_category === "Adventure" &&
            activityDetailData?.price &&
            renderAdventurePrices(activityDetailData.price as PriceAdventure[])}
          {activityDetailData?.activity_category === "Rental" &&
            activityDetailData.price &&
            renderRentalPrices(activityDetailData.price as PriceRental)}
        </div>
      </div>
    );
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="listingSection__wrap__DayPickerRangeController flow-root">
          <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
            <DayPickerRangeController
              startDate={selectedDate.startDate}
              endDate={selectedDate.endDate}
              onDatesChange={(date) => setSelectedDate(date)}
              focusedInput={focusedInputSectionCheckDate}
              onFocusChange={(focusedInput) =>
                setFocusedInputSectionCheckDate(focusedInput || "startDate")
              }
              initialVisibleMonth={null}
              numberOfMonths={windowSize.width < 1280 ? 1 : 2}
              daySize={getDaySize()}
              hideKeyboardShortcutsPanel={false}
              isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              Kevin Francis
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="##">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            San Diego, CA, United States of America (SAN-San Diego Intl.)
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
          <div className="rounded-xl overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
              }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={15}
              defaultCenter={{
                lat: activityDetailData?.user.vendor_business_detail?.latitude
                  ? +activityDetailData?.user.vendor_business_detail.latitude
                  : 55.9607277,
                lng: activityDetailData?.user.vendor_business_detail?.longitude
                  ? +activityDetailData?.user.vendor_business_detail.longitude
                  : 36.2172614,
              }}
            >
              <LocationMarker
                lat={
                  activityDetailData?.user.vendor_business_detail?.latitude
                    ? +activityDetailData?.user.vendor_business_detail.latitude
                    : 55.9607277
                }
                lng={
                  activityDetailData?.user.vendor_business_detail?.longitude
                    ? +activityDetailData?.user.vendor_business_detail.longitude
                    : 36.2172614
                }
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          {activityDetailData?.warning && (
            <>
              <h4 className="text-lg font-semibold">Warning</h4>
              <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                {activityDetailData?.warning}
              </span>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            </>
          )}
        </div>

        {/* CONTENT */}
        {activityDetailData?.what_to_take.length !== 0 && (
          <>
            <div>
              <h4 className="text-lg font-semibold">
                Suggested things to bring
              </h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
                {activityDetailData?.what_to_take.map((item, index) => {
                  return (
                    <div
                      className={`flex space-x-10 justify-between p-3 ${
                        index % 2 === 0
                          ? "bg-neutral-100 dark:bg-neutral-800 rounded-lg"
                          : ""
                      }`}
                    >
                      <span></span>
                      <span>
                        <i className="text-2xl las la-suitcase"></i>
                      </span>
                      <span>{item.name}</span>
                      <span></span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
          </>
        )}
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl pb-5">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            INR {finalPrice}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              {activityDetailData?.activity_category === "Adventure"
                ? ``
                : `/${typeOfCharge}`}
            </span>
          </span>
          {activityDetailData?.rating !== 0 && (
            <StartRating point={activityDetailData?.rating} />
          )}
        </div>

        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          {activityDetailData?.activity_category === "Rental" && (
            <>
              <DatePickerInput
                onChange={(date) => {
                  setStartDate(date);
                }}
                wrapClassName="divide-x divide-neutral-200 dark:divide-neutral-700 !grid-cols-1 sm:!grid-cols-2"
                anchorDirection={"right"}
                className="nc-ListingStayDetailPage__stayDatesRangeInput flex-1"
              />
            </>
          )}
          {/* {activityDetailData?.activity_category === "Adventure" && 

          } */}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        </form>
        <input
          className="p-3"
          placeholder={`Duration in ${
            activityDetailData?.activity_category === "Rental" &&
            typeOfCharge === "hour"
              ? "hours"
              : "Days"
          }`}
          type="number"
          onChange={(e) => {
            setDuration(+e.target.value);
          }}
        />

        {activityDetailData?.activity_category === "Adventure" ? (
          activityDetailData?.list_date.length !== 0 ? (
            renderDateAdventure()
          ) : (
            <DatePickerInput
              onChange={(date) => {
                setStartDate(date);
              }}
              wrapClassName="divide-x divide-neutral-200 dark:divide-neutral-700 !grid-cols-1 sm:!grid-cols-2"
              anchorDirection={"right"}
              className="nc-ListingStayDetailPage__stayDatesRangeInput flex-1"
            />
          )
        ) : (
          ""
        )}
        <div className="flex gap-10 ">
          {activityDetailData?.activity_category === "Adventure"
            ? (activityDetailData?.activity_slot_data as ActivitySlotData).slot
              ? renderSlots()
              : ""
            : ""}
          {renderAddOns()}
        </div>
        {/* SUM */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{`${finalPriceSelected} x ${duration}`}</span>
            <span>{finalPricePlan}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>0</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Add Ons</span>
            <span>{AddOnPrice}</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>INR {finalPrice}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary onClick={navigateToCheckout}>Reserve</ButtonPrimary>
        <p className="text-red-500">{message}</p>
      </div>
    );
  };

  return (
    <div
      className={`ListingDetailPage nc-ListingStayDetailPage ${className}`}
      data-nc-id="ListingStayDetailPage"
    >
      {/* SINGLE HEADER */}
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={
                  (activityDetailData as IActivityDetail)?.images[0].media_path
                }
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {(activityDetailData as IActivityDetail)?.images
              .filter((_, i) => i >= 1 && i < 3)
              .map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                >
                  <NcImage
                    containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                    className="object-cover w-full  h-full rounded-md sm:rounded-xl "
                    src={item.media_path || ""}
                  />

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleOpenModal(index + 1)}
                  />
                </div>
              ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={activityDetailData?.images.map((item) => {
            return item.media_path;
          })}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
        />
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {/* {renderSection3()} */}
          {renderSection4()}
          {/* {renderSectionCheckIndate()} */}
          {/* {renderSection5()} */}
          {/* {renderSection6()} */}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>

      {/* STICKY FOOTER MOBILE */}
      {!isPreviewMode && <MobileFooterSticky />}

      {/* OTHER SECTION */}
      {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSubscribe2 className="pt-24 lg:pt-32" />
          </div>

          {/* SECTION */}
        </div>
      )}
    </div>
  );
};

export default ListingStayDetailPage;
