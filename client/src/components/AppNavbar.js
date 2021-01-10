import React, { useCallback, useEffect, useState } from "react";
import { Container, Navbar, NavbarToggler, Collapse, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
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
                ? <h1 className="text-white">authLink</h1>
                : <LoginModal />
              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AppNavbar;
