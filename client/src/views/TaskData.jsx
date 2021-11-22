import React, { useContext, useEffect, useState } from 'react';
import styles from './TaskData.module.scss';
import TaskForm from '../components/TaskForm';
import { ParentContext } from '../context/ParentContext';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Link, useHistory, useParams } from 'react-router-dom';

const TaskData = () =>{
    const {parent} = useContext(ParentContext);
    const history = useHistory();
    const dataOfTask = {
        task: '',
        reward: '',
        date: '',
        status: '',
        note: ''
    };
    const [ data, setData] = useState(dataOfTask);
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);

    const createTask = async (values, {resetForm}) =>{
        console.log('valores de CreateTask:', values);
        console.log('parent:', parent);
        try{
            await axios.post('http://localhost:8000/api/tasks/create', {
            ...values, author: parent._id
            });
        Swal.fire({
            title: '¡Éxito!',
            text: 'Su tarea se creo con éxito',
            icon: 'success',
            ShowConfirmButton: false,
            timer: 2300
        });
        resetForm();
        setTimeout(() => {
            history.push('/')
        }, 2400);
    }catch(err){
            console.log(err.response);
        }
    };

    const getOneTaskById = async () =>{
        try{
            const task = await axios.get(`http://localhost:8000/api/tasks/${id}`);
            console.log('Data de tareaById', task.data);
            setData({
                ...task.data, date: moment.utc(task.data.date).format('YYYY-MM-DD')
            });
            setLoaded(true);
        }catch(err){
            console.log(err);
        }
    }


    const updateTask = async (values) =>{
        try{
            const response = await axios.put(`http://localhost:8000/api/task/update/${id}`, values);
            console.log(response);
            Swal.fire({
                title: '¡Tarea modificada!',
                icon: 'success',
                ShowConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => {
                history.push('/')
            }, 2100);
        }catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchData = async () =>{
            console.log('useEffect:',id);
            if (id) {
                await getOneTaskById();
            }else{
                setLoaded(true);
            }
        }
        fetchData();
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
    

    return(
        <>
            <div className={styles.container}>
            {loaded ? (
                <TaskForm
                changesSubmit={id !== undefined ? updateTask : createTask}
                initialValues={data}
                nameButton={id !== undefined ? 'Actualizar' : 'Crear'}
                />
            ) : (
                <h2>Espere por favor</h2>
                )}
                <Link to={'/'} className="text-decoration-none">Quiero volver al dashboard</Link> 
            </div>
        </>
    )
}
export default TaskData;