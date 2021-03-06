import React, { useEffect, useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux"
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types"

// redux, redux-saga를 통해서 상태관리
const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState('');
  const [form, setValue] = useState({
    email: "",
    password: ""
  });
  // redux hooks 
  const dispatch = useDispatch();
  // reducer state의 auth를 선택(selector)해서 그 중 errorMsg만 불러옴
  const { errorMsg } = useSelector((state) => state.auth);
  // errorsg 변화가 있을 때 setLocalMsg를 실행
  useEffect(() => {
    try {
      setLocalMsg(errorMsg)
    } catch (e) {
      console.log(e)
    }
  }, [errorMsg])

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    })
    setModal(!modal)
  }

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispatch({
      type: LOGIN_REQUEST,
      payload: user
    })
  }
  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
            </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>
          Login
                </ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
                            </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default LoginModal;