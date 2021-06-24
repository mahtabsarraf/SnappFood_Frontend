import React from "react";
import { DebounceInput } from "react-debounce-input";
import CustomInput from "./CustomInput";

const CustomDebounce = ({
   onChange,
   value,
   debounce = 700,
   label,
   minLength = 3,
   ...props
}) => {
   return (
      <DebounceInput
         {...props}
         element={CustomInput}
         label={label}
         minLength={minLength}
         debounceTimeout={debounce}
         value={value}
         onChange={event => {
            onChange(event.target.value);
         }}
      />
   );
};

export default CustomDebounce;
