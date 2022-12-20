import axios from "axios";

const axios_ = axios.create({
  baseURL : "http://localhost:5500/"
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

const fileUpload = async (formdata) => {
  const response = await axios_.post(
    "/file-upload",
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("response: ", response);
};

const PostUpload = async (formdata) => {
  const response = await axios_.put(
    "/post-form",
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcxNDY0MjE3fQ.dMRIq1OlZBUl3Yi3nvUF4nTVjVw3auwGdG3IB-yvn0g"
      },
    }
  );
  console.log("response: ", response);
};

const AuthService = {
  login,
  register,
  fileUpload,
  PostUpload,
};

export default AuthService;