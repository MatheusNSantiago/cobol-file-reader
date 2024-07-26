import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";

type TableData = {
  [key: string]: string;
};

type TableQueryResponse = {
  data: TableData[];
  columns: MRT_ColumnDef<TableData>[];
};


type GetTableDataResponse = {
  file: string;
  columns: string[]
  groupNames: string[];
};

type GetGroupData = {
  name: string;
  rows: string[];
};

const useGetTableInfo = (file: string) => {
  const {
    data: { data = [], columns = [] } = {},
    isLoading,
    refetch,
  } = useQuery<TableQueryResponse>({
    queryKey: ["table-data"],
    queryFn: async () => {
      const fetchURL = new URL(`http://127.0.0.1:8000/${file}`);

      //use whatever fetch library you want, fetch, axios, etc
      const response = await fetch(fetchURL.href);
      const { file, groups } = JSON.parse(
        await response.json(),
      ) as GetTableDataResponse;

      // Desfaz o json comprimido
      // const data: { [key: string]: string }[] = [];
      // for (let i = 0; i < json.data.length; i++) {
      //   const values = json.data[i];
      //   const record: { [key: string]: string } = {};
      //
      //   for (let i = 0; i < values.length; i++) {
      //     const column = json.columns[i];
      //     record[column] = values[i];
      //   }
      //   data.push(record);
      // }

      // const columns: MRT_ColumnDef<TableData>[] = groups.map(({columns}). => ({
      //   header: col,
      //   accessorKey: col,
      //   muiFilterTextFieldProps: () => ({ helperText: "" }),
      // }));

      return { data, columns };
    },
    placeholderData: keepPreviousData,
  });

  return {
    table: { data, columns },
    isLoading,
  };
};

export default useGetTableInfo;
