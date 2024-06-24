import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomeMedico from './pages/home/HomeMedico';
import HomeRecepcao from './pages/home/HomeRecepcao';
import HomeCliente from './pages/home/HomeCliente';
import FormularioAtendimento from './pages/forms/FormularioAtendimento';
import EditarUsuario from './pages/forms/EditarUsuario';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/medico-home" element={<HomeMedico />} />
      <Route path="/recepcao-home" element={<HomeRecepcao />} />
      <Route path="/cliente-home" element={<HomeCliente />} />
      <Route path="/formulario-atendimento/:pacienteId" element={<FormularioAtendimento />} />
      <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;