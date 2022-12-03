import { Interface } from "readline";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

export interface IActivityPlaces {
  state: string;
  image: string;
}

export interface Price {
  id: number;
  no_of_person: number;
  admin_amount: string;
  amount: string;
  status: string;
}

export interface Image {
  id: number;
  media_path: string;
  status: string;
}

export interface IAdventureActivities {
  id: number;
  activity_category: string;
  activity_adventure_type: string;
  title: string;
  status: string;
  state: string;
  city: string;
  country: string;
  location: string;
  latitude: string;
  longitude: string;
  discount: string;
  wishlist: boolean;
  price: Price[];
  video: string;
  images: Image[];
  rating?: any;
  reviews: number;
}

export interface PerHour {
  id: number;
  amount: string;
  admin_amount: string;
  status: string;
}

export interface PerDay {
  id: number;
  amount: string;
  admin_amount: string;
  status: string;
}

export interface PriceRental {
  per_hour: PerHour;
  per_day: PerDay;
}

export interface IRentalActivities {
  id: number;
  activity_category: string;
  brand: string;
  model: string;
  title: string;
  status: string;
  state: string;
  city: string;
  country: string;
  location: string;
  latitude: string;
  longitude: string;
  discount: string;
  wishlist: boolean;
  price: Price;
  video: string;
  images: Image[];
  rating?: any;
  reviews: number;
}

export interface IGetAllActivitiesStates {
  id: number;
  activity_category: string;
  title: string;
  image: string;
  status: string;
}

export interface PriceAdventure {
  id: number;
  no_of_person: number;
  admin_amount: string;
  amount: string;
  status: string;
}

export interface IperDay {
  id: number;
  admin_amount: string;
  amount: string;
  status: string;
}

export interface IpriceObject {
  per_day: IperDay;
  per_hour: IperDay;
}

export interface IpopularActivitiesStates {
  id: number;
  total_count: number;
  activity_category: string;
  activity_adventure_type: string;
  title: string;
  status: string;
  state: string;
  city: string;
  country: string;
  discount: string;
  wishlist: boolean;
  location: string;
  latitude: string;
  longitude: string;
  price: Price[] | IpriceObject;
  video: string;
  images: Image[];
}

export interface VendorBusinessDetail {
  location: string;
  latitude: string;
  longitude: string;
  business_name?: string;
}

export interface User {
  country: string;
  state: string;
  city: string;
  vendor_business_detail: VendorBusinessDetail;
}

export interface Activity {
  id: number;
  title: string;
  image: string;
  status: string;
}

export interface Brand {
  id: number;
  name: string;
  status: string;
}

export interface Model {
  id: number;
  name: string;
  type: string;
  status: string;
}

export interface VehicleDetail {
  id: number;
  year: number;
  registration_no: string;
  status: string;
}

export interface Video {
  id: number;
  media_path: string;
  status: string;
}

export interface PerDay {
  id: number;
  amount: string;
  vendor_amount: string;
  status: string;
}

export interface WhatToTake {
  id: number;
  name: string;
  status: string;
}

export interface ThingServiceIncluded {
  id: number;
  name: string;
  status: string;
}

export interface AddOn {
  id: number;
  item: string;
  price: string;
  quantity: number;
  status: string;
}

export interface ListDate {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Slot {
  activity_time_sheet_times_id: number;
  start_time: string;
  end_time: string;
  quantity: number;
  status: string;
}

export interface ActivitySlotData {
  activity_time_sheet_id: number;
  slot_type: string;
  slot: Slot[];
}

export interface IActivityDetail {
  id: number;
  activity_category: string;
  title: string;
  quantity: number;
  description: string;
  warning: string;
  status: string;
  discount: string;
  wishlist: boolean;
  user: User;
  activity: Activity;
  brand: Brand;
  age_from: number;
  age_to: number;
  model: Model;
  vehicle_details: VehicleDetail[];
  images: Image[];
  video: Video;
  list_date: ListDate[];
  price: PriceAdventure[] | PriceRental;
  what_to_take: WhatToTake[];
  thing_service_included: ThingServiceIncluded[];
  activity_slot_data: ActivitySlotData;
  add_ons: AddOn[];
  bookings: any[];
  rating?: any;
  reviews: number;
}

export interface ISignUpForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_no: string;
  dob: string;
  confirm_password: string;
}

export interface ISignUpData extends ISignUpForm {
  country_iso: string;
  country_code: string;
  device_type: "Web";
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginData extends ILoginFormData {
  fcm: string;
}
