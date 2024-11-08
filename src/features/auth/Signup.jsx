/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { space, color, typography } from "styled-system";

// Styled components using Emotion and Styled System
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #181818;
  color: #ffffff;
  padding: 20px;
`;

const Title = styled.h2`
  ${typography}
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff4757;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  ${space}
  ${color}
  ${typography}
  background-color: #222;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: #ffffff;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #ff4757;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #ff4757;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e04040;
  }
`;

const LoginLink = styled.p`
  font-size: 0.9rem;
  color: #bbbbbb;
  margin-top: 1rem;

  a {
    color: #ff4757;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(addNewUser({ username, email, password }));
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Username</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </InputContainer>
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default Signup;
