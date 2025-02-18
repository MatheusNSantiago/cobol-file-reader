import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useConfiguration } from "../config/configuration";

type UseGetJobDocumentationProps = {
  path: string;
  versionTag: string;
  file: "readme" | "gitlab" | "changelog";
};

export const useGetJobFile = ({ path, versionTag, file }: UseGetJobDocumentationProps) => {
  // const { API_URL } = useConfiguration();
  const { copybookDirectory: API_URL } = useConfiguration();

  const getOneJobFile = async (): Promise<string> => {
    const fileType = file === "gitlab" ? "" : `?file=${file}`;

    const route = API_URL + `/job/r/gitlab/${path}@${versionTag}.yaml${fileType}`;

    const fileContent = await axios.get(route).then((res) => {
      return res.data;
    });
    return fileContent;
  };

  const { isLoading, data, error } = useQuery<string, AxiosError>(
    ["job", path, versionTag, file, API_URL],
    getOneJobFile,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: 900000,
      enabled: path.length > 0 && versionTag.length > 4 && (API_URL?.length ?? 0) > 0,
    }
  );

  return {
    data,
    error,
    loading: isLoading,
  };
};
