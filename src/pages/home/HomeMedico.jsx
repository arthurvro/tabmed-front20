import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomeMedico() {
    const [pacientes, setPacientes] = useState([]);
    const [atendimentos, setAtendimentos] = useState({});
    const [mostrarAtendimentos, setMostrarAtendimentos] = useState(null);
    const navigate = useNavigate();
    const medico = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/usuarios', {
                    headers: {
                        tipoAcesso: medico.tipoAcesso
                    }
                });
                const pacientes = response.data.filter(usuario => usuario.tipoAcesso === 3);
                setPacientes(pacientes);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        };

        fetchPacientes();
    }, [medico.tipoAcesso]);

    const iniciarAtendimento = (pacienteId) => {
        navigate(`/formulario-atendimento/${pacienteId}`);
    };

    const listarAtendimentos = async (pacienteId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/atendimentos/medico/${medico.id}`);
            const atendimentosPorPaciente = response.data.filter(atendimento => atendimento.paciente.id === pacienteId);
            setAtendimentos({ ...atendimentos, [pacienteId]: atendimentosPorPaciente });
            setMostrarAtendimentos(pacienteId);
        } catch (error) {
            console.error('Erro ao buscar atendimentos:', error);
        }
    };

    return (
        <div className="container">
            <h1>Pacientes</h1>
            <ul>
                {pacientes.map(paciente => (
                    <li key={paciente.id}>
                        {paciente.nome} {paciente.sobrenome} (ID: {paciente.id})
                        <button onClick={() => iniciarAtendimento(paciente.id)}>Iniciar Atendimento</button>
                        <button onClick={() => listarAtendimentos(paciente.id)}>Listar Atendimentos</button>
                        {mostrarAtendimentos === paciente.id && atendimentos[paciente.id] && (
                            <div>
                                <h2>Atendimentos Realizados</h2>
                                {atendimentos[paciente.id].length > 0 ? (
                                    atendimentos[paciente.id].map(atendimento => (
                                        <div key={atendimento.id}>
                                            <h3>Atendimento #{atendimento.id}</h3>
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
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeMedico;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function HomeMedico() {
//     const [pacientes, setPacientes] = useState([]);
//     const [atendimentos, setAtendimentos] = useState({});
//     const [mostrarAtendimentos, setMostrarAtendimentos] = useState(null);
//     const navigate = useNavigate();
//     const medico = JSON.parse(localStorage.getItem('usuario'));

//     useEffect(() => {
//         const fetchPacientes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/usuarios');
//                 const pacientes = response.data.filter(usuario => usuario.tipoAcesso === 3);
//                 setPacientes(pacientes);
//             } catch (error) {
//                 console.error('Erro ao buscar pacientes:', error);
//             }
//         };

//         fetchPacientes();
//     }, []);

//     const iniciarAtendimento = (pacienteId) => {
//         navigate(`/formulario-atendimento/${pacienteId}`);
//     };

//     const listarAtendimentos = async (pacienteId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/atendimentos/medico/${medico.id}`);
//             const atendimentosPorPaciente = response.data.filter(atendimento => atendimento.paciente.id === pacienteId);
//             setAtendimentos({ ...atendimentos, [pacienteId]: atendimentosPorPaciente });
//             setMostrarAtendimentos(pacienteId);
//         } catch (error) {
//             console.error('Erro ao buscar atendimentos:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <h1>Pacientes</h1>
//             <ul>
//                 {pacientes.map(paciente => (
//                     <li key={paciente.id}>
//                         {paciente.nome} {paciente.sobrenome} (ID: {paciente.id})
//                         <button onClick={() => iniciarAtendimento(paciente.id)}>Iniciar Atendimento</button>
//                         <button onClick={() => listarAtendimentos(paciente.id)}>Listar Atendimentos</button>
//                         {mostrarAtendimentos === paciente.id && atendimentos[paciente.id] && (
//                             <div>
//                                 <h2>Atendimentos Realizados</h2>
//                                 {atendimentos[paciente.id].length > 0 ? (
//                                     atendimentos[paciente.id].map(atendimento => (
//                                         <div key={atendimento.id}>
//                                             <h3>Atendimento #{atendimento.id}</h3>
//                                             <p><strong>Histórico do Paciente:</strong> {atendimento.historicoPaciente}</p>
//                                             <p><strong>Queixas do Paciente:</strong> {atendimento.queixasPaciente}</p>
//                                             <p><strong>Laudo Médico:</strong> {atendimento.laudoMedico}</p>
//                                             <p><strong>Receita Médica:</strong> {atendimento.receitaMedica}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>Nenhum atendimento encontrado.</p>
//                                 )}
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default HomeMedico;