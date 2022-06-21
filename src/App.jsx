import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import { useForm } from 'react-hook-form'

const URL = 'https://users-crud1.herokuapp.com/users/'

function App() {

  const {handleSubmit, register, reset} = useForm()

  const [users, setUsers] = useState()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()
  
  const getAllUsers = () => {
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  

  const createUser = newUser => {
    if(!(newUser.first_name === '' || newUser.last_name === '' || newUser.email === '' || newUser.password === '' || newUser.birthday === '')){
      axios.post(URL, newUser)
        .then(res => {
          console.log(res.data)
          getAllUsers()
        })
        .catch(err => console.log(err))
    }
  }

  const updateUserById = (id, updateUser) => {

    axios.patch(`${URL}${id}/`, updateUser)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setObjectUpdate()
        setIsShowForm(false)
      })
      .catch(err => console.log(err))
  }

  const showForm = () => {
    const obj = {
      birthday: '',
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    }
    reset(obj)
    setIsShowForm(!isShowForm)
  }

  return (
    <div className="App">
    <div className="userForm">
    <button onClick={showForm}>{isShowForm? 'Cerrar': '+ Crear nuevo usuario'}</button>
      {
        isShowForm && <UsersForm 
          createUser={createUser} 
          updateUserById={updateUserById}
          objectUpdate={objectUpdate}
          handleSubmit={handleSubmit}
          reset={reset}
          register={register}
        />
      }
    </div>
      <div className="cardUser">
      {
        users?.map(user => (
          <UsersList 
            key={user.id}
            user={user}
            URL={URL}
            getAllUsers={getAllUsers}
            setObjectUpdate={setObjectUpdate}
            setIsShowForm={setIsShowForm}
            reset={reset}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App
