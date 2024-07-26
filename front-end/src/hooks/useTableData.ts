import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";

type TableData = {
  [key: string]: string;
};

type TableQueryResponse = {
  data: TableData[];
  columns: MRT_ColumnDef<TableData>[];
};

const useTableData = () => {
  const { data: { data = [], columns = [] } = {}, isLoading } =
    useQuery<TableQueryResponse>({
      queryKey: ["table-data"],
      queryFn: async () => {
        const fetchURL = new URL("http://127.0.0.1:8000/");

        //use whatever fetch library you want, fetch, axios, etc
        const response = await fetch(fetchURL.href);
        const json = JSON.parse(await response.json()) as {
          columns: string[];
          data: string[][];
        };

        // Desfaz o json comprimido
        const data: { [key: string]: string }[] = [];
        for (let i = 0; i < json.data.length; i++) {
          const values = json.data[i];
          const record: { [key: string]: string } = {};

          for (let i = 0; i < values.length; i++) {
            const column = json.columns[i];
            record[column] = values[i];
          }
          data.push(record);
        }

        const columns: MRT_ColumnDef<TableData>[] = json.columns.map((col) => ({
          header: col,
          accessorKey: col,
        }));

        return { data, columns };
      },
      placeholderData: keepPreviousData,
    });

  return {
    table: { data, columns },
    isLoading,
  };
};

export default useTableData;
