import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { userLogin } from "../features/user/userActions";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import Error from "../components/Error";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(https://www.2playbook.com/uploads/s1/16/26/6/air-jordan-mid-1-sneakers.jpeg)
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  @media only screen and (max-width: 794px) {
    width: 70%;
  }
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 10px 0px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #5e5e5e;
  color: white;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 0.5rem;
  margin: 5px auto;

  &:disabled {
    color: #ff0000;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if ([email, password].includes("")) {
      setAlert("Rellena ambos campos para continuar");
      return;
    }
    setAlert("");
    dispatch(userLogin({ email, password }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Inicia sesión</Title>
          <Form>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {alert && <Error>{alert}</Error>}
            <Button
              onClick={handleSubmit}
              className="text-link"
              disabled={loading}
            >
              Iniciar Sesión
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
