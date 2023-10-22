import { useState, useEffect } from 'react'
import axios from 'axios'

import phonebookService from './services/phonebook'

const Person = (props) => {
  return (
    <div>{props.name} {props.number} <button onClick={props.handleDelete}>delete</button></div>
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

const Persons = ({ persons, filter, handleDelete }) => {
  const personsToShow = filter.length > 0 ?
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) :
    persons
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.id)} />)
      }</div>)
}

const Notification = ({ message, notificationClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification')

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
      if (window.confirm(`${newName} is already in list. Wanna update his number to ${newNumber}?`)) {
        const toBeUpdated = persons.find(p => p.name === newName)
        phonebookService
          .update(toBeUpdated.id, newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== toBeUpdated.id ? p : returnedPerson))
          })
        setNotificationClass('notification')
        setNotification(`${newName} updated.`)
        setTimeout(() => { setNotification(null) }, 5000)
      }
    } else {
      phonebookService
        .create(newPersonObj)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
      setNotificationClass('notification')
      setNotification(`${newName} added.`)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const handleDelete = (id) => {
    const toBeDeleted = persons.find(p => p.id === id)
    if (window.confirm(`You really wanna delete ${toBeDeleted.name}?`))
      phonebookService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setNotificationClass('error')
          setNotification(`${toBeDeleted.name} was already removed from the server`)
          setTimeout(() => { setNotification(null) }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        }

        )
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
      <Notification message={notification} notificationClass={notificationClass}/>
      <FilterByName filter={filter} handleFilter={handleFilter} />
      <h3>New contact</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App
