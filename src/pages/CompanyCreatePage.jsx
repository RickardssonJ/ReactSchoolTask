import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import CreateInput from "../components/CreateInput"
import { PrimaryButton, SpacingDiv, StyledHeadings } from "../components/Styled"
import { infoContext } from "../context/infoContext"

export default function CompanyCreatePage() {
  const [formData, setFormData] = useState({})
  const history = useHistory()
  const { isTrue, setIsTrue } = useContext(infoContext)

  function handleOnChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    if (
      !formData.vatNr ||
      formData.vatNr.length < 12 ||
      !formData.vatNr.toUpperCase().includes("SE")
    ) {
      alert("Vat number most contain SE and 10 ditgits")
    } else if (!formData.paymentTerm) {
      alert("You must enter a payment term")
    } else {
      const url = "https://frebi.willandskill.eu/api/v1/customers/"
      const token = localStorage.getItem("WEBB20")

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => history.push("/home"))
      setIsTrue(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <StyledHeadings>Create a new company</StyledHeadings>

        <SpacingDiv />

        <CreateInput
          labelText="Company name"
          name="name"
          type="text"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="Email"
          name="email"
          type="email"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="Payment Terms"
          name="paymentTerm"
          type="number"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="organisation number"
          name="organisationNr"
          type="number"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="Phone number"
          name="phoneNumber"
          type="tel"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="Reference"
          name="reference"
          type="text"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="Vat number"
          name="vatNr"
          type="text"
          onChange={handleOnChange}
        />
        <CreateInput
          labelText="Website"
          name="website"
          type="url"
          onChange={handleOnChange}
        />
        <SpacingDiv />
        <PrimaryButton type="submit">Add new company</PrimaryButton>
      </form>
    </div>
  )
}
