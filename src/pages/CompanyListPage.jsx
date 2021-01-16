import React from "react"

import { Link } from "react-router-dom"

export default function CompanyListPage({ data }) {
  return (
    <div>
      <h3>
        <Link to={`/company/${data.id}`}>{data.name}</Link>
      </h3>
    </div>
  )
}
