import { BrowserRouter, Route, Routes } from "react-router-dom";
import Balance from "./components/Balance";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import SendMoney from "./components/SendMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route element={<Signup />} path="/signup"  />
          <Route element={<Signin />} path="/signin" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<SendMoney />} path="/send" />
        </Routes>
      </BrowserRouter>
    </>
    
  )
}


export default App;