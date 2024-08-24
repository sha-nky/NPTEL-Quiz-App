import React, { useState, useEffect, useRef } from "react"
import {toast} from 'react-toastify'

import { getAllQuestions } from "../api/apiCalls"

function Quiz() {
  // Fetching all questions
  const [allQuestions, setAllQuestions] = useState([])
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getAllQuestions();
      if(data.error){
        console.log(data.error);
        setError(true);
      }
      else{
        setAllQuestions(data);
      }
    }

    fetchQuestions();
  }, [])
  // ******************************************

  const [index, setIndex] = useState(0)
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [result, setResult] = useState(false)
  const [start, setStart] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let option_array = [option1, option2, option3, option4]

  const callToast = (type, message) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  const checkAns = (ele, ans) => {
    if (lock === false) {
      if (allQuestions[index].ans === ans) {
        callToast('success', 'Correct Answer!')
        setScore((prev) => prev + 1)
        ele.target.classList.add('correct')
      } else {
        setWrong((prev) => prev + 1)
        callToast('error', 'Wrong Answer!')
        ele.target.classList.add('wrong')
        option_array[allQuestions[index].ans - 1].current.classList.add('correct')
      }
      setLock(true)
    }
  }

  const next = () => {
    if (lock === true) {
      if (index === allQuestions.length - 1) {
        setResult(true)
        return 0
      }
      setIndex(++index)
      //setQuestion(allQuestions[index])
      setLock(false)
      option_array.map((option) => {
        option.current.classList.remove('wrong')
        option.current.classList.remove('correct')
        return null
      })
    } else {
      callToast('warn', 'Please Select An Option!')
    }
  }

  const reset = () => {
    setIndex(0)
    setScore(0)
    setWrong(0)
    setLock(false)
    setResult(false)
  }

  const startQuiz = () => {
    setStart(true)
  }

  return (
    <div className="quizContainer">
      <div className="d-flex justify-content-between heading">
        <h1>NPTEL - Forest and Their Management</h1>
        {start ? (
          <p>
            <strong>Correct: </strong>
            {score} &nbsp;
            <strong>Wrong: </strong>
            {wrong}
          </p>
        ) : (
          <></>
        )}
      </div>
      <hr />
      {start ? (
        result ? (
          <>
            <h2>
              You Scored {score} out of {allQuestions.length}
            </h2>
            <button onClick={reset} className="btn btn-outline-success">
              Reset
            </button>
          </>
        ) : (
          <>
            {allQuestions && (
              <>
                <h2>
                  {index + 1}. {allQuestions[index].question}
                </h2>
                <ul>
                  <li
                    ref={option1}
                    onClick={(e) => {
                      checkAns(e, 1)
                    }}
                  >
                    {allQuestions[index].option1}
                  </li>
                  <li
                    ref={option2}
                    onClick={(e) => {
                      checkAns(e, 2)
                    }}
                  >
                    {allQuestions[index].option2}
                  </li>
                  <li
                    ref={option3}
                    onClick={(e) => {
                      checkAns(e, 3)
                    }}
                  >
                    {allQuestions[index].option3}
                  </li>
                  <li
                    ref={option4}
                    onClick={(e) => {
                      checkAns(e, 4)
                    }}
                  >
                    {allQuestions[index].option4}
                  </li>
                </ul>
                <button onClick={next} className="btn btn-outline-primary">
                  Next
                </button>
                <div className="index">
                  {index + 1} of {allQuestions.length} questions
                </div>
              </>
            )}
          </>
        )
      ) : (
        <>
          <p>
            This is a full-stack quiz app I created to test my skills in using React and Sanity.
            Please note that this application is not affiliated with the real questions asked in the
            NPTEL Forest and Their Management Test. It contains only the questions from the weekly
            quizzes in the course. You can practice quizzes for the course or find the source code
            provided in the top right corner if you are interested.
            <br />
            <strong>Note: </strong>
            Make sure you have fast internet connection else the website migth throw some errors.
          </p>
          <button className="btn btn-outline-success" onClick={startQuiz}>
            Start
          </button>
        </>
      )}
    </div>
  )
}

export default Quiz