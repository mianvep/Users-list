
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const UsersForm = ({createUser, updateUserById, objectUpdate, handleSubmit, reset, register}) => {

    const defaultValuesForm = {
        birthday: '',
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    }
    
    const submit = data => {
        if(objectUpdate.id !== undefined) {
            updateUserById(objectUpdate.id, data)
            reset(defaultValuesForm)
        } else {
            createUser(data)
        }
        reset(defaultValuesForm)
    }

    return (
        <form className="formSection" onSubmit={handleSubmit(submit)}>
            <div className="inputSection">
                <label htmlFor="first_name">Nombre</label>
                <input type="text" id="first_name" {...register('first_name')} />
            </div>
            <div className="inputSection">
                <label htmlFor="last_name">Apellidos</label>
                <input type="text" id="last_name" {...register('last_name')}/>
            </div>
            <div className="inputSection">
                <label htmlFor="email">Correo</label>
                <input type="email" id="email" {...register('email')}/>
            </div>
            <div className="inputSection">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" {...register('password')}/>
            </div>
            <div className="inputSection">
                <label htmlFor="birthday">Cumpleaños</label>
                <input type="date" id="birthday" {...register('birthday')}/>
            </div>
            <button>Enviar</button>
        </form>
    )
}

export default UsersForm