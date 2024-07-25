//MRT Imports
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

const Example = () => {
  // const columns = useMemo<MRT_ColumnDef<Employee>[]>(
  //   () => [
  //     {
  //       accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
  //       id: "name", //id is still required when using accessorFn instead of accessorKey
  //       header: "Name",
  //       size: 250,
  //       // Cell: ({ renderedCellValue, row }) => (
  //       //   <Box
  //       //     sx={{
  //       //       display: "flex",
  //       //       alignItems: "center",
  //       //       gap: "1rem",
  //       //     }}
  //       //   >
  //       //     <img
  //       //       alt="avatar"
  //       //       height={30}
  //       //       src={row.original.avatar}
  //       //       loading="lazy"
  //       //       style={{ borderRadius: "50%" }}
  //       //     />
  //       //     {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
  //       //     <span>{renderedCellValue}</span>
  //       //   </Box>
  //       // ),
  //     },
  //     {
  //       accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
  //       enableClickToCopy: true,
  //       filterVariant: "autocomplete",
  //       header: "Email",
  //       size: 300,
  //     },
  //     {
  //       accessorKey: "salary",
  //       // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
  //       filterFn: "between",
  //       header: "Salary",
  //       size: 200,
  //       //custom conditional format and styling
  //       // Cell: ({ cell }) => (
  //       //   <Box
  //       //     component="span"
  //       //     sx={(theme) => ({
  //       //       backgroundColor:
  //       //         cell.getValue<number>() < 50_000
  //       //           ? theme.palette.error.dark
  //       //           : cell.getValue<number>() >= 50_000 &&
  //       //             cell.getValue<number>() < 75_000
  //       //             ? theme.palette.warning.dark
  //       //             : theme.palette.success.dark,
  //       //       borderRadius: "0.25rem",
  //       //       color: "#fff",
  //       //       maxWidth: "9ch",
  //       //       p: "0.25rem",
  //       //     })}
  //       //   >
  //       //     {cell.getValue<number>()?.toLocaleString?.("en-US", {
  //       //       style: "currency",
  //       //       currency: "USD",
  //       //       minimumFractionDigits: 0,
  //       //       maximumFractionDigits: 0,
  //       //     })}
  //       //   </Box>
  //       // ),
  //     },
  //     {
  //       accessorKey: "jobTitle", //hey a simple column for once
  //       header: "Job Title",
  //       size: 350,
  //     },
  //     {
  //       accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
  //       id: "startDate",
  //       header: "Start Date",
  //       filterVariant: "date",
  //       filterFn: "lessThan",
  //       sortingFn: "datetime",
  //       Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
  //       Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
  //       muiFilterTextFieldProps: {
  //         sx: {
  //           minWidth: "250px",
  //         },
  //       },
  //     },
  //   ],
  //   [],
  // );

  const {
    data: { data = [], columns = [] } = {}, //your data and api response will probably be different
    // isError,
    // isRefetching,
    isLoading,
    // refetch,
  } = useQuery<{
    data: { [key: string]: string }[];
    columns: MRT_ColumnDef<{ [key: string]: string }>[];
  }>({
    queryKey: ["table-data"],
    queryFn: async () => {
      const fetchURL = new URL("http://127.0.0.1:8000/");

      //use whatever fetch library you want, fetch, axios, etc
      const response = await fetch(fetchURL.href);
      const json = JSON.parse(await response.json()) as {
        columns: string[];
        data: string[][];
      };

      // Desfaz o json comprimido
      const data: { [key: string]: string }[] = [];
      for (let i = 0; i < json.data.length; i++) {
        const values = json.data[i];
        const record: { [key: string]: string } = {};

        for (let i = 0; i < values.length; i++) {
          const column = json.columns[i];
          record[column] = values[i];
        }
        data.push(record);
      }

      const columns: MRT_ColumnDef<{ [key: string]: string }>[] =
        json.columns.map((col) => ({ header: col, accessorKey: col }));
      return { data, columns };
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });

  return (
    <MaterialReactTable
      columns={columns}
      data={data} //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
      localization={MRT_Localization_PT_BR}
      enableColumnFilterModes // escolher o método de filtro
      initialState={{
        density: "compact",
      }}
      enablePagination={false}
      enableRowVirtualization
      enableRowNumbers
      state={{ isLoading }}
      muiTableBodyCellProps={{
        sx: { border: "1px solid rgba(81, 81, 81, .5)" },
      }}
    />
  );
};

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ExampleWithLocalizationProvider = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;
