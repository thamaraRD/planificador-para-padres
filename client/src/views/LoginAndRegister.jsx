import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ParentForm from '../components/ParentForm';
import { ParentContext } from '../context/ParentContext';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';

const key = 'Parent_key';
const LoginAndRegister = () =>{
const [login, setLogin] = useState();
const {parent, setParent} = useContext(ParentContext);
const history = useHistory();
const location = useLocation();

const handleLogin = () =>{
    if(login){
        setLogin(false);
        history.push('/register');
    } else{
        setLogin(true);
        history.push('/login');
    }
}
    const registerParent = async (values, {resetForm}) =>{
        try{
            const response = await axios.post('http://localhost:8000/api/parent/register', values);
            console.log(response.data);
            Swal.fire({
                title: 'Guardado con éxito',
                text: `${values.parentName} se registro con éxito`,
                icon: 'success',
                confirmButtonText: '¡Que Bien!'
            }).then((result) => {
                if(result.isConfirmed){
                    setLogin(true);
                    history.push('/login');
                }
            });
            resetForm();
            }catch(err){
            console.log(err.response);
            Swal.fire({
                title: '¡Algo ha sucedido!',
                text: err.response.data.error.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            })
        }
    }
    const loginParent = async (values) =>{
        try{
            const login = await axios.post('http://localhost:8000/api/parent/login', values);
            console.log('Data de axios:', login.data);
            setParent(login.data);
            localStorage.setItem(key, JSON.stringify(login.data));
            Swal.fire({
                title: '¡Se inicio sesión exitosamente!',
                icon: 'success',
                showConfirmButton: false,
                timer:2400
            });
            setTimeout(() => {
                history.push('/');
            }, 2500);
        }catch(err){
            Swal.fire({
                title: 'Usuario o Contraseña inválida, por favor revisa e intenta de nuevo',
                icon: 'error',
                confirmButtonText: 'Ok',
        })
    }
}
useEffect(() => {
    if(parent){
        history.push('/');
    }
location.pathname === '/register' ? setLogin(false) : setLogin(true);

}, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {login ?
            <h1>LOGIN</h1>
                :
            <h1>REGISTRO</h1>}
            <ParentForm
            login={login}
            formHandler={login ? loginParent : registerParent }
            nameButton={login? 'Acceder' : 'Registrarse'}
            />
            <Button variant="success" className="my-2" onClick={handleLogin}>{!login ? 'Acceder' : 'Registrarse'}</Button>
        </div>
    )
            }
export default LoginAndRegister;