import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function LoginComponent() {

  const { login } = useAuth(); // Destructure login from useAuth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(email, password);
      history("/admin");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === 'auth/user-not-found') {
        alert("No account found with the provided email. Please check the email address or register for a new account.");
      } else {
        alert("Login Failed: " + error.message);
      }
    }
  };

  return (
    <div className="w-full h-[92svh] flex items-center justify-center bg-green-300 px-2 rounded-md">
      <div className="py-4 bg-white">
        <div className="container mx-auto px-4 h-full flex flex-col text-center gap-6">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border-1 border border-mGreen rounded-sm px-2 text-center"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border-1 border border-mGreen rounded-sm px-2 text-center"
            />
          </div>

          <button className="bg-mGreen text-white rounded-sm drop-shadow-2xl" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
