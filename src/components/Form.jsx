import { nanoid } from "nanoid"
import React, {useState, useEffect} from "react"
import Input from "./Input"


export default function Form() {
    const [data, setData] = useState([])
    const [answerData, setAnswerData] = useState([])

    useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(response => response.json())
      .then(result => setData(result.results))
    }, [])

    function handleChange(e) {
        const {name, value} = e.target

        const addAnswer = (obj) => {
            setAnswerData(current => [...current, obj])
        }

        const updateAnswer = () => {
            setAnswerData(current =>
                current.map(obj => {
                    if(obj.question === name) {
                        return {...obj, answer:value}
                    }
                    return obj
                }))
        }

        if(answerData.find(elem => elem.question === name)){
            updateAnswer()
        }
        else {
            addAnswer({question:name, answer:value})
        }

    }

    function handleSubmit(e) {
        e.preventDefault()
        setAnswerData([])
    }
    
    const inputs = data.map(obj => {
        let ans = obj.incorrect_answers
        ans = [...ans, obj.correct_answer]
        let nId = nanoid()

        return <Input 
            key={nId}
            question={obj.question}
            answers={ans}
            handleChange={handleChange}
            answerData={answerData}
        />
    })

    return(
        <form className="form" onSubmit={handleSubmit}>
            {inputs}
            <button className="button-show">Show result</button>
        </form>
    )
}