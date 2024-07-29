import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

type SelectGroupProps = {
  groups: string[];
  onChange: (group: string) => void;
};

function SelectGroup({ groups = [], onChange }: SelectGroupProps) {
  const [group, setGroup] = useState<string>();
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="group-select"
          id="group-select"
          value={group ?? groups[0] ?? ""}
          variant="standard"
          onChange={(e) => {
            const group = e.target.value;
            setGroup(group);
            onChange(group);
          }}
          size="small"
        >
          {groups.map((g, idx) => (
            <MenuItem value={g} key={idx}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectGroup;
