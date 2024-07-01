import React from 'react';
import Botao from './Botao';
import './PacienteCard.css';

const PacienteCard = ({ paciente, onIniciarAtendimento, onListarAtendimentos }) => {
    return (
        <div className="paciente-item">
            <span className="paciente-nome">{paciente.nome} {paciente.sobrenome}</span>
            <div className="paciente-actions">
                <Botao onClick={() => onIniciarAtendimento(paciente.id)} className="btn-iniciar">Iniciar Atendimento</Botao>
                <Botao onClick={() => onListarAtendimentos(paciente.id)} className="btn-ver">Listar Atendimentos</Botao>
            </div>
        </div>
    );
};

export default PacienteCard;
