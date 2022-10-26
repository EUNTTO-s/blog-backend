import axios from "axios";

const axios_ = axios.create({
  baseURL : "http://localhost:5000/"
});

const login = async (email, password) => {
  const response = await axios_.post("/login", {
                    email,
                    password,
      });
  console.log("response: ", response);
  if (response.data.token) {
    console.log("saved in localStorage");
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const register = async (email, password, nickname) => {
  const response = await axios_.post("/user", {
                    email,
                    password,
                    nickname
      });
  console.log("response: ", response);
  if (response.data.token) {
    console.log("saved in localStorage");
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const AuthService = {
  login,
  register
};

export default AuthService;