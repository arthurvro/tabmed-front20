import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomeMedico from './pages/HomeMedico';
import HomeRecepcao from './pages/HomeCliente';
import HomeCliente from './pages/HomeRecepcao';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/medico-home" element={<HomeMedico />} />
//                 <Route path="/recepcao-home" element={<HomeRecepcao />} />
//                 <Route path="/cliente-home" element={<HomeCliente />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/medico-home" element={<HomeMedico />} />
            <Route path="/recepcao-home" element={<HomeRecepcao />} />
            <Route path="/cliente-home" element={<HomeCliente />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;