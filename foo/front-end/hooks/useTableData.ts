// import { MRT_ColumnDef } from "mantine-react-table";
// import { useEffect, useState } from "react";

// type TableData = {
//   [key: string]: string;
// };

// export type GetTableDataResponse = {
//   data: TableData[];
//   columns: MRT_ColumnDef<TableData>[];
// };

// const vscode = (window as any).acquireVsCodeApi();

// const useGetTableData = (group: string, file: string, copybook: string) => {
//   const [tableData, setTableData] = useState<GetTableDataResponse>({
//     columns: [],
//     data: [],
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (group && file && copybook) {
//       setIsLoading(true);
//       vscode.postMessage({ command: "getTableData", group, file, copybook });
//     }

//     const messageListener = (event: any) => {
//       const message = event.data;
//       switch (message.command) {
//         case "tableDataReady":
//           const { columns, rows } = message.tableData;
//           const formattedColumns: MRT_ColumnDef<TableData>[] = columns.map(
//             (column: string) => ({
//               header: column,
//               accessorKey: column,
//               muiFilterTextFieldProps: () => ({ helperText: "" }),
//             }),
//           );
//           const formattedData: TableData[] = rows.map((row: string[]) =>
//             columns.reduce(
//               (record: TableData, column: string, j: number) => ({
//                 ...record,
//                 [column]: row[j],
//               }),
//               {},
//             ),
//           );
//           setTableData({ columns: formattedColumns, data: formattedData });
//           setIsLoading(false);
//           break;
//         case "error":
//           console.error("Erro ao obter dados da tabela:", message.message);
//           setIsLoading(false);
//           break;
//       }
//     };

//     window.addEventListener("message", messageListener);

//     return () => {
//       window.removeEventListener("message", messageListener);
//     };
//   }, [group, file, copybook]);

//   return {
//     table: { columns: tableData.columns, data: tableData.data },
//     isLoading,
//     refetch: () => {
//       // Adicione uma função refetch se precisar
//       if (group && file && copybook) {
//         setIsLoading(true);
//         vscode.postMessage({
//           command: "getTableData",
//           groupName: group,
//           file: file,
//           copybook: copybook,
//         });
//       }
//     },
//   };
// };

// // const useGetTableData = (group: string, file: string, copybook: string) => {
// //   const {
// //     data: { columns = [], data = [] } = {},
// //     isLoading,
// //     refetch,
// //   } = useQuery<GetTableDataResponse>({
// //     queryKey: ["table-group", group],
// //     enabled: false,
// //     queryFn: async () => {
// //       const res = await axios.get("http://127.0.0.1:8000/", {
// //         params: { group, file, copybook },
// //       });
// //
// //       const { columns, rows } = res.data as {
// //         columns: string[];
// //         rows: string[][];
// //       };
// //
// //       return {
// //         columns: columns.map((column) => ({
// //           header: column,
// //           accessorKey: column,
// //           muiFilterTextFieldProps: () => ({ helperText: "" }),
// //         })),
// //         data: rows.map((row) =>
// //           columns.reduce(
// //             (record, column, j) => ({ ...record, [column]: row[j] }),
// //             {},
// //           ),
// //         ),
// //       };
// //     },
// //   });
// //
// //   return {
// //     table: { columns, data },
// //     isLoading,
// //     refetch,
// //   };
// // };

// export default useGetTableData;
