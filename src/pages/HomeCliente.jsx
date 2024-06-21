import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeCliente() {
    const [formularios, setFormularios] = useState([]);

    useEffect(() => {
        const fetchFormularios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/formularios/medico/1'); // Substituir ID do médico
                setFormularios(response.data);
            } catch (error) {
                alert('Erro ao buscar formulários');
            }
        };
        fetchFormularios();
    }, []);

    return (
        <div>
            <h1>Home Cliente</h1>
            <ul>
                {formularios.map((formulario) => (
                    <li key={formulario.id}>{formulario.dados}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomeCliente;