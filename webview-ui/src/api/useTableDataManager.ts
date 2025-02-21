import { useEffect, useState } from "react";
import { vscode } from "../utils/vscode";

type TableData = {
  columns: string[];
  records: Record<string, string>[];
};

type UseTableDataManagerReturn = {
  groups: string[] | undefined;
  isGroupsLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string) => void;
  data: TableData;
  isTableLoading: boolean;
};

const useTableDataManager = (
  copybook: string,
  file: string,
): UseTableDataManagerReturn => {
  const [groups, setGroups] = useState<string[]>();
  const [isGroupsLoading, setIsGroupsLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>();

  const defaultTableData: TableData = { columns: [], records: [] };
  const [tableData, setTableData] = useState<TableData>(defaultTableData);
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
          const data = rows.map((row: string[]) =>
            columns.reduce(
              (record: Record<string, string>, column: string, j: number) => ({
                ...record,
                [column]: row[j],
              }),
              {},
            ),
          );
          setTableData({ columns, records: data });
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
    data: { columns: tableData.columns, records: tableData.records },
    isTableLoading,
  };
};

export default useTableDataManager;
