import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomeMedico from './pages/home/HomeMedico';
import HomeRecepcao from './pages/home/HomeRecepcao';
import HomeCliente from './pages/home/HomeCliente';
import FormularioAtendimento from './pages/forms/FormularioAtendimento';
import EditarUsuario from './pages/forms/EditarUsuario';
import CriarUsuario from './pages/forms/CriarUsuario';
import AcessoNegado from './pages/redirect/AcessoNegado';
import './App.css';

function App() {
  const ProtectedRoute = ({ children, allowedTypes }) => {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario || !allowedTypes.includes(usuario.tipoAcesso)) {
          return <Navigate to="/acesso-negado" />;
      }
      return children;
  };

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route
                  path="/medico-home"
                  element={
                      <ProtectedRoute allowedTypes={[1]}>
                          <HomeMedico />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/recepcao-home"
                  element={
                      <ProtectedRoute allowedTypes={[2]}>
                          <HomeRecepcao />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/cliente-home"
                  element={
                      <ProtectedRoute allowedTypes={[3]}>
                          <HomeCliente />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/formulario-atendimento/:pacienteId"
                  element={
                      <ProtectedRoute allowedTypes={[1]}>
                          <FormularioAtendimento />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/editar-usuario/:id"
                  element={
                      <ProtectedRoute allowedTypes={[2]}>
                          <EditarUsuario />
                      </ProtectedRoute>
                  }
              />
              <Route
                    path="/criar-usuario"
                    element={
                        <ProtectedRoute allowedTypes={[2]}>
                            <CriarUsuario />
                        </ProtectedRoute>
                    }
                />
              <Route path="/acesso-negado" element={<AcessoNegado />} />
          </Routes>
      </Router>
  );
}

export default App;


// function App() {
//     const ProtectedRoute = ({ children, allowedTypes }) => {
//         const usuario = JSON.parse(localStorage.getItem('usuario'));
//         if (!usuario || !allowedTypes.includes(usuario.tipoAcesso)) {
//             return <Navigate to="/acesso-negado" />;
//         }
//         return children;
//     };

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route
//                     path="/medico-home"
//                     element={
//                         <ProtectedRoute allowedTypes={[1]}>
//                             <HomeMedico />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/recepcao-home"
//                     element={
//                         <ProtectedRoute allowedTypes={[2]}>
//                             <HomeRecepcao />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/cliente-home"
//                     element={
//                         <ProtectedRoute allowedTypes={[3]}>
//                             <HomeCliente />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/formulario-atendimento/:pacienteId"
//                     element={
//                         <ProtectedRoute allowedTypes={[1]}>
//                             <FormularioAtendimento />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/editar-usuario/:id"
//                     element={
//                         <ProtectedRoute allowedTypes={[2]}>
//                             <EditarUsuario />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route path="/acesso-negado" element={<AcessoNegado />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import Login from './pages/Login';
// import HomeMedico from './pages/home/HomeMedico';
// import HomeRecepcao from './pages/home/HomeRecepcao';
// import HomeCliente from './pages/home/HomeCliente';
// import FormularioAtendimento from './pages/forms/FormularioAtendimento';
// import EditarUsuario from './pages/forms/EditarUsuario';
// import './App.css';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/medico-home" element={<HomeMedico />} />
//       <Route path="/recepcao-home" element={<HomeRecepcao />} />
//       <Route path="/cliente-home" element={<HomeCliente />} />
//       <Route path="/formulario-atendimento/:pacienteId" element={<FormularioAtendimento />} />
//       <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;