import React from 'react';
import { useNavigate } from 'react-router-dom';

function AcessoNegado() {
    const navigate = useNavigate();

    const voltarParaLogin = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Acesso Negado</h1>
            <p>Você não possui acesso a esta funcionalidade.</p>
            <button onClick={voltarParaLogin}>Voltar para Login</button>
        </div>
    );
}

export default AcessoNegado;