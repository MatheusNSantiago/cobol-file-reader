import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";

type TableData = {
  [key: string]: string;
};

type TableGroup = {
  data: TableData[];
  columns: MRT_ColumnDef<TableData>[];
};
export type TableQueryResponse = {
  [name: string]: TableGroup;
};

export type TableDataResponse = {
  groups: GroupData[];
};

type GroupData = {
  name: string;
  columns: string[];
  rows: string[];
};

const useGetTableData = (file: string, copybook: string) => {
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery<TableQueryResponse>({
    queryKey: ["table-data"],
    queryFn: async () => {
      const fetchURL = new URL(
        `http://127.0.0.1:8000/?file=${file}&copybook=${copybook}`,
      );

      const res = await fetch(fetchURL.href);
      const { groups } = (await res.json()) as TableDataResponse;

      const response: TableQueryResponse = {};
      for (const { name, rows, columns } of groups) {
        response[name] = {
          data: rows.map((row) =>
            columns.reduce(
              (record, column, j) => ({ ...record, [column]: row[j] }),
              {},
            ),
          ),
          columns: columns.map((column) => ({
            header: column,
            accessorKey: column,
            muiFilterTextFieldProps: () => ({ helperText: "" }),
          })),
        };
      }
      return response;
    },
    placeholderData: keepPreviousData,
  });

  return { data, isLoading, refetch };
};

export default useGetTableData;
