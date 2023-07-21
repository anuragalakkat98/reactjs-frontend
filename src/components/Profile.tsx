import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { userDetailsStore } from "../store/userStore";
import {
  clearLoggedInUserFromStorage,
  setLoggedInUserInStorage,
} from "../storage";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [isupdated, setIsupdated] = useState(false);
  const userInfo = userDetailsStore.user.user || userDetailsStore.user;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: `http://localhost:3001/update/${userInfo.email}`,
      data: {
        firstname: firstname || userInfo.firstname,
        lastname: lastname || userInfo.lastname,
        address: address || userInfo.address,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      var response = await axios(configuration);
      if (response.status == 200) {
        userDetailsStore.user = response.data.result;
        setLoggedInUserInStorage(response.data.result, token);
        setIsupdated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    clearLoggedInUserFromStorage();
    navigate("/");
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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
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
                  onChange={(e) => setFirstname(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  defaultValue={userInfo.firstname}
                  key={userInfo.firstname}
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
                  onChange={(e) => setLastName(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  defaultValue={userInfo.lastname}
                  key={userInfo.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  disabled
                  InputLabelProps={{ shrink: true }}
                  defaultValue={userInfo.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={userInfo.address}
                  key={userInfo.address}
                />
              </Grid>
            </Grid>
            {isupdated && (
              <Typography style={{ color: "green" }}>User updated</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Update
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
