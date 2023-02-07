import React, { useState, useEffect, useRef } from 'react'
import words from './words.json'
import Modal from './components/Modal';

const App: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [score, setScore] = useState<number>(0)
  const [input, setInput] = useState<string>("")
  const [wordList, setWordList] = useState<Array<string>>(words)
  const [word, setWord] = useState<string>("")
  const [stage, setStage] = useState<number>(1)
  const [intervalTime, setIntervalTime] = useState<number>(1000)
  const scoreRef = useRef<HTMLParagraphElement>(null)
  const timerRef = useRef<HTMLHeadingElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    checkWord(e.target.value)
  }

  const changeWord = (): void => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(randomWord)
  }

  const checkWord = async (input: string): Promise<void> => {
    if(input === word){
      await setInput("")
      if(score % 10 === 0 && score != 0){
        setStage(prev => prev + 1)
        setIntervalTime(prev => prev - 300)
      }
      await setScore(prev => prev + 1)
      scoreRef.current!.classList.add('active')
      setTimeout(() => {
        scoreRef.current!.classList.remove('active')
      }, 700)
      changeWord()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if(prev <= 0){
          stopTimer(interval)
          return prev
        }
        if(prev <= 10){
          timerRef.current!.style.color = 'red'
        }
        return prev - 1
      })
    }, intervalTime)
    return () => clearInterval(interval)
  }, [intervalTime])

  useEffect(() => {
    changeWord()
    inputRef.current!.focus()
  }, [])

  const stopTimer = (interval: number) => {
    if(timer <= 0){
      clearInterval(interval)
    }
  }

  return (
    <div className="container">
      { timer <= 0 && <Modal stage={stage} score={score} />}
      <div className="top-cont">
        <h2> Score: {score}</h2>
        <p ref={scoreRef}> +1 </p>
        <h2>Stage: {stage}</h2>
      </div>
      <h2 className="timer" ref={timerRef}> {timer}s </h2>
      <h2 className="word"> {word} </h2>
        <div className="inp">
          <input disabled={timer <= 0} type="text" value={input} onChange={setInputValue} ref={inputRef} />
        </div>
        <footer> Inspired By Jortsoft </footer>
    </div>
  )
}

export default App