// import { MRT_ColumnDef } from "mantine-react-table";
// import { useEffect, useMemo, useState } from "react";
// import { vscode } from "../utils/vscode";
//
// const useGetTableData = (file: string, copybook: string) => {
//   const [tableData, setTableData] = useState<GetTableDataResponse>();
//   const [isLoading, setIsLoading] = useState(false);
//
// };
//
// type TableData = {
//   [key: string]: string;
// };
//
// type GetTableDataResponse = {
//   data: Array<TableData>;
//   columns: Array<MRT_ColumnDef<TableData>>;
// };
//
// const useGetDataForGroup = (group: string, file: string, copybook: string) => {
//   const defaultTableData: GetTableDataResponse = { columns: [], data: [] };
//   const [tableData, setTableData] =
//     useState<GetTableDataResponse>(defaultTableData);
//   const [isLoading, setIsLoading] = useState(false);
//
//   useEffect(() => {
//     if (group && file && copybook) {
//       setIsLoading(true);
//       vscode.postMessage({ command: "getTableData", group, file, copybook });
//     }
//
//     const messageListener = (event: any) => {
//       const message = event.data;
//       switch (message.command) {
//         case "tableDataReady":
//           const { columns, rows } = message.tableData;
//
//           const formattedColumns = useMemo<MRT_ColumnDef<TableData>[]>(
//             () =>
//               columns.map((column: string) => ({
//                 header: column,
//                 accessorKey: column,
//                 // muiFilterTextFieldProps: () => ({ helperText: "" }),
//               })),
//             [],
//           );
//
//           const formattedData = useMemo<TableData[]>(
//             () =>
//               rows.map((row: string[]) =>
//                 columns.reduce(
//                   (record: TableData, column: string, j: number) => ({
//                     ...record,
//                     [column]: row[j],
//                   }),
//                   {},
//                 ),
//               ),
//             [],
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
//
//     window.addEventListener("message", messageListener);
//
//     return () => {
//       window.removeEventListener("message", messageListener);
//     };
//   }, [group, file, copybook]);
//
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
//
// const useGetGroups = (copybook: string) => {
//   const [groups, setGroups] = useState<string[]>();
//   const [isFetched, setIsFetched] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//
//   useEffect(() => {
//     setLoading(true);
//     vscode.postMessage({ command: "getGroups", copybook: copybook });
//
//     const messageListener = (event: any) => {
//       const message = event.data;
//       switch (message.command) {
//         case "groupsReady":
//           setGroups(message.groups);
//           setIsFetched(true);
//           setLoading(false);
//           break;
//         case "error":
//           console.error("Erro ao obter grupos:", message.message);
//           setLoading(false);
//           break;
//       }
//     };
//
//     window.addEventListener("message", messageListener);
//
//     return () => {
//       window.removeEventListener("message", messageListener);
//     };
//   }, [copybook]);
//
//   return { groups, isFetched, loading };
// };
// ╾───────────────────────────────────────────────────────────────────────────────────╼
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useState } from "react";
import { vscode } from "../utils/vscode";

type TableData = {
  [key: string]: string;
};

type GetTableDataResponse = {
  data: Array<TableData>;
  columns: Array<MRT_ColumnDef<TableData>>;
};

type UseTableDataManagerReturn = {
  groups: string[] | undefined;
  isGroupsLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string) => void;
  data: { columns: MRT_ColumnDef<TableData>[]; data: TableData[] };
  isTableLoading: boolean;
};

const useTableDataManager = (
  copybook: string,
  file: string,
): UseTableDataManagerReturn => {
  const [groups, setGroups] = useState<string[]>();
  const [isGroupsLoading, setIsGroupsLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>();

  const defaultTableData: GetTableDataResponse = { columns: [], data: [] };
  const [tableData, setTableData] =
    useState<GetTableDataResponse>(defaultTableData);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsGroupsLoading(true);
    setSelectedGroup(undefined);
    setTableData(defaultTableData);
    vscode.postMessage({ command: "getGroups", copybook });

    const messageListener = (event: any) => {
      const message = event.data;
      switch (message.command) {
        case "groupsReady":
          setGroups(message.groups);

          // Escolhe o primeiro grupo por padrão
          if (message.groups.length > 0) {
            setSelectedGroup(message.groups[0]);
          }
          setIsGroupsLoading(false);
          break;
        case "error":
          console.error("Erro ao obter grupos:", message.message);
          setIsGroupsLoading(false);
          break;
      }
    };

    window.addEventListener("message", messageListener);
    return () => window.removeEventListener("message", messageListener);
  }, [copybook, file]);

  // refresh nos dados da tabela quando um grupo é selecionado
  useEffect(() => {
    if (selectedGroup) {
      setIsTableLoading(true);
      vscode.postMessage({
        command: "getTableData",
        group: selectedGroup,
        file,
        copybook,
      });
    }
  }, [selectedGroup]);

  useEffect(() => {
    const messageListener = (event: any) => {
      const message = event.data;
      switch (message.command) {
        case "tableDataReady":
          const { columns, rows } = message.tableData;
          const formattedColumns = columns.map((column: string) => ({
            header: column,
            accessorKey: column,
          }));
          const formattedData = rows.map((row: string[]) =>
            columns.reduce(
              (record: TableData, column: string, j: number) => ({
                ...record,
                [column]: row[j],
              }),
              {},
            ),
          );
          setTableData({ columns: formattedColumns, data: formattedData });
          setIsTableLoading(false);
          break;
        case "error":
          console.error("Erro ao obter dados da tabela:", message.message);
          setIsTableLoading(false);
          break;
      }
    };

    window.addEventListener("message", messageListener);
    return () => window.removeEventListener("message", messageListener);
  }, []);

  return {
    groups,
    isGroupsLoading,
    selectedGroup,
    setSelectedGroup,
    data: { columns: tableData.columns, data: tableData.data },
    isTableLoading,
  };
};

export default useTableDataManager;
