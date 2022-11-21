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

export interface Price {
  per_hour: PerHour;
  per_day: PerDay;
}

export interface Image {
  id: number;
  media_path: string;
  status: string;
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
