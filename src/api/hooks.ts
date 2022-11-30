import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IActivityPlaces,
  IAdventureActivities,
  IGetAllActivitiesStates,
  ILoginData,
  ILoginFormData,
  IpopularActivitiesStates,
  IRentalActivities,
  ISignUpData,
} from "data/types";
import {
  createNewUser,
  getAllActivitiesPlaces,
  getAllActivitiesStates,
  getAllAdventureActivities,
  getAllPopularActivitiesStates,
  getAllRentalActivities,
  getAllRentalActivitiesStates,
  loginUser,
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

export const useGetAllActivitiesStates = (
  state: string = "",
  options: UseQueryOptions<IGetAllActivitiesStates[]> = {}
) =>
  useQuery<IGetAllActivitiesStates[]>(
    ["get-individual-state-activities", state],
    () => getAllActivitiesStates(state),
    options
  );

export const useGetAllPopularActivitiesStates = (
  state: string = "",
  options: UseQueryOptions<IpopularActivitiesStates[]> = {}
) =>
  useQuery<IpopularActivitiesStates[]>(
    ["get-all-popular-activities-states", state],
    () => getAllPopularActivitiesStates(state)
  );

export const useGetAllRentalActivitiesStates = (
  state: string = "",
  options: UseQueryOptions<IpopularActivitiesStates[]> = {}
) =>
  useQuery<IpopularActivitiesStates[]>(
    ["get-all-rental-activities-states", state],
    () => getAllRentalActivitiesStates(state)
  );

// ---- User ----
export const useSignUpNewUser = ({
  onSuccess = () => null,
}: {
  onSuccess:
    | ((data: ISignUpData, variables: ISignUpData, context: unknown) => unknown)
    | undefined;
}) =>
  useMutation<ISignUpData, any, ISignUpData>({
    mutationFn: (data) => createNewUser(data),
    onSuccess,
  });

export const useLoginUser = ({
  onSuccess = () => null,
}: {
  onSuccess:
    | ((
        data: ILoginData,
        variables: ILoginFormData,
        context: unknown
      ) => unknown)
    | undefined;
}) =>
  useMutation<ILoginData, any, ILoginFormData>({
    mutationFn: (data) => loginUser(data),
    onSuccess,
  });
