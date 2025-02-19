import { Box, Select } from "@mantine/core";

type SelectGroupProps = {
  selected: string;
  groups: string[];
  onChange: (group: string) => void;
};

function SelectGroup({ selected, groups, onChange }: SelectGroupProps) {
  return (
    <Box miw={120}>
      <Select
        label="group"
        data={groups}
        value={selected}
        variant="default"
        onChange={(v) => onChange(v!)}
        defaultValue={groups[0]}
        allowDeselect={false}
        searchable
        size="small"
      />
    </Box>
  );
}

export default SelectGroup;
