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

const App = () => {
  const [group, setGroup] = useState("DCLTDEB307");
  const [groups, setGroups] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const file = "BRT.DEB.DEB307.BAIXA.SS000101";
  const copybook = "DEBK307";
  const { isLoading, table } = useGetTableData(group, file, copybook);

  // useEffect(() => {
  //   const groups = Object.keys(data);
  //   setGroup(groups[0]);
  //   setGroups(groups);
  // }, [data]);

  const { ref, height } = useElementSize();
  const MRTable = useMaterialReactTable({
    columns: table.columns,
    data: table.data,
    localization: MRT_Localization_PT_BR,
    enableColumnFilterModes: true,
    initialState: {
      density: "compact",
      showColumnFilters: true,
      columnVisibility,
    },
    enableTopToolbar: false,
    enableBottomToolbar: true,

    enableDensityToggle: false,
    enableFullScreenToggle: false,
    // enablePagination: false,
    // enableRowVirtualization: true,
    enableColumnVirtualization: true,
    enableRowNumbers: true,

    state: { isLoading },
    muiTableContainerProps: {
      sx: { px: 20, height: window.innerHeight - height },
    },
    muiTableBodyCellProps: {
      sx: { border: "1px solid rgba(81, 81, 81, .5)" },
    },
  });

  useEffect(() => {
    if (table.columns.length > 12) {
      const hideColumns = table.columns.reduce(
        (obj, { header }) => ({ ...obj, [header]: false }),
        {},
      );

      MRTable.setColumnVisibility(hideColumns);
    }
  }, [table.columns]);

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
          <h3>{file}</h3>
          <Divider orientation="vertical" variant="middle" flexItem />
          <SelectGroup groups={groups} onChange={setGroup} />
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
