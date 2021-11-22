import React, { useContext, useEffect, useState } from "react";
import styles from './NavBarMenu.module.scss';
import { ParentContext } from "../context/ParentContext";
import { Container, Nav, Navbar, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faRobot } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

const NavBarMenu = () => {
const { parent, setParent } = useContext(ParentContext);
const [child, setChild] = useState();
const history = useHistory();
const location = useLocation();

const handleLogOut = async () => {
    setParent(null);
    localStorage.clear();
    try {
        history.push("/login");
        await axios.post("http://localhost:8000/api/parent/logout", {});
    } catch (err) {
    console.log({ msg: "error de logout:", err });
    }
};

const handleNav = () =>{

        setChild(false);
        history.push('/');

}

useEffect(() => {
    location.pathname === '/child-mode' ? setChild(true) : setChild(false);
    console.log('inicio de chil-mode');
}, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
    <>
        {child ? (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                <img
                    src="/img-menu.png"
                    alt="imagen de planificador"
                    width="50"
                    height="40"
                /> <b>Estás en:</b> <b className={styles.b}>MODO NIÑO <FontAwesomeIcon 
                icon={faRobot}
                /></b>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
            </Navbar.Collapse>
                <Row>
                    <Col>
                    <p className="text-end">
                    <b>¡Hola, {parent?.childName}!</b>
                    </p>
                    <Button variant="danger" onClick={handleNav}> Salir <FontAwesomeIcon
                    icon={faChild}
                    size="lg" />   
                    </Button>
                </Col>
                </Row>
            </Container>
            </Navbar>
            )
        : (
            <>
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                <img
                    src="/img-menu.png"
                    alt="imagen de planificador"
                    width="50"
                    height="40"
                /> <b>Planificador para padres</b>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/child-mode">
                    <Nav.Link>Modo Niño</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
                <Row>
                    <Col>
                    <p className="text-end">
                    <b>¡Hola, {parent?.parentName}!</b>
                    </p>
                    <Button variant="dark" onClick={handleLogOut}>
                    Cerrar sesión
                    </Button>
                </Col>
                </Row>
            </Container>
            </Navbar>
        </>
        )}
    </>
    )
}
export default NavBarMenu;
