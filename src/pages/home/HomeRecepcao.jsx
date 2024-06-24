import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomeRecepcao() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
    const recepcao = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/usuarios', {
                    headers: {
                        tipoAcesso: recepcao.tipoAcesso
                    }
                });
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, [recepcao.tipoAcesso]);

    const editarUsuario = (id) => {
        navigate(`/editar-usuario/${id}`);
    };

    const ativarDesativarUsuario = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/usuarios/ativar-desativar/${id}`, null, {
                headers: {
                    tipoAcesso: recepcao.tipoAcesso
                }
            });
            const updatedUsuarios = usuarios.map(usuario => {
                if (usuario.id === id) {
                    usuario.ativo = !usuario.ativo;
                }
                return usuario;
            });
            setUsuarios(updatedUsuarios);
        } catch (error) {
            console.error('Erro ao ativar/desativar usuário:', error);
        }
    };

    const criarUsuario = () => {
        navigate('/criar-usuario');
    };

    return (
        <div className="container">
            <h1>Lista de Usuários</h1>
            <button onClick={criarUsuario}>Criar Novo Usuário</button>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.nome} {usuario.sobrenome} - {usuario.tipoAcesso === 1 ? 'Médico' : usuario.tipoAcesso === 2 ? 'Recepção' : 'Cliente'}
                        <button onClick={() => editarUsuario(usuario.id)}>Editar</button>
                        <button onClick={() => ativarDesativarUsuario(usuario.id)}>
                            {usuario.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeRecepcao;