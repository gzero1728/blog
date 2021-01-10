import React, { useCallback, useEffect, useState } from "react";
import { Container, Navbar, NavbarToggler, Collapse, Nav, NavItem, Form, Button } from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal"
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
  console.log(userRole, "UserRole");

  const dispatch = useDispatch();

  // useEffect와 유사하지만 최적화시켜주는 성능이 있다. 
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    })
  }, [dispatch])

  useEffect(() => {
    setIsOpen(false)
  }, [user])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const addPostClick = () => {

  }

  const authLink = (
    <>
      <NavItem>
        {userRole === "MainJuin"
          ? (
            <Form className="col mt-2">
              <Link to="post" className="btn btn-success block text-white px-3" onClick={addPostClick}>
                Add Post
              </Link>
            </Form>
          ) : ""}
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
              <Button outline color="light" className="px-3" block>
                <strong>"No User"</strong>
              </Button>
            )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#">
            <Button outline color="light" className="px-2" block>
              Logout
              </Button>
          </Link>
        </Form>
      </NavItem>
    </>
  )

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  )

  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Side Project's Blog
                    </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-arouend" navbar>
              {isAuthenticated
                ? authLink
                : guestLink
              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AppNavbar;
