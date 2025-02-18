import { useQuery } from "react-query";
import { JobResponse } from "../models/jobs/JobCreationResponse.model";
import axios, { AxiosError } from "axios";
import { useConfiguration } from "../config/configuration";

export type Response = {
  jobs: JobResponse[];
  count: number;
};

export type Label = {
  name: string;
};

export interface UseJobsProps {
  perPage: number;
  page: number;
  search?: string;
  owner?: string;
  policy?: string;
  labels?: Label[];
  tiers?: string;
  namespace?: string;
  sortBy?: "rateUp" | "rateDown" | "updatedAt";
  sortOrder?: "ASC" | "DESC";
}

export const defaultUseJobsProps: UseJobsProps = {
  perPage: 200,
  page: 1,
  search: "",
  owner: "",
  policy: "",
  labels: [],
  tiers: "",
  namespace: "",
};

type UseGetJobProps = {
  searchName: string;
};

const defaultGetJobProps: UseGetJobProps = {
  searchName: "",
};

export const useGetJobs = ({ searchName }: UseGetJobProps = defaultGetJobProps) => {
  const { copybookDirectory: API_URL } = useConfiguration();

  const getJobs = async (): Promise<Response> => {
    let route = API_URL + `/job?per_page=200&page=1&policy=public`;

    if (searchName) {
      route += `&search=${searchName}`;
    }

    const fileContent = await axios.get(route).then((res) => {
      return res.data;
    });

    return fileContent;
  };

  const { isLoading, data, error } = useQuery<Response, AxiosError>(
    ["job", searchName, API_URL],
    getJobs,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchInterval: 900000,
      enabled: (API_URL?.length ?? 0) > 0,
    }
  );

  return {
    jobs: data?.jobs ?? [],
    count: data?.count ?? 0,
    error,
    loading: isLoading,
  };
};
