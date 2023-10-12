import { useState } from 'react'

const Name = ({name}) => {
  return(
    <div>{name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName
    }
    console.log(newPersonObj)
    // Check if the person is already there
    // by filtering all names that equal the new name
    if (persons.filter(n => n.name === newName).length > 0){
      alert(`${newName} is already in the phonebook`)
      return
    } 
    setPersons(persons.concat(newPersonObj))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Name key={person.name} name={person.name}/>)}

      {/* <div>debug {newName}</div> */}
    </div>
  )
}

export default App
