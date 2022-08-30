import React, {useState, useEffect} from "react"
import Form from "./components/Form"
import {nanoid} from "nanoid"
import "./index.css"


export default function App() {
  return(
    <div className="container">
      <Form />
    </div>
  )
}