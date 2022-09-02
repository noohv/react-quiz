import { nanoid } from "nanoid"
import React, {useState, useEffect} from "react"
import Input from "./Input"


export default function Form() {
    const [data, setData] = useState([])
    const [answerData, setAnswerData] = useState([])
    const [isAnswered, setIsAnswered] = useState(false)
    const [reset, setReset] = useState(false)

    const fetchData = () => {
        fetch("https://opentdb.com/api.php?amount=3&type=multiple")
        .then(response => response.json())
        .then(result => setData(result.results))
    }

    useEffect(() => {
        fetchData()
        setAnswerData([])
        setIsAnswered(false)
    }, [reset])

    const getCorrect = (key,arr) => {
        for(let i of arr) {
            if(i.question === key){
                return i.correct_answer
            }
        }
    }

    const checkAnswers = () => {
        let arr = []
        for(let ansObj of answerData) {
            arr.push(getCorrect(ansObj.question,data))
        }
        return arr
    }

    const handleChange = (e) => {
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

    const score = () => {
        const arr = checkAnswers()
        for(let i=0;i<arr.length;i++) {
            if(arr[i] === answerData[i].answer) {
                console.log("nice")
            }
            else {
                console.log("trash")
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsAnswered(old => !old)
        if(isAnswered) {
            setReset(old => !old)
        }
    }
    
    const inputs = data.map(obj => {
        let ans = obj.incorrect_answers
        ans = [...ans, obj.correct_answer]
        let nId = nanoid()

        return <Input 
            key={obj.question}
            question={obj.question}
            answers={ans}
            handleChange={handleChange}
            answerData={answerData}
            checkAnswers={checkAnswers}
            isAnswered={isAnswered}
            reset={reset}
        />
    })

    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                {inputs}

                {!isAnswered && <button className="button-show">Show result</button>} 
                {isAnswered && <button className="button-show">Reset</button>}
            </form>
        </div>
    )
}