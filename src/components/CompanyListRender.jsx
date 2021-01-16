import React, { useContext, useEffect } from "react"
import { infoContext } from "../context/infoContext"
import CompanyListPage from "../pages/CompanyListPage"
import { useHistory } from "react-router-dom"
import { PrimaryButton, SpacingDiv, StyledHeadings } from "./Styled"

export default function CompanyListRender() {
  const { companyList, setCompanyList } = useContext(infoContext)
  const { user, setUser } = useContext(infoContext)
  const { isTrue, setIsTrue } = useContext(infoContext)
  const history = useHistory()

  function getCompanyList() {
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20")

    if (!isTrue) {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setCompanyList(data.results))
      getUser()
      setIsTrue(true)
    } else {
      setCompanyList(companyList)
    }
  }

  function getUser() {
    const url = "https://frebi.willandskill.eu/api/v1/me/"
    const token = localStorage.getItem("WEBB20")

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
  }

  useEffect(() => {
    getCompanyList()
  }, [])

  function goToCreateCompany() {
    history.push("/company/create")
  }

  return (
    <div>
      <StyledHeadings>{`Welcome ${user.firstName} ${user.lastName} With email ${user.email}`}</StyledHeadings>
      <SpacingDiv />
      {companyList.map((item) => {
        return <CompanyListPage key={item.id} data={item} />
      })}
      <SpacingDiv />
      <PrimaryButton onClick={goToCreateCompany}>Add new company</PrimaryButton>
    </div>
  )
}
