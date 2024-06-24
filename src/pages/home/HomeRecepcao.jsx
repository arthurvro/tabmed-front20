import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomeRecepcao() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const ativarDesativarUsuario = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/usuarios/ativar-desativar/${id}`);
            setUsuarios(usuarios.map(usuario => 
                usuario.id === id ? { ...usuario, ativo: !usuario.ativo } : usuario
            ));
        } catch (error) {
            console.error('Erro ao ativar/desativar usuário:', error);
        }
    };

    const editarUsuario = (id) => {
        navigate(`/editar-usuario/${id}`);
    };

    return (
        <div>
            <h1>Usuários</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.nome} {usuario.sobrenome} (ID: {usuario.id})
                        <button onClick={() => ativarDesativarUsuario(usuario.id)}>
                            {usuario.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                        <button onClick={() => editarUsuario(usuario.id)}>Editar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeRecepcao;


// import React, { useState } from 'react';
// import axios from 'axios';

// function HomeRecepcao() {
//     const [nome, setNome] = useState('');
//     const [sobrenome, setSobrenome] = useState('');
//     const [cpf, setCpf] = useState('');
//     const [senha, setSenha] = useState('');
//     const [tipoAcesso, setTipoAcesso] = useState(3);

//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/usuarios/cadastro', {
//                 nome,
//                 sobrenome,
//                 cpf,
//                 senha,
//                 tipoAcesso
//             });
//             alert('Usuário cadastrado com sucesso');
//         } catch (error) {
//             alert('Erro ao cadastrar usuário');
//         }
//     };

//     return (
//         <div>
//             <h1>Home Recepção</h1>
//             <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
//             <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
//             <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
//             <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
//             <select value={tipoAcesso} onChange={(e) => setTipoAcesso(Number(e.target.value))}>
//                 <option value={1}>Médico</option>
//                 <option value={2}>Recepção</option>
//                 <option value={3}>Cliente</option>
//             </select>
//             <button onClick={handleSubmit}>Cadastrar Usuário</button>
//         </div>
//     );
// }

// export default HomeRecepcao;