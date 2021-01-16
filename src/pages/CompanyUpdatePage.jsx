import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import CreateInput from "../components/CreateInput"
import { PrimaryButton, SpacingDiv } from "../components/Styled"
import { infoContext } from "../context/infoContext"

export default function CompanyUpdatePage(props) {
  const history = useHistory()
  const id = props.match.params.id
  const [thisCompanyData, setThisCompanyData] = useState({})
  const { isTrue, setIsTrue } = useContext(infoContext)

  function handleOnChange(e) {
    setThisCompanyData({
      ...thisCompanyData,
      [e.target.name]: e.target.value,
    })
  }

  function getThisCompany() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${id}/`
    const token = localStorage.getItem("WEBB20")

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setThisCompanyData(data))
  }

  function updateThisCompany(e) {
    if (
      !thisCompanyData.vatNr ||
      thisCompanyData.vatNr.length < 12 ||
      !thisCompanyData.vatNr.toUpperCase().includes("SE")
    ) {
      alert("Vat number most contain SE and 10 ditgits")
    } else if (!thisCompanyData.paymentTerm) {
      alert("You must enter a payment term")
    } else {
      e.preventDefault()
      const url = `https://frebi.willandskill.eu/api/v1/customers/${id}/`
      const token = localStorage.getItem("WEBB20")

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(thisCompanyData),
      })
        .then((res) => res.json)
        .then(() => {
          setIsTrue(false)
          history.push("/home")
        })
    }
  }

  useEffect(() => {
    getThisCompany()
  }, [])

  return (
    <div>
      <SpacingDiv />
      <form onSubmit={updateThisCompany}>
        <CreateInput
          labelText="Company Name"
          onChange={handleOnChange}
          name="name"
          value={thisCompanyData.name || ""}
          type="text"
        />
        <CreateInput
          onChange={handleOnChange}
          name="email"
          labelText="Email"
          type="email"
          value={thisCompanyData.email || ""}
        />
        <CreateInput
          onChange={handleOnChange}
          name="paymentTerm"
          labelText="Payment Term"
          type="text"
          value={thisCompanyData.paymentTerm || ""}
        />
        <CreateInput
          onChange={handleOnChange}
          name="organisationNr"
          labelText="Organisation number"
          type="number"
          value={thisCompanyData.organisationNr || ""}
        />
        <CreateInput
          onChange={handleOnChange}
          name="phoneNumber"
          labelText="Phone number"
          type="text"
          value={thisCompanyData.phoneNumber || ""}
        />
        <CreateInput
          onChange={handleOnChange}
          name="reference"
          labelText="Reference"
          type="text"
          value={thisCompanyData.reference || ""}
        />
        <CreateInput
          onChange={handleOnChange}
          name="vatNr"
          labelText="Vat number"
          type="text"
          value={thisCompanyData.vatNr || ""}
        />
        <CreateInput
          onChange={handleOnChange}
          name="website"
          type="text"
          labelText="Website"
          value={thisCompanyData.website || ""}
        />
        <SpacingDiv />
        <PrimaryButton type="submit">Update this company</PrimaryButton>
      </form>
    </div>
  )
}
