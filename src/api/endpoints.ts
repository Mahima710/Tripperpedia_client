import axios from "axios";
import {
  IActivityPlaces,
  IAdventureActivities,
  IGetAllActivitiesStates,
  ILoginFormData,
  IRentalActivities,
  ISignUpData,
} from "data/types";

export const API_BASE_URL = "https://admin.tripperpedia.in/api/v1";

export const getAllActivitiesPlaces = async (): Promise<IActivityPlaces[]> => {
  const res = await axios.get(`${API_BASE_URL}/user/get_activities_places`);
  return res.data.data;
};

export const getAllAdventureActivities = async (): Promise<
  IAdventureActivities[]
> => {
  const res = await axios.get(
    `${API_BASE_URL}/user/get_all_adventure_activities/null`
  );
  return res.data.data;
};

export const getAllRentalActivities = async (): Promise<
  IRentalActivities[]
> => {
  const res = await axios.get(
    `${API_BASE_URL}/user/get_all_rental_activities/null`
  );
  return res.data.data;
};

export interface ActivitystatesProps {
  state: string;
}

export const getAllActivitiesStates = async (
  state: string
): Promise<IGetAllActivitiesStates[]> => {
  const res = await axios.get(
    `${API_BASE_URL}/user/get_all_activities/${state}`
  );
  return res.data.data;
};

export const createNewUser = async (data: ISignUpData) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key as keyof ISignUpData]);
  });

  const res = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const loginUser = async (data: ILoginFormData) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key as keyof ILoginFormData]);
  });

  // TODO: Add FCM token fetching logic if needed
  formData.append("fcm", "");

  const res = await axios.post(`${API_BASE_URL}/user/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
