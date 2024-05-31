import React from "react";

const Select = ({ label, options, name, handleChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select defaultValue={""} onChange={handleChange} name={name}>
        <option hidden>Seçiniz</option>
        {options.map((i, index) => (
          <option key={index} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
