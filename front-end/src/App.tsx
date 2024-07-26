import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import useTableData from "./hooks/useTableData";
import {
  MaterialReactTable,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { Box, lighten } from "@mui/material";

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

const App = () => {
  const { isLoading, table } = useTableData();

  return (
    <body style={{ overflowY: "hidden", height: "100vh" }}>
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
        renderTopToolbar={({ table }) => {
          return (
            <Box
              sx={({ palette }) => ({
                backgroundColor: lighten(palette.background.default, 0.05),
                display: "flex",
                gap: "0.5rem",
                mx: 20,
                p: "8px",
                justifyContent: "space-between",
              })}
            >
              <h2>BRT.DEB.DEB1122.D240118.D310.SS000110</h2>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ToggleFiltersButton table={table} />
              </Box>
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
    </body>
  );
};

export default App;
