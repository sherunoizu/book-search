import React from "react";

import {
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";

import { CustomSelectProps } from "./CustomSelect.types";

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  optionValues,
  labelName,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event);
  };
  return (
    <Box width="200px">
      <InputLabel
        htmlFor={labelName.toLowerCase()}
        id={labelName.toLowerCase()}
      >
        {labelName}:
      </InputLabel>
      <Select
        labelId={labelName.toLowerCase()}
        name={labelName.toLowerCase()}
        id={labelName.toLowerCase()}
        size="small"
        value={value}
        onChange={handleChange}
        fullWidth
        defaultValue={optionValues[0]}
      >
        {optionValues.map((optionValue, i) => (
          <MenuItem key={i} value={optionValue}>
            {optionValue}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
