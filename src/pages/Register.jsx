import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { registerUser } from "../features/user/userActions";
import { useDispatch, useSelector } from "react-redux";
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
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
const Policy = styled.span`
  font-size: 11.3px;
  font-weight: 600;
  margin: 15px 0px; ;
`;
const Button = styled.button`
  width: 35%;
  border: none;
  padding: 15px 20px;
  background-color: #5e5e5e;
  color: white;
  cursor: pointer;
  border: 2px black solid;
  border-radius: 0.5rem;
  margin: auto;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedpass, setRepeatedpass] = useState("");

  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if ([username, email, password, repeatedpass].includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setAlert("Tu contraseña debe al menos tener 6 o más caracteres");
      return;
    }
    if (password !== repeatedpass) {
      setAlert("Los passwords no coinciden");
      return;
    }
    // Dispatch registerUser Action
    dispatch(registerUser({ username, email, password }));
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Crea tu cuenta</Title>
          <Form>
            <Input
              placeholder="Nombre de usuario"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contraseña de al menos 6 carácteres"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Repite tu contraseña"
              id="password2"
              type="password"
              value={repeatedpass}
              onChange={(e) => setRepeatedpass(e.target.value)}
            />
            <Policy>
              He leído y al registrarme acepto lo descrito en las cláusulas
              informativas del tratamiento del sitio web, la Política de
              Privacidad y la Política de Cookies.
            </Policy>
            {alert && <Error>{alert}</Error>}
            <Button type="submit" onClick={handleSubmit}>
              Registrarse
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
