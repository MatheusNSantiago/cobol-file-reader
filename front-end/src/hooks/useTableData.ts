import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

// import ZstdCodec from "zstd-codec";
// const decompressZstd = async (compressedData: Uint8Array) => {
//   try {
//     // Initialize the Zstandard codec
//     await ZstdCodec.run((zstd) => {
//       // Decompress the data
//       return zstd.decompress(compressedData);
//     });
//   } catch (error) {
//     console.error("Decompression failed", error);
//     throw error;
//   }
// };

export default useGetTableData;
