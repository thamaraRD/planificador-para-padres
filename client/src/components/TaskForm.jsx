import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";

const TaskForm = (props) =>{
    const { changesSubmit, initialValues, nameButton } = props;
const taskSchema = Yup.object().shape({
    task: Yup.string()
    .min(4, 'La tarea debe tener al menos 4 caracteres')
    .required('Debe ingresar una tarea'),
    reward: Yup.string()
    .required('Debe ingresar una recompensa'),
    date: Yup.date()
    .required('La tarea requiere de una fecha'),
    note: Yup.string()
    .required('Agrega una nota'),
    status: Yup.string()
    .required('Ingrese un estado a la tarea')
});

const disablePastData = () =>{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
}

return (
    <Formik
    validationSchema={taskSchema}
    onSubmit={changesSubmit}
    initialValues={initialValues}
    >
    {({ handleSubmit, handleChange, values, touched, errors }) => (
    <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="task">         
        <Form.Label>Tarea</Form.Label>
            <Form.Control
                type="text"
                name="task"
                placeholder="Dale una tarea a tu hijo"
                value={values.task}
                onChange={handleChange}
                isValid={touched.task && !errors.task}
                isInvalid={!!errors.task}
            />
            <Form.Control.Feedback type="invalid">
            {errors.task}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="reward">            
            <Form.Label>Recompensa</Form.Label>
            <Form.Control
                type="text"
                name="reward"
                placeholder="Escribe una recompensa"
                value={values.reward}
                onChange={handleChange}
                isValid={touched.reward && !errors.reward}
                isInvalid={!!errors.reward}
            />
            <Form.Control.Feedback type="invalid">
            {errors.reward}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
                type="date"
                name="date"
                min={disablePastData()}
                value={values.date}
                onChange={handleChange}
                isValid={touched.date && !errors.date}
                isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
            {errors.date}
            </Form.Control.Feedback>
            </Form.Group>
        
        
            <Form.Group className="mb-3" controlId="status">            
            <Form.Label>Estado de la tarea</Form.Label>
            <Form.Select
                name="status"
                value={values.status}
                onChange={handleChange}
                isValid={touched.status && !errors.status}
                isInvalid={!!errors.status}
            >
                <option>Seleccione un estado</option>
                <option value={'Pendiente'}>Pendiente</option>
                <option value={'En Proceso'}>En Proceso</option>
                <option value={'Completado'}>Completado</option>
            </Form.Select>   
            <Form.Control.Feedback type="invalid">
            {errors.status}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="note">            
            <Form.Label>Nota</Form.Label>
            <Form.Control
                as="textarea"
                rows={2}
                placeholder="Escribe una nota para aclarar algo... "
                name="note"
                value={values.note}
                onChange={handleChange}
                isValid={touched.note && !errors.note}
                isInvalid={!!errors.note}
            />
            <Form.Control.Feedback type="invalid">
            {errors.note}
            </Form.Control.Feedback>
            </Form.Group>
    <Button variant="primary" type="submit" className="my-2">{nameButton}</Button>
        </Form>
    )}
    </Formik>
);
}

export default TaskForm;