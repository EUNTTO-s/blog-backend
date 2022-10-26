import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navber from './components/Navbar'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <div className="header-title">테스트 센터</div>
        <Navber/>
      </header>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
