import React from "react";
import { useField } from "formik";

import CustomInput from "./CustomInput";
import CustomDebounce from "./CustomDebounce";

function CustomField({
   sideEffectFunction,
   isDebounce = false,
   ...otherProps
}) {
   const [field, meta /* , helpers */] = useField(otherProps);
   if (sideEffectFunction) sideEffectFunction();

   const error = meta.touched
      ? meta.error
         ? meta.error
         : otherProps.error
      : null;
   const valid = meta.touched && !meta.error;

   return isDebounce ? (
      <CustomDebounce
         {...field}
         {...otherProps}
         checked={field.value}
         error={error}
         valid={valid}
      />
   ) : (
      <CustomInput
         {...field}
         {...otherProps}
         checked={field.value}
         error={error}
         valid={valid}
      />
   );
}

export default CustomField;
