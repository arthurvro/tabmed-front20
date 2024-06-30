import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [erroCpf, setErroCpf] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const navigate = useNavigate();

    // const validarCpf = (cpf) => {
    //     const regex = /^\d{11}$/;
    //     return regex.test(cpf);
    // };

    // const validarSenha = (senha) => {
    //     return senha.length >= 6;
    // };

    const handleLogin = async () => {
        setErroCpf('');
        setErroSenha('');

        // if (!validarCpf(cpf)) {
        //     setErroCpf('CPF inválido. Deve conter 11 dígitos.');
        //     return;
        // }

        // if (!validarSenha(senha)) {
        //     setErroSenha('Senha inválida. Deve conter pelo menos 6 caracteres.');
        //     return;
        // }

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', { cpf, senha });
            const usuario = response.data;
            localStorage.setItem('usuario', JSON.stringify(usuario));
            if (usuario.tipoAcesso === 1) {
                navigate('/medico-home');
            } else if (usuario.tipoAcesso === 2) {
                navigate('/recepcao-home');
            } else if (usuario.tipoAcesso === 3) {
                navigate('/cliente-home');
            }
        } catch (error) {
            alert('Este login nâo consta em nossa base de dados');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className='login-header'>Tabmed</h1>
                {erroCpf && <p className="erro">{erroCpf}</p>}
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="login-input"
                />
                
                {erroSenha && <p className="erro">{erroSenha}</p>}
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="login-input"
                />
                
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
        </div>
    );
}

export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [cpf, setCpf] = useState('');
//     const [senha, setSenha] = useState('');
//     const [erro, setErro] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/usuarios/login', { cpf, senha });
//             const usuario = response.data;
//             localStorage.setItem('usuario', JSON.stringify(usuario));
//             if (usuario.tipoAcesso === 1) {
//                 navigate('/medico-home');
//             } else if (usuario.tipoAcesso === 2) {
//                 navigate('/recepcao-home');
//             } else if (usuario.tipoAcesso === 3) {
//                 navigate('/cliente-home');
//             }
//         } catch (error) {
//             setErro(error.response.data || 'Erro ao fazer login. Tente novamente.');
//         }
//     };

//     return (
//         <div className="container">
//             <h1>Login</h1>
//             {erro && <p style={{ color: 'red' }}>{erro}</p>}
//             <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
//             <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// }

// export default Login;
