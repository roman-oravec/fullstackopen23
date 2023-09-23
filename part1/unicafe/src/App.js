import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
    return (
            <tr>
              <td>{text}</td> 
              <td>{value} {text==='positive' ? '%' : ''}</td>
            </tr>
    )
}

const Statistics = ({good, bad, neutral}) => {
  let all = good + bad + neutral
  if (all > 0){
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={(good-bad)/all } />
        <StatisticLine text='positive' value={(good)/all*100} />
        </tbody>
        </table>
      </div>
    )}
  return(
    <div>No feedback given</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text={'good'} />
      <Button handleClick={handleNeutral} text={'neutral'} />
      <Button handleClick={handleBad} text={'bad'} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
