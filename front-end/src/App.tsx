import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import useGetTableInfo from "./hooks/useTableData";
import { MaterialReactTable } from "material-react-table";
import { Box, Divider, FormControl, MenuItem, Select } from "@mui/material";

const App = () => {
  const file = "BRT.DEB.DEB1122.D240118.D310.SS000110";
  const copybook = "DEBK1122";
  const { isLoading, table } = useGetTableInfo(file, copybook);

  return (
    <div style={{ overflowY: "hidden", height: "100vh" }}>
      <MaterialReactTable
        columns={table.columns}
        data={table.data} //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        localization={MRT_Localization_PT_BR}
        enableColumnFilterModes
        initialState={{
          density: "compact",
          showColumnFilters: true,
        }}
        enablePagination={false}
        renderTopToolbar={() => {
          return (
            <Box
              sx={{
                display: "flex",
                borderRadius: 2,
                gap: "2rem",
                mx: 20,
                p: "8px",
              }}
            >
              <h2>BRT.DEB.DEB1122.D240118.D310.SS000110</h2>
              <Divider orientation="vertical" variant="middle" flexItem />
              <MultipleSelect />
            </Box>
          );
        }}
        // ╾───────────────────────────────────────────────────────────────────────────────────╼
        // enableTopToolbar= {false}
        enableBottomToolbar={false}
        // ╾───────────────────────────────────────────────────────────────────────────────────╼
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        // ╾───────────────────────────────────────────────────────────────────────────────────╼
        enableRowVirtualization
        enableRowNumbers
        state={{ isLoading }}
        muiTableContainerProps={{
          sx: { px: 20 },
        }}
        muiTableBodyCellProps={{
          sx: { border: "1px solid rgba(81, 81, 81, .5)" },
        }}
      />
    </div>
  );
};

export default App;

function MultipleSelect() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
        // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
