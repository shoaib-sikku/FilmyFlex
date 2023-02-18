import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import { createContext, useState } from "react";

const Appstate = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <>
      <Appstate.Provider value={{ login, setLogin, username, setUsername }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addmovie" element={<AddMovie />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<h1>unvalid page</h1>} />
          </Routes>
        </BrowserRouter>
      </Appstate.Provider>
    </>
  );
}

export default App;
export { Appstate };
