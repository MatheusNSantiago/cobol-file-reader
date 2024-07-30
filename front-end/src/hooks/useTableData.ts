import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";

type TableData = {
  [key: string]: string;
};

export type GetTableDataResponse = {
  data: TableData[];
  columns: MRT_ColumnDef<TableData>[];
};

const useGetTableData = (groupName: string, file: string, copybook: string) => {
  const {
    data: { columns = [], data = [] } = {},
    isLoading,
    refetch,
  } = useQuery<GetTableDataResponse>({
    queryKey: ["table-group", groupName],
    queryFn: async () => {
      const fetchURL = new URL(
        `http://127.0.0.1:8000/?group_name=${groupName}&file=${file}&copybook=${copybook}`,
      );

      const res = await fetch(fetchURL.href);
      const { columns, rows } = (await res.json()) as {
        columns: string[];
        rows: string[][];
      };

      return {
        columns: columns.map((column) => ({
          header: column,
          accessorKey: column,
          muiFilterTextFieldProps: () => ({ helperText: "" }),
        })),
        data: rows.map((row) =>
          columns.reduce(
            (record, column, j) => ({ ...record, [column]: row[j] }),
            {},
          ),
        ),
      };
    },
  });

  return {
    table: { columns, data },
    isLoading,
    refetch,
  };
};

export default useGetTableData;
