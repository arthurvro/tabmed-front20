import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', { cpf, senha });
            const usuario = response.data;
            // Redirecionar com base no tipoAcesso
            if (usuario.tipoAcesso === 1) {
                navigate('/medico-home');
            } else if (usuario.tipoAcesso === 2) {
                navigate('/recepcao-home');
            } else if (usuario.tipoAcesso === 3) {
                navigate('/cliente-home');
            }
        } catch (error) {
            alert('Login falhou');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;