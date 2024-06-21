import React, { useState } from 'react';
import axios from 'axios';

function HomeMedico() {
    const [dados, setDados] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/formularios/cadastro', { dados, medico: { id: 1 } }); // Substituir ID do médico
            alert('Formulário cadastrado com sucesso');
        } catch (error) {
            alert('Erro ao cadastrar formulário');
        }
    };

    return (
        <div>
            <h1>Home Médico</h1>
            <textarea placeholder="Dados do formulário" value={dados} onChange={(e) => setDados(e.target.value)} />
            <button onClick={handleSubmit}>Cadastrar Formulário</button>
        </div>
    );
}

export default HomeMedico;