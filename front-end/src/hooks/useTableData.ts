import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";

type TableData = {
  [key: string]: string;
};

export type GetTableDataResponse = {
  data: TableData[];
  columns: MRT_ColumnDef<TableData>[];
};

// export type TableDataResponse = {
//   columns: string[];
//   rows: string[][];
// };

// type GroupData = {
//   name: string;
//   columns: string[];
//   rows: string[];
// };

const useGetTableData = (groupName: string, file: string, copybook: string) => {
  const {
    data: { columns = [], data = [] } = {},
    isLoading,
    refetch,
  } = useQuery<GetTableDataResponse>({
    queryKey: ["table-data"],
    queryFn: async () => {
      const fetchURL = new URL(
        `http://127.0.0.1:8000/?group_name=${groupName}&file=${file}&copybook=${copybook}`,
      );

      const res = await fetch(fetchURL.href);
      const { columns, rows } = (await res.json()) as {
        columns: string[];
        rows: string[][];
      };


      console.log(columns);


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

      // ╾───────────────────────────────────────────────────────────────────────────────────╼
      // for (const { name, rows, columns } of groups) {
      //   response[name] = {
      //     data: rows.map((row) =>
      //       columns.reduce(
      //         (record, column, j) => ({ ...record, [column]: row[j] }),
      //         {},
      //       ),
      //     ),
      //     columns: columns.map((column) => ({
      //       header: column,
      //       accessorKey: column,
      //       muiFilterTextFieldProps: () => ({ helperText: "" }),
      //     })),
      //   };
      // }
      // return response;
    },
    placeholderData: keepPreviousData,
  });

  return {
    table: { columns, data },
    isLoading,
    refetch,
  };
};

export default useGetTableData;
