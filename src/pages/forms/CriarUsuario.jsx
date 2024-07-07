import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CriarUsuario.css';

function CriarUsuario() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoAcesso, setTipoAcesso] = useState(3);
    const navigate = useNavigate();
    const recepcao = JSON.parse(localStorage.getItem('usuario'));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !sobrenome || !cpf || !senha) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/usuarios', {
                nome,
                sobrenome,
                cpf,
                senha,
                tipoAcesso,
                ativo: true
            }, {
                headers: {
                    tipoAcesso: recepcao.tipoAcesso
                }
            });
            toast.success('Usuário criado com sucesso!');
            setTimeout(() => {
                navigate('/recepcao-home');
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('CPF já cadastrado.');
            } else {
                toast.error('Erro ao criar usuário');
            }
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <h1>Criar Novo Usuário</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Sobrenome:</label>
                    <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                </div>
                <div>
                    <label>CPF:</label>
                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div>
                    <label>Tipo de Acesso:</label>
                    <select value={tipoAcesso} onChange={(e) => setTipoAcesso(Number(e.target.value))} required>
                        <option value={1}>Médico</option>
                        <option value={2}>Recepção</option>
                        <option value={3}>Cliente</option>
                    </select>
                </div>
                <button type="submit">Criar Usuário</button>
            </form>
        </div>
    );
}

export default CriarUsuario;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './CriarUsuario.css';

// function CriarUsuario() {
//     const [nome, setNome] = useState('');
//     const [sobrenome, setSobrenome] = useState('');
//     const [cpf, setCpf] = useState('');
//     const [senha, setSenha] = useState('');
//     const [tipoAcesso, setTipoAcesso] = useState(3); // Default to "Cliente"
//     const navigate = useNavigate();
//     const recepcao = JSON.parse(localStorage.getItem('usuario'));

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8080/api/usuarios', {
//                 nome,
//                 sobrenome,
//                 cpf,
//                 senha,
//                 tipoAcesso,
//                 ativo: true
//             }, {
//                 headers: {
//                     tipoAcesso: recepcao.tipoAcesso
//                 }
//             });
//             toast.success('Usuário criado com sucesso!');
//             setTimeout(() => {
//                 navigate('/recepcao-home');
//             }, 3000);
//         } catch (error) {
//             toast.error('Erro ao criar usuário');
//             console.error('Erro ao criar usuário:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <ToastContainer />
//             <h1>Criar Novo Usuário</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Nome:</label>
//                     <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Sobrenome:</label>
//                     <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>CPF:</label>
//                     <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Senha:</label>
//                     <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Tipo de Acesso:</label>
//                     <select value={tipoAcesso} onChange={(e) => setTipoAcesso(Number(e.target.value))} required>
//                         <option value={1}>Médico</option>
//                         <option value={2}>Recepção</option>
//                         <option value={3}>Cliente</option>
//                     </select>
//                 </div>
//                 <button type="submit">Criar Usuário</button>
//             </form>
//         </div>
//     );
// }

// export default CriarUsuario;
