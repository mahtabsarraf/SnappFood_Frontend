import React from "react";
import Select, { createFilter } from "react-select";
import nouns from "../../enums/nouns.json";

const CustomDropdown = ({
   closeMenuOnSelect = true,
   defaultValue = null,
   isDisabled = false,
   isRtl = false,
   isSearchable = true,
   isTop = true,
   labelClasses = "",
   onChange,
   options,
   placeholder = nouns["DEFAULT.CHOOSE"],
   title = "",
   innerRef = null,
   value,
   wrapperClass = "",
}) => {
   const renderLabel = () => {
      return (
         <div>{title && <label className={labelClasses}>{title}</label>}</div>
      );
   };

   const getFilterOption = () => {
      return createFilter({
         ignoreCase: true,
         ignoreAccents: true,
         matchFrom: "any",
         stringify: (option) => `${option.label} ${option.value}`,
         trim: true,
      });
   };

   return (
      <div className={"col custom-drop-down " + wrapperClass}>
         {isTop ? renderLabel() : null}
         <Select
            closeMenuOnSelect={closeMenuOnSelect}
            defaultValue={defaultValue}
            ref={innerRef}
            isDisabled={isDisabled}
            isRtl={isRtl}
            isSearchable={isSearchable}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            menuPlacement="auto"
            filterOption={getFilterOption()}
            value={value}
         />
         {!isTop ? renderLabel() : null}
      </div>
   );
};

export default CustomDropdown;
