/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserError, getUserStatus } from "../user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import musicImage from "./music.jpg";

const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  background: "#1B2A34",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const ImageContainer = styled("div")({
  flex: 1,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width: 768px)": {
    height: "50%",
  },
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const FormContainer = styled("div")({
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#1B2A34",
  padding: "1rem",
  "@media (max-width: 768px)": {
    height: "50%",
  },
});

const H2 = styled("h2")({
  color: "lightgray",
  fontSize: "2rem",
  "@media (max-width: 480px)": {
    fontSize: "1.5rem",
  },
});

const Input = styled("input")({
  marginBottom: "1rem",
  padding: "0.75rem",
  fontSize: "1rem",
  width: "100%",
  maxWidth: "400px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  "&:focus": {
    borderColor: "#007BFF",
    outline: "none",
  },
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
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
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
  },
});

const ErrorMessage = styled("p")({
  color: "red",
  fontSize: "1rem",
  marginBottom: "1rem",
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
  },
});

const P = styled("p")({
  color: "lightgray",
  textAlign: "center",
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(getUserError);
  const status = useSelector(getUserStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/musiclist");
      sessionStorage.setItem("userEmail", email);
    }
  }, [status, navigate, email]);

  return (
    <Container>
      <ImageContainer>
        <StyledImage src={musicImage} alt="Music" />
      </ImageContainer>
      <FormContainer>
        <H2>Login</H2>
        {status === "failed" && error && <ErrorMessage>{error}</ErrorMessage>}
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
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </form>
        <P>
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            style={{
              color: "lightgray",
              background: "#525B44",
              textDecoration: "none",
              border: "1px solid white",
              borderRadius: "3px",
              padding: "5px",
            }}
          >
            Sign Up
          </Link>
        </P>
      </FormContainer>
    </Container>
  );
};

export default Login;
