/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserError, getUserStatus } from "../user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import musicImage from "./music.jpg";

// const Container = styled("div")({
//   display: "flex",
//   height: "100vh",
//   width: "100%",
//   overflow: "hidden",
//   background: "#1B2A34",
//   "@media (max-width: 768px)": {
//     flexDirection: "column",
//   },
// });

// const ImageContainer = styled("div")({
//   flex: 1,
//   height: "100%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "@media (max-width: 768px)": {
//     height: "50%",
//   },
// });

// const StyledImage = styled("img")({
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
// });

// const FormContainer = styled("div")({
//   flex: 1,
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "#1B2A34",
//   padding: "1rem",
//   "@media (max-width: 768px)": {
//     height: "50%",
//   },
// });

// const H2 = styled("h2")({
//   color: "lightgray",
//   fontSize: "2rem",
//   "@media (max-width: 480px)": {
//     fontSize: "1.5rem",
//   },
// });

// const Input = styled("input")({
//   marginBottom: "1rem",
//   padding: "0.75rem",
//   fontSize: "1rem",
//   width: "100%",
//   maxWidth: "400px",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
//   "&:focus": {
//     borderColor: "#007BFF",
//     outline: "none",
//   },
//   "@media (max-width: 480px)": {
//     fontSize: "0.9rem",
//   },
// });

// const Button = styled("button")({
//   padding: "0.7rem 1.5rem",
//   fontSize: "1rem",
//   cursor: "pointer",
//   backgroundColor: "#007BFF",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
//   "&:hover": {
//     backgroundColor: "#0056b3",
//   },
//   "&:disabled": {
//     backgroundColor: "#cccccc",
//     cursor: "not-allowed",
//   },
//   "@media (max-width: 480px)": {
//     fontSize: "0.9rem",
//   },
// });

// const ErrorMessage = styled("p")({
//   color: "red",
//   fontSize: "1rem",
//   marginBottom: "1rem",
//   "@media (max-width: 480px)": {
//     fontSize: "0.9rem",
//   },
// });

// const P = styled("p")({
//   color: "lightgray",
//   textAlign: "center",
// });

const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  background: "linear-gradient(to bottom, #1B2A34, #2A3B47)",
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
  filter: "brightness(0.8)",
});

const FormContainer = styled("div")({
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(27, 42, 52, 0.95)",
  padding: "2rem",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  "@media (max-width: 768px)": {
    height: "50%",
  },
});

const H2 = styled("h2")({
  color: "#f5f5f5",
  fontSize: "2.5rem",
  marginBottom: "1.5rem",
  "@media (max-width: 480px)": {
    fontSize: "2rem",
  },
});

const Input = styled("input")({
  marginBottom: "1rem",
  padding: "1rem",
  fontSize: "1rem",
  width: "100%",
  maxWidth: "400px",
  border: "1px solid #555",
  borderRadius: "6px",
  backgroundColor: "#2B3A46",
  color: "#f5f5f5",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  "&:focus": {
    borderColor: "#00A9FF",
    outline: "none",
    boxShadow: "0 0 6px #00A9FF",
  },
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
  },
});

const LoginButton = styled("button")({
  padding: "0.9rem 2rem",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#00A9FF",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  width:"115%",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  "&:hover": {
    backgroundColor: "#008CFF",
    transform: "translateY(-2px)",
  },
  "&:disabled": {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
  },
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
  },
});


const ErrorMessage = styled("p")({
  color: "#FF4D4D",
  fontSize: "1.2rem",
  marginBottom: "1rem",
  textAlign: "center",
  "@media (max-width: 480px)": {
    fontSize: "1rem",
  },
});

const P = styled("p")({
  color: "lightgray",
  textAlign: "center",
  marginTop: "1.5rem",
  fontSize: "1rem",
  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
  },
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
          <LoginButton type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </LoginButton>
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
