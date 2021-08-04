import React, { useEffect, useState } from 'react';
import './App.css';
import QuestionCard from './Components/QuestionCard';
import { getQuizDetails } from './services/quiz_service';
import { Quiz } from './Types/quiz_type';

function App() {
  let [quiz, setQuiz] = useState<Quiz[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const questions: Quiz[] = await getQuizDetails(5, 'easy');
      // console.log(questions);
      setQuiz(questions)
    }
    fetchData();
  }, [])

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    // console.log(userAns)
    const currentQuestion: Quiz = quiz[currentStep]
    console.log("correct answer " + currentQuestion.correct_answer + "--user selection " + userAns)
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score)
    }

    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep)
    else {
      setShowResult(true)
    }
  }

  if (!quiz.length)
    return <h3>Loading...</h3>

  const handleReset = (e: React.FormEvent<EventTarget>) => {
    setShowResult(false)
    setCurrentStep(0)
    setScore(0)
  }


  if (showResult) {
    return (
      <div className="result-container">
        <h2>Result</h2>
        <p>Your score is <b>{score}</b> out of <b>{quiz.length}</b></p>
        <input type="reset" onClick={handleReset} className="reset-btn" />
      </div>
    )
  }


  return (
    <div className="App">
      <h1>Quiz App</h1>
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
