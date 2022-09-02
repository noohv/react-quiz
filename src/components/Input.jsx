import React, {useState, useEffect} from "react"
import { nanoid } from "nanoid"

export default function Input(props) {
    
    let obj
    props.answerData ? obj = props.answerData.find(o => o.question === props.question) : obj = false
    
    const [propsAnswers, setPropsAnswers] = useState([])

    const shuffleArray = (array) => {
        const arr = array
        arr.sort(() => Math.random() - 0.5)
        return arr
    }

    useEffect(() => {
        setPropsAnswers(shuffleArray(props.answers))
    }, []) 

    const inputs = propsAnswers.map(ans => {
        let isChecked = obj ? (obj.answer===ans) : false
        let readOnly = props.isAnswered ? true : false

        return (
            <div className="input-field-container" key={nanoid()}>
                <label className={props.isAnswered ?
                    (isChecked ? 
                        (props.checkAnswers().includes(ans) ? "correct" : "checked"):
                            (props.checkAnswers().includes(ans) ? "correct" : "input-label")) : 
                                (isChecked ? "input-label checked" : "input-label")}
                    htmlFor={ans}>{ans}</label>
                <input
                    className="input-field"
                    type="radio"
                    id={ans}
                    name={props.question}
                    value={ans}
                    onChange={!props.isAnswered ? props.handleChange : null}
                    readOnly={readOnly}
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