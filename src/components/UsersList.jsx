import React from 'react'
import axios from 'axios'

const UsersList = ({user, getAllUsers, URL, setObjectUpdate, setIsShowForm, reset}) => {

    const deleteUser = id => {
        axios.delete(`${URL}${id}`)
            .then(res => {
                console.log(res.data);
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const updateUser = () => {
        setIsShowForm(true)

        const obj = {
            birthday: user.birthday,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password
        }

        reset(obj)
        setObjectUpdate(user)
    }

    return (
        <article className="userList">
            <h2>{`${user.first_name} ${user.last_name}`}</h2>
            <section className="emailSection element">
                <p><b>CORREO</b></p>
                <p>{user.email}</p>
            </section>
            <section className="bithSection element">
                <p><b>CUMPLEAÑOS</b></p>
                <p>{user.birthday}</p>
            </section>
            <div className="bottons">
            <button className="cardButton firs_button" onClick={()=> deleteUser(user.id)}><i class="fa-regular fa-trash-can"></i></button>
            <button className="cardButton last_button"  onClick={updateUser}><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
        </article>
    )
}

export default UsersList