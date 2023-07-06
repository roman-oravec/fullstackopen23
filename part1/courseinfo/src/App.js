
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <ul>
      <Part name={props.parts[0][0]} count={props.parts[0][1]}/>
      <Part name={props.parts[1][0]} count={props.parts[1][1]}/>
      <Part name={props.parts[2][0]} count={props.parts[2][1]}/>
    </ul>
  )
  
}

const Total = (props) => {
  let sum = props.counts.reduce(function(a, b){
    return a + b;
  });
  return (
    <div>
      {sum}
    </div>
  )
}

const Part = (props) => {
  return (
    <li>
      {props.name} {props.count}
    </li>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]}/>
      <Total counts={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App