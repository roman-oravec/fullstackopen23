
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


// We define a JS (arrow) function and assign it to App
// App is a React component 
// Component names must be Capitalized
const App = () => {
  const name = 'Janka'
  const age = 19

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Jano' age={60 + 9} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App;
