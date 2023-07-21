import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Profile from "./components/Profile";
import { ProtectedRoute } from "./protectedRoute";
import { getLoggedInUserDetails } from "./store/userStore";
import { authStore } from "./store/authStore";

function App() {
  const response = getLoggedInUserDetails();
  if (response) {
    authStore.isLoggedIn = true;
  } else {
    authStore.isLoggedIn = false;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
