// import { Box, FormControl, MenuItem, Select } from "@mui/material";
// import React from "react";

// type SelectGroupProps = {
//   selected: string;
//   groups: string[];
//   onChange: (group: string) => void;
// };

// function SelectGroup({ selected, groups = [], onChange }: SelectGroupProps) {
//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <Select
//           labelId="group-select"
//           id="group-select"
//           value={selected}
//           variant="standard"
//           onChange={(e) => {
//             onChange(e.target.value);
//           }}
//           size="small"
//         >
//           {groups.map((g, idx) => (
//             <MenuItem value={g} key={idx}>
//               {g}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

// export default SelectGroup;
