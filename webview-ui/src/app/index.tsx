import {
  MantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  useMantineReactTable,
} from "mantine-react-table";
import { Box, Divider, Flex, Loader } from "@mantine/core";
import SelectGroup from "./components/select-group";
import useTableDataManager from "../api/useTableDataManager";

const FILE = "BRT.DEB.DEB307.BAIXA.SS000101";
const COPYBOOK = "DEBK307";

const App = () => {
  const manager = useTableDataManager(COPYBOOK, FILE);

  // Garantir que sempre existem valores padrão
  const tableColumns = manager.data.columns;
  const tableData = manager.data.data;

  // Evitar renderização prematura enquanto carrega
  // if (manager.isGroupsLoading || manager.isTableLoading) {
  //   return (
  //     <Flex justify="center" align="center" style={{ height: "100vh" }}>
  //       <Loader size="xl" />
  //     </Flex>
  //   );
  // }
  //
  // console.log(tableColumns);

  return (
    <Flex direction="column">
      <Flex mx={20} justify="space-between">
        <Flex align={"center"} gap="1rem">
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

        {/* <Box display="flex"> */}
        {/*   <MRT_ToggleFiltersButton table={MRTable} /> */}
        {/*   <MRT_ShowHideColumnsButton table={MRTable} /> */}
        {/* </Box> */}
      </Flex>

      <MantineReactTable
        columns={tableColumns}
        data={tableData}
        enableColumnFilterModes={true}
        enableRowNumbers={true}
        initialState={{ showColumnFilters: true }}
        enableTopToolbar={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableBottomToolbar={false}
        enablePagination={false}
        enableColumnVirtualization={true}
        rowVirtualizerOptions={{ overscan: 10 }}
        columnVirtualizerOptions={{ overscan: 5 }}
        state={{ isLoading: manager.isTableLoading }}
      />
    </Flex>
  );
};

export default App;
