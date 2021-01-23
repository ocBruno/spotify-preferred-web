import React, { useState } from "react"

export function useInput({ name, type, defaultVal, className }) {
  const [value, setValue] = useState(defaultVal)
  const input = (
    <input
      name={name}
      id={name}
      data-testid={name}
      value={value}
      className={className}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  )
  return [value, input]
}



export function useSelect({ name, values, className }) {
  const initialValue = values.length === 0 ? values : values[0]
  const [activeValue, setActiveValue] = useState(initialValue)
  const input = (
    <select
      id={name}
      data-testid={name}
      name={name}
      className={className}
      value={activeValue}
      onChange={(e) => {
        setActiveValue(e.target.value)
      }}
    >
      {values.map((elementValue, index) => {
        return (
          <option value={elementValue} key={index}>
            {elementValue}
          </option>
        )
      })}
    </select>
  )
  return [activeValue, input]
}
