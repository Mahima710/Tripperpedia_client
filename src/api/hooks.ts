import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IActivityPlaces,
  IAdventureActivities,
  IGetAllActivitiesStates,
  IRentalActivities,
} from "data/types";
import {
  getAllActivitiesPlaces,
  getAllActivitiesStates,
  getAllAdventureActivities,
  getAllRentalActivities,
} from "./endpoints";

// ---- Activity Places ----
export const useGetAllActivitiesPlaces = () =>
  useQuery<IActivityPlaces[]>(
    ["get-all-activities-places"],
    getAllActivitiesPlaces
  );

// ----Adventure Activity  ----

export const useGetAllAdventureActivities = (
  options: UseQueryOptions<IAdventureActivities[]> = {}
) =>
  useQuery<IAdventureActivities[]>(
    ["get-all-adventure-activities"],
    getAllAdventureActivities,
    options
  );

// ----Rental Activity  ----
export const useGetAllRentalActivities = (
  options: UseQueryOptions<IRentalActivities[]> = {}
) =>
  useQuery<IRentalActivities[]>(
    ["get-all-rental-activities"],
    getAllRentalActivities,
    options
  );

//-----State Data------

export const useGetAllActivitiesStates = (state: string = "") =>
  useQuery<IGetAllActivitiesStates[]>(
    ["get-individual-state-activities", state],
    () => getAllActivitiesStates(state)
  );
