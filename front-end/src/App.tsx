import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import useGetTableData from "./hooks/useTableData";
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import SelectGroup from "./components/selectGroup";
import { useElementSize } from "./hooks/useElementSize";
import useGetTableInfo from "./hooks/useTableInfo";

const FILE = "BRT.DEB.DEB307.BAIXA.SS000101";
const COPYBOOK = "DEBK307";
// const GROUP = "DCLTDEB307";

// const FILE = "BRT.DEB.DEB1122.D240118.D310.SS000110";
// const COPYBOOK = "DEBK1122";
// const GROUP = "DEB1122-REG-DETALHE";

// const GROUP = "601-REG-GERAL"
// const FILE = "BRT.DEB.DEB601.BAIXA.SS000101";
// const COPYBOOK = "DEBK601";

const App = () => {
  const [group, setGroup] = useState<string>();
  const [groups, setGroups] = useState<string[]>([]);

  const { isFetched, groupNames } = useGetTableInfo(COPYBOOK);

  const {
    isLoading: isGetTableLoading,
    table,
    refetch,
  } = useGetTableData(group, FILE, COPYBOOK);

  useEffect(() => {
    if (isFetched) {
      setGroups(groupNames);
      setGroup(groupNames[0]);
    }
  }, [groupNames, isFetched]);

  useEffect(() => {
    if (group) refetch();
  }, [group]);

  const { ref, height } = useElementSize();
  const MRTable = useMaterialReactTable({
    columns: table.columns,
    data: table.data,
    localization: MRT_Localization_PT_BR,
    enableColumnFilterModes: true,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      showColumnFilters: true,
    },
    enableTopToolbar: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,

    enableBottomToolbar: false,
    enablePagination: false,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 5 },

    state: { isLoading: isGetTableLoading },
    muiTableContainerProps: {
      sx: { px: 20, height: window.innerHeight - height },
    },
    muiTableBodyCellProps: {
      sx: { border: "1px solid rgba(81, 81, 81, .5)" },
    },
  });

  return (
    <Box display="flex" flexDirection="column">
      <Box
        ref={ref}
        display="flex"
        borderRadius={2}
        mx={20}
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="1rem">
          <h3>{FILE}</h3>
          <Divider orientation="vertical" variant="middle" flexItem />
          <SelectGroup
            groups={groups}
            selected={groups.length == 0 ? "" : group}
            onChange={(group) => {
              setGroup(group);
              refetch();
            }}
          />
        </Box>
        <Box display="flex">
          <MRT_ToggleFiltersButton table={MRTable} disableRipple />
          <MRT_ShowHideColumnsButton table={MRTable} disableRipple />
        </Box>
      </Box>
      <MaterialReactTable table={MRTable} />
    </Box>
  );
};

export default App;
