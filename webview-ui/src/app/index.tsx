import {
  MantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";
import { Divider, Flex } from "@mantine/core";
import useTableDataManager from "../api/useTableDataManager";

//Import Mantine React Table Translations
import SelectGroup from "./select-group";
import { MRT_Localization_PT_BR } from "../lib/mantine-table-localization";

const FILE = "BRT.DEB.DEB307.BAIXA.SS000101";
const COPYBOOK = "DEBK307";

const App = () => {
  const manager = useTableDataManager(COPYBOOK, FILE);

  return (
    <MantineReactTable
      columns={manager.data.columns.map((col) => ({ header: col, accessorKey: col }))}
      data={manager.data.records}
      renderTopToolbar={({ table }) => (
        <Flex mx={20} justify="space-between" align={"center"}>
          <Flex align="center" gap="1rem">
            <h3>{FILE}</h3>
            <Divider orientation="vertical" />

            {/* Renderiza SelectGroup somente se houver grupos carregados */}
            {manager.groups && manager.groups.length > 0 && (
              <SelectGroup
                groups={manager.groups}
                selected={manager.selectedGroup ?? manager.groups[0]}
                onChange={(group) => manager.setSelectedGroup(group)}
              />
            )}
          </Flex>
          <Flex>
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
          </Flex>
        </Flex>
      )}
      enableColumnPinning
      enableColumnFilterModes
      enableColumnResizing
      enableRowNumbers
      initialState={{
        showColumnFilters: true,
        pagination: { pageSize: 100, pageIndex: 0 },
      }}
      state={{
        isLoading: manager.isTableLoading,
        density: "xs",
      }}
      mantineTableContainerProps={{
        style: { height: "calc(100vh - 200px)" },
      }}
      enableStickyHeader
      paginationDisplayMode={"pages"}
      mantinePaginationProps={{ showRowsPerPage: false }}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      localization={MRT_Localization_PT_BR}
    />
  );
};

export default App;
