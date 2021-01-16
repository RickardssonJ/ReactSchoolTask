import React from "react"
import { InputField, LabelText } from "./Styled"

export default function CreateInput({
  labelText,
  name,
  type,
  onChange,
  value,
}) {
  return (
    <div>
      <LabelText>{labelText}</LabelText>
      <InputField
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      ></InputField>
    </div>
  )
}
