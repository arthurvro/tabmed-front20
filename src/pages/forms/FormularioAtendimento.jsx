import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function FormularioAtendimento() {
    const { pacienteId } = useParams();
    const [historico, setHistorico] = useState('');
    const [queixas, setQueixas] = useState('');
    const [laudo, setLaudo] = useState('');
    const [receita, setReceita] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const medico = JSON.parse(localStorage.getItem('usuario'));

        try {
            await axios.post('http://localhost:8080/api/atendimentos', {
                medico: { id: medico.id },
                paciente: { id: pacienteId },
                historicoPaciente: historico,
                queixasPaciente: queixas,
                laudoMedico: laudo,
                receitaMedica: receita
            });
            navigate('/medico-home');
        } catch (error) {
            console.error('Erro ao criar atendimento:', error);
        }
    };

    return (
        <div className="container">
            <h1>Formulario de Atendimento</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Histórico do Paciente:</label>
                    <textarea 
                        value={historico} 
                        onChange={(e) => setHistorico(e.target.value)} 
                        rows="5" 
                        style={{ resize: 'vertical', minHeight: '100px' }} 
                    />
                </div>
                <div>
                    <label>Queixas do Paciente:</label>
                    <textarea 
                        value={queixas} 
                        onChange={(e) => setQueixas(e.target.value)} 
                        rows="5" 
                        style={{ resize: 'vertical', minHeight: '100px' }} 
                    />
                </div>
                <div>
                    <label>Laudo Médico:</label>
                    <textarea 
                        value={laudo} 
                        onChange={(e) => setLaudo(e.target.value)} 
                        rows="5" 
                        style={{ resize: 'vertical', minHeight: '100px' }} 
                    />
                </div>
                <div>
                    <label>Receita Médica:</label>
                    <textarea 
                        value={receita} 
                        onChange={(e) => setReceita(e.target.value)} 
                        rows="5" 
                        style={{ resize: 'vertical', minHeight: '100px' }} 
                    />
                </div>
                <button type="submit">Enviar Formulário</button>
            </form>
        </div>
    );
}

export default FormularioAtendimento;