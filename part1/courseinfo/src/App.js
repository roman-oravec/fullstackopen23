
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  const lst_items = props.parts.map(part =>
    <Part part={part} />
    )
  return (
    <div>
      <ul>
        {lst_items}
      </ul>
    </div>
  ) 
}

const Part = (props) => {
  return (
      <li>
        {props.part.name} {props.part.exercises}
      </li>
  )
}

const Total = (props) => {
  let sum = 0
  console.log(props)
  props.parts.map(x => sum += x.exercises)
  return (
    <div>
      {sum}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App