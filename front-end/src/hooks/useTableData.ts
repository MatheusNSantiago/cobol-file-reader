import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";

type TableData = {
  [key: string]: string;
};

type TableQueryResponse = {
  data: TableData[];
  columns: MRT_ColumnDef<TableData>[];
};

type TableDataResponse = {
  groups: GroupData[];
};

type GroupData = {
  name: string;
  columns: string[];
  rows: string[];
};

const useGetTableInfo = (
  file: string,
  copybook: string,
  groupName?: string,
) => {
  const {
    data: { data = [], columns = [] } = {},
    isLoading,
    refetch,
  } = useQuery<TableQueryResponse>({
    queryKey: ["table-data"],
    queryFn: async () => {
      const fetchURL = new URL(
        `http://127.0.0.1:8000/?file=${file}&copybook=${copybook}`,
      );

      const response = await fetch(fetchURL.href);
      const { groups } = (await response.json()) as TableDataResponse;

      const group = groups.find(({ name }) => name === (groupName ?? name));
      if (!group) throw Error(`Grupo ${groupName} não existe`);

      // Desfaz o json comprimido
      const data: TableData[] = [];
      for (const row of group.rows) {

        const record: TableData = {};
        for (let j = 0; j < row.length; j++) {
          const column = group.columns[j];
          record[column] = row[j];
        }
        data.push(record);
      }

      const columns: MRT_ColumnDef<TableData>[] = Object.keys(data).map(
        (col) => ({
          header: col,
          accessorKey: col,
          muiFilterTextFieldProps: () => ({ helperText: "" }),
        }),
      );

      return { data, columns };
    },
    placeholderData: keepPreviousData,
  });

  return {
    table: { data, columns },
    isLoading,
    refetch,
  };
};

export default useGetTableInfo;
