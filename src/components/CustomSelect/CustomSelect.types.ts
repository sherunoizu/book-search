import { SelectChangeEvent } from "@mui/material";

export interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  optionValues: string[];
  labelName: string;
}
