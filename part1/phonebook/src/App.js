import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  return (
    <div>{props.name} {props.number}</div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterByName = (props) => {
  return (
    <div>
      Filter: <input value={props.filter} onChange={props.handleFilter} />
    </div>
  )
}

const Persons = ({ persons, filter }) => {
  const personsToShow = filter.length > 0 ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />)
      }</div>)
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber
    }
    console.log(newPersonObj)

    // Check if the person is already there
    // by filtering all names that equal the new name
    if (persons.filter(n => n.name === newName).length > 0) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons(persons.concat(newPersonObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterByName filter={filter} handleFilter={handleFilter} />
      <h3>New contact</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
