import { useQuery, useQueryClient } from "@tanstack/react-query";

type GetTableInfoResponse = {
  groupNames: string[];
};

const useGetTableInfo = (copybook: string) => {
  const queryClient = useQueryClient();

  const { data: { groupNames = [] } = {}, isFetched } =
    useQuery<GetTableInfoResponse>({
      queryKey: ["table-group"],
      queryFn: async () => {
        const url = new URL(
          `http://127.0.0.1:8000/groups?copybook=${copybook}`,
        );
        const res = await fetch(url.href);

        const groupNames = (await res.json()) as string[];

        return { groupNames };
      },
      enabled: !queryClient.getQueryData<GetTableInfoResponse>(["table-group"]),
    });

  return { groupNames, isFetched };
};

export default useGetTableInfo;
