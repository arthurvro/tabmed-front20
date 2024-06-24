import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeCliente() {
    const [atendimentos, setAtendimentos] = useState([]);
    const paciente = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const fetchAtendimentos = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/atendimentos/paciente/${paciente.id}`);
                setAtendimentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar atendimentos:', error);
            }
        };

        fetchAtendimentos();
    }, [paciente.id]);

    return (
        <div className="container">
            <h1>Atendimentos</h1>
            {atendimentos.length > 0 ? (
                atendimentos.map(atendimento => (
                    <div key={atendimento.id}>
                        <h2>Atendimento #{atendimento.id}</h2>
                        <p><strong>Médico:</strong> {atendimento.medico.nome} {atendimento.medico.sobrenome}</p>
                        <p><strong>Histórico do Paciente:</strong> {atendimento.historicoPaciente}</p>
                        <p><strong>Queixas do Paciente:</strong> {atendimento.queixasPaciente}</p>
                        <p><strong>Laudo Médico:</strong> {atendimento.laudoMedico}</p>
                        <p><strong>Receita Médica:</strong> {atendimento.receitaMedica}</p>
                    </div>
                ))
            ) : (
                <p>Nenhum atendimento encontrado.</p>
            )}
        </div>
    );
}

export default HomeCliente;
