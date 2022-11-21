import axios from "axios";
import {
  IActivityPlaces,
  IAdventureActivities,
  IGetAllActivitiesStates,
  IRentalActivities,
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
