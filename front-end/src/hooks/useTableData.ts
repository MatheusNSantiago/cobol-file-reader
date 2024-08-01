import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MRT_ColumnDef } from "mantine-react-table";

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
    enabled: false,
    queryFn: async () => {
      const res = await axios.get("http://127.0.0.1:8000/", {
        params: { group_name: groupName, file, copybook },
      });

      // const columns = []
      // const rows = []

      const { columns, rows } = res.data as {
        columns: string[];
        rows: string[][];
      };

      console.log(rows.length);


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
