import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarUsuario() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        senha: '',
        tipoAcesso: 3,
        ativo: true
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUsuario();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/api/usuarios/${id}`, usuario);
            navigate('/recepcao-home');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    return (
        <div className="container">
            <h1>Editar Usuário</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" value={usuario.nome} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Sobrenome:</label>
                    <input type="text" name="sobrenome" value={usuario.sobrenome} onChange={handleInputChange} />
                </div>
                <div>
                    <label>CPF:</label>
                    <input type="text" name="cpf" value={usuario.cpf} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" value={usuario.senha} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Tipo de Acesso:</label>
                    <select name="tipoAcesso" value={usuario.tipoAcesso} onChange={handleInputChange}>
                        <option value={1}>Médico</option>
                        <option value={2}>Recepção</option>
                        <option value={3}>Paciente</option>
                    </select>
                </div>
                <div>
                    <label>Ativo:</label>
                    <input type="checkbox" name="ativo" checked={usuario.ativo} onChange={() => setUsuario({ ...usuario, ativo: !usuario.ativo })} />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default EditarUsuario;
