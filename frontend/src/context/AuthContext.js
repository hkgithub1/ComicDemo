import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  let [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? JSON.parse(localStorage.getItem("accessToken"))
      : null
  );
  let [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("accessToken")
      ? jwt_decode(localStorage.getItem("accessToken"))
      : null
  );
  let [loading, setLoading] = useState(true);

  let loginUser = async (e, username, password) => {
    e.preventDefault();
    let response = await fetch("/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setUser(jwt_decode(data.access));
      localStorage.setItem("accessToken", JSON.stringify(data.access));
      localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
      navigate(-1);
    } else {
      alert("Invalid Login Info");
    }
  };

  let logoutUser = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  let updateToken = async () => {
    let response = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAccessToken(data.access);
      setUser(jwt_decode(data.access));
      localStorage.setItem("accessToken", JSON.stringify(data.access));
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (accessToken) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [accessToken, loading]);

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
