import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

function FMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (optionId) =>
          field.value.includes(optionId)
            ? field.value.filter((value) => value !== optionId)
            : [...field.value, optionId];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={field.value.includes(option.id)} //critical
                    onChange={() => field.onChange(onSelected(option.id))}
                  />
                }
                label={option.name}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;
