import React, {useState, UseEffect} from "react"
import { nanoid } from "nanoid"

export default function Input(props) {

    let obj
    props.answerData ? obj = props.answerData.find(o => o.question === props.question) : obj = false

    const inputs = props.answers.map(ans => {
        let isChecked = obj ? (obj.answer===ans) : false

        return (
            <div className="input-field-container" key={nanoid()}>
                <label className={isChecked ? "input-label checked" : "input-label"} htmlFor={ans}>{ans}</label>
                <input
                    className="input-field"
                    type="radio"
                    id={ans}
                    name={props.question}
                    value={ans}
                    onChange={props.handleChange}
                    checked={isChecked}
                />
            </div>
        )
    })

    return(
        <div>
            <h3 className="input-question">{props.question}</h3>
            <div className="input-container">
                {inputs}
            </div>
        </div>


    )
}