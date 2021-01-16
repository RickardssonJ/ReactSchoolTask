import styled from "styled-components"

const PrimaryButton = styled.button`
  background-color: green;
  border-radius: 5px;
  padding: 0.3rem 1.3rem;
  color: white;
`

const DeleteButton = styled(PrimaryButton)`
  background-color: red;
  margin-left: 1.5rem;
`

const LogIn = styled.button`
  background-color: blue;
  padding: 0.3rem 1.3rem;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  color: white;
`
const StyledHeadings = styled.h2`
  color: white;
`
const SpacingDiv = styled.div`
  padding: 1rem;
`

const InputField = styled.input`
  background-color: rgb(205, 203, 203);
  margin-left: 2rem;
  float: right;
  margin-right: 60%;
`

const LabelText = styled.label`
  color: white;
`

export {
  PrimaryButton,
  DeleteButton,
  LogIn,
  StyledHeadings,
  SpacingDiv,
  InputField,
  LabelText,
}
