import React from 'react';
import styles from './ParentForm.module.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';

const ParentForm = (props) =>{
    const { login, formHandler, nameButton } = props;
    const SignupSchema = Yup.object().shape({
        parentName: Yup.string()
        .min(3, 'El nombre no puede tener menos de 3 caracteres')
        .required('Debe ingresar un nombre'),
        childName: Yup.string()
        .min(3, 'El nombre no puede tener menos de 3 caracteres')
        .required('Debe ingresar un nombre'),
        email: Yup.string()
        .email('El formato de email debe ser válido')
        .required('Debe ingresar un email'),
        password: Yup.string()
        .min(4, 'La contraseña debe tener más de 4 caracteres')
        .required('Ingrese una contraseña'),
        confirmPassword: Yup.string()
        .required('Ingrese contraseña')
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    });

    const loginSchema = Yup.object().shape({
        email: Yup.string()
        .email('El formato de email debe ser válido')
        .required('Debe ingresar un email'),
        password: Yup.string()
        .min(4, 'La contraseña debe tener más de 4 caracteres')
        .required('Ingrese una contraseña'),
    });
    return(
        <>
        <div className={styles.card1}>
    <Formik
    initialValues={{
        parentName: '',
        childName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }}
    validationSchema={login ? loginSchema : SignupSchema }
    onSubmit={formHandler}
    >
    {({ errors, touched }) => (
        <Form>
            {!login && (
            <>
        <label htmlFor="parentName">Nombre completo del adulto</label>    
        <Field name="parentName" />
        {errors.parentName && touched.parentName ? (
            <div className={styles.errors}>{errors.parentName}</div>
        ) : null}

            <label htmlFor="childName">Nombre del niño</label>
        <Field name="childName" />
        {errors.childName && touched.childName ? (
            <div className={styles.errors}>{errors.childName}</div>
        ) : null}
        </>
                )}
        <label htmlFor="email">Correo Electrónico</label>
        <Field name="email" type="email" />
        {errors.email && touched.email ? <div className={styles.errors}>{errors.email}</div> : null}

            <label htmlFor="password">Contraseña</label>
        <Field name="password" type="password" />
        {errors.password && touched.password ? <div className={styles.errors}>{errors.password}</div> : null}
            {!login && (
                <>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <Field name="confirmPassword" type="password" />
        {errors.confirmPassword && touched.confirmPassword ? <div className={styles.errors}>{errors.confirmPassword}</div> : null}
                </>
                )}
<Button variant="primary" className="mt-3" type="submit">{nameButton}</Button>
        </Form>
    )}
    </Formik>
        </div>
        </>
    )
}
export default ParentForm;
