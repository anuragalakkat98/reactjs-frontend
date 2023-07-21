import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { signupValidationSchema } from "../validator";

const defaultTheme = createTheme();

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [register, setRegister] = useState(false);
  const [firstnameError, setfirstnameError] = useState("");
  const [lastnameError, setlastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "http://localhost:3001/register",
      data: {
        firstname,
        lastname,
        email,
        password,
        address,
      },
    };

    try {
      await signupValidationSchema.validate(
        { firstname, lastname, email, password },
        { abortEarly: false }
      );
      await axios(configuration);
      setRegister(true);
      navigate("/");
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError: any) => {
          if (validationError.path === "firstname") {
            setfirstnameError(validationError.message);
          } else if (validationError.path === "lastname") {
            setlastnameError(validationError.message);
          } else if (validationError.path === "email") {
            setEmailError(validationError.message);
          } else if (validationError.path === "password") {
            setPasswordError(validationError.message);
          }
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                    setfirstnameError("");
                  }}
                  error={!!firstnameError}
                  helperText={firstnameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                    setlastnameError("");
                  }}
                  error={!!lastnameError}
                  helperText={lastnameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/"}>Already have an account? Signin</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
