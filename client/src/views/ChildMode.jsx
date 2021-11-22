import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { ParentContext } from '../context/ParentContext';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ChildMode = () =>{
    const {parent} = useContext(ParentContext);
    const [loaded, setLoaded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const history = useHistory();
    
    const getTaskByParent = async () =>{
        try{
            const taskData = await axios.get(`http://localhost:8000/api/tasks/parent/${parent._id}`);
            console.log('data de byParent:', taskData.data);
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
                text: 'Oops... Ha ocurrido algo',
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
        <div>
            <Container className="my-4 bg-light shadow">
                <Row>
                <Col>
                <h2 className="text-start">Tus tareas</h2>
                <br />
            <Table striped bordered hover>
    <thead className="bg-danger">
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
            <tr key={task._id} className="table-primary">
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
                <td><Button variant="primary" onClick={()=> deleteTask(task._id)}>Completado <FontAwesomeIcon icon={faCheck} /></Button>
                </td>
            </tr>
        ))
    )}
</tbody>
    </Table>
    </Col>
    </Row>
    </Container>
        </div>
    )
}
export default ChildMode;