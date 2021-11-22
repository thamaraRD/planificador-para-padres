import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ParentContext } from '../context/ParentContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';

const MainScreen = () =>{
    const {parent} = useContext(ParentContext);
    const [loaded, setLoaded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    const getTaskByParent = async () =>{
        try{
            const taskData = await axios.get(`http://localhost:8000/api/tasks/parent/${parent._id}`);
            console.log('data de byParent', taskData.data);
            setTasks(taskData.data);
            setLoaded(true);
        }catch(err){
            console.log('error al traerse las tareas del ByParent:', err);
        }
    }

    useEffect(() => {
        console.log('usuario logueado?:', parent);
        if(!parent){
            history.push('/login')
        }
    }, [parent, history]);

    useEffect(() => {
        getTaskByParent();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const deleteTask = async (id) =>{
        try{
            const response = await axios.delete(`http://localhost:8000/api/tasks/delete/${id}`);
            history.push('/')
            console.log(response);
            Swal.fire({
                title: '¡Tarea completada!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if(result.isConfirmed){
                    setTasks(tasks.filter((task) => task._id !== id));
                }
            })
        }catch(err){
            console.log(err);
            Swal.fire({
                title: 'Error!',
                text: 'Ha ocurrido algo',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const updateTaskStatus = async (values, tasksStatus) =>{
        try{
            const update = { ...values, status: tasksStatus };
            await axios.put(`http://localhost:8000/api/tasks/update/${values._id}`, update);
            console.log('Se actualizó la tarea', update);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <>
                <Container className="my-4 bg-light shadow">
                <Row>
                <Col>
            <h2 className="text-start">Estas son las tareas de {parent?.childName}</h2>
            <br />
            <Table striped bordered hover>
    <thead className="bg-info">
    <tr>
    <th>Tarea</th>
    <th>Recompensa</th>
    <th>Fecha</th>
    <th>Estado</th>
    <th>Nota</th>
    <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    {loaded && tasks.length === 0 ? (
    <tr>
    <td colSpan="12">AÚN NO HAY TAREAS ASIGNADAS</td>
    </tr>
    ) : (
        tasks?.map((task) =>(
            <tr key={task._id} className="table-info">
                <td>{task.task}</td>
                <td>{task.reward}</td>
                <td>{moment.utc(task.date).format('YYYY-MM-DD')}</td>
                <td>
                <Form.Select
                name="status"
                defaultValue={task.status}
                onChange={(e) => updateTaskStatus(task, e.target.value)}
            >
                <option value={'Pendiente'}>Pendiente</option>
                <option value={'En Proceso'}>En Proceso</option>
                <option value={'Completado'}>Completado</option>
            </Form.Select>   
                </td>
                <td>{task.note}</td>
                <td><Button variant="warning">
                    <Link to={`task/${task._id}`} className="text-decoration-none text-light">Editar</Link>
                </Button> | <Button variant="danger" onClick={()=> deleteTask(task._id)}>Completado</Button>
                </td>
            </tr>
        ))
    )}
</tbody>
    </Table>
        <Button variant="info" className="float-end mb-2">
        <Link to={'/create'} className="text-decoration-none text-light">
            <FontAwesomeIcon icon={faPlus} size="1x"/> Nueva tarea
        </Link>
        </Button>
        </Col>
        </Row>
        </Container>
    </>
    )
}
export default MainScreen;