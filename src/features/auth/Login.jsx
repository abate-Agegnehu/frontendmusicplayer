/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  background:
    "linear-gradient( rgba(208, 164, 142, 0.1), rgba(197, 150, 123, 0.2), rgba(180, 137, 114, 0.1) )",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  background:
    "linear-gradient( rgba(208, 164, 142, 0.4), rgba(197, 150, 123, 0.6), rgba(180, 137, 114, 0.4) )",
});

const Input = styled("input")({
  marginBottom: "1rem",
  padding: "0.75rem",
  fontSize: "1rem",
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "4px",
  "&:focus": {
    borderColor: "#007BFF",
    outline: "none",
  },
});

const Button = styled("button")({
  padding: "0.7rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
});

const ErrorMessage = styled("p")({
  color: "red",
  fontSize: "1rem",
  marginBottom: "1rem",
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      sessionStorage.setItem("userEmail", email);
      navigate("/musiclist");
    } catch (err) {
      console.log(err);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default Login;
