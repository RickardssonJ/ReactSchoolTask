import "./App.css"
import React, { useState, useRef } from "react"
import { Route, Switch } from "react-router-dom"
import { infoContext } from "./context/infoContext"
import CompanyDetailPage from "./pages/CompanyDetailPage"
import CompanyCreatePage from "./pages/CompanyCreatePage"
import CompanyUpdatePage from "./pages/CompanyUpdatePage"
import { useHistory } from "react-router-dom"
import { LogIn, SpacingDiv } from "./components/Styled"
import CompanyListRender from "./components/CompanyListRender"

function App() {
  const [companyList, setCompanyList] = useState([])
  const [user, setUser] = useState({})
  const [isTrue, setIsTrue] = useState(false)
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  })
  const history = useHistory()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  //Gets the token, starts getCompanyList and getUser
  function handleOnSubmit(e) {
    e.preventDefault()
    const url = "https://frebi.willandskill.eu/api-token-auth/"

    const payLoad = {
      email: inputData.email,
      password: inputData.password,
    }

    if (inputData.email === "" || inputData.password === "") {
      alert("Please eneter a valid email and password")
    } else {
      fetch(url, {
        body: JSON.stringify(payLoad),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("WEBB20", data.token)
          history.push("/home")
          emailInputRef.current.value = ""
          passwordInputRef.current.value = ""
          getCompanyList()
          getUser()
        })
    }
  }

  function getCompanyList(e) {
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20")
    console.log("Inside first fetch")

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCompanyList(data.results))
  }

  // Fetch for the user namne and email to display at top of the page
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

  function handleOnChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <label className="loginLabel">Email</label>
        <input
          ref={emailInputRef}
          className="loginInput"
          type="email"
          name="email"
          onChange={handleOnChange}
        />
        <label className="loginLabel">Password</label>
        <input
          ref={passwordInputRef}
          className="loginInput"
          type="text"
          name="password"
          onChange={handleOnChange}
        />
        <LogIn type="submit">Log in</LogIn>

        <SpacingDiv />
      </form>
      <infoContext.Provider
        value={{
          companyList,
          setCompanyList,
          user,
          setUser,
          isTrue,
          setIsTrue,
        }}
      >
        <Switch>
          <Route path="/home">
            <CompanyListRender />
          </Route>
          <Route path="/company/create">
            <CompanyCreatePage />
          </Route>
          <Route path="/company/:id/update" component={CompanyUpdatePage} />
          <Route path="/company/:id" component={CompanyDetailPage} />
        </Switch>
      </infoContext.Provider>
    </div>
  )
}

export default App
