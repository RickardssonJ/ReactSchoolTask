import { useState, useEffect, useContext } from "react"
import React from "react"
import { useHistory, Link } from "react-router-dom"
import {
  PrimaryButton,
  DeleteButton,
  StyledHeadings,
  SpacingDiv,
} from "../components/Styled"
import { infoContext } from "../context/infoContext"

export default function CompanyDetailPage(props) {
  const [detailedCompany, setDetailedCompany] = useState({})
  const id = props.match.params.id
  const token = localStorage.getItem("WEBB20")
  const history = useHistory()
  const { isTrue, setIsTrue } = useContext(infoContext)

  function getDetailInfo() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${id}/`
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDetailedCompany(data)
      })
  }

  function deleteCompany() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${id}/`
    const token = localStorage.getItem("WEBB20")

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json)
      .then(() => history.push("/home"))
    setIsTrue(false)
  }

  useEffect(() => {
    getDetailInfo()
  }, [])

  return (
    <div>
      <StyledHeadings>{`Detailed information about ${detailedCompany.name}`}</StyledHeadings>
      <SpacingDiv />
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{detailedCompany.name}</td>
          </tr>

          <tr>
            <td>Organisation number:</td>
            <td>{detailedCompany.organisationNr}</td>
          </tr>

          <tr>
            <td>Vat number</td>
            <td>{detailedCompany.vatNr}</td>
          </tr>

          <tr>
            <td>Reference</td>
            <td>{detailedCompany.reference}</td>
          </tr>

          <tr>
            <td>Payment Terms</td>
            <td>{detailedCompany.paymentTerm}</td>
          </tr>

          <tr>
            <td>Website</td>
            <td>{detailedCompany.website}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{detailedCompany.email}</td>
          </tr>

          <tr>
            <td>Phone number</td>
            <td>{detailedCompany.phoneNumber}</td>
          </tr>
        </tbody>
      </table>

      <SpacingDiv />

      <Link to={`/company/${id}/update`}>
        <PrimaryButton>Update this company</PrimaryButton>
      </Link>

      <DeleteButton onClick={deleteCompany}>Delete this company</DeleteButton>
    </div>
  )
}
