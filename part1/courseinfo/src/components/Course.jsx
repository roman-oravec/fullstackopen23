const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => {
  const lst_items = props.parts.map(part =>
    <Part key={part.id} part={part} />
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

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  )
}

const Course = ({course}) => {
  return (
      <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </div>
  )
}

export default Course