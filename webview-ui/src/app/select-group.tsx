import { Select } from "@mantine/core";

type SelectGroupProps = {
  selected: string;
  groups: string[];
  onChange: (group: string) => void;
};

function SelectGroup({ selected, groups, onChange }: SelectGroupProps) {
  return (
    <Select
      data={groups}
      value={selected}
      onChange={(v) => onChange(v!)}
      defaultValue={groups[0]}
      allowDeselect={false}
      size="md"
    />
  );
}

export default SelectGroup;
