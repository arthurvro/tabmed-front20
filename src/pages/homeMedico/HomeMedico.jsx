import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PacienteCard from '../../components/PacienteCard';
import ModalComponent from '../../components/ModalComponent';
import './HomeMedico.css';

function HomeMedico() {
    const [pacientes, setPacientes] = useState([]);
    const [atendimentos, setAtendimentos] = useState({});
    const [mostrarAtendimentos, setMostrarAtendimentos] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const medico = JSON.parse(localStorage.getItem('usuario'));
    const navigate = useNavigate();

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
            const response = await axios.get(`http://localhost:8080/api/atendimentos/paciente/${pacienteId}`, {
                headers: {
                    tipoAcesso: medico.tipoAcesso
                }
            });
            setAtendimentos(prev => ({ ...prev, [pacienteId]: response.data }));
            setMostrarAtendimentos(pacienteId);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Erro ao buscar atendimentos:', error);
        }
    };

    return (
        <div className="container">
            <h1>Pacientes</h1>
            <ul className="paciente-list">
                {pacientes.map(paciente => (
                    <li key={paciente.id}>
                        <PacienteCard
                            paciente={paciente}
                            onIniciarAtendimento={iniciarAtendimento}
                            onListarAtendimentos={listarAtendimentos}
                        />
                    </li>
                ))}
            </ul>

            <ModalComponent 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Atendimentos Realizados"
            >
                {mostrarAtendimentos !== null && atendimentos[mostrarAtendimentos] ? (
                    <div className="atendimentos">
                        <h2>Atendimentos Realizados</h2>
                        {atendimentos[mostrarAtendimentos].length > 0 ? (
                            atendimentos[mostrarAtendimentos].map(atendimento => (
                                <div key={atendimento.id} className="atendimento-item">
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
                ) : (
                    <p>Carregando...</p>
                )}
            </ModalComponent>
        </div>
    );
}

export default HomeMedico;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PacienteCard from '../../components/PacienteCard';
// import './HomeMedico.css';

// function HomeMedico() {
//     const [pacientes, setPacientes] = useState([]);
//     const [atendimentos, setAtendimentos] = useState({});
//     const [mostrarAtendimentos, setMostrarAtendimentos] = useState(null);
//     const medico = JSON.parse(localStorage.getItem('usuario'));
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPacientes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/usuarios', {
//                     headers: {
//                         tipoAcesso: medico.tipoAcesso
//                     }
//                 });
//                 const pacientes = response.data.filter(usuario => usuario.tipoAcesso === 3);
//                 setPacientes(pacientes);
//             } catch (error) {
//                 console.error('Erro ao buscar pacientes:', error);
//             }
//         };

//         fetchPacientes();
//     }, [medico.tipoAcesso]);

//     const iniciarAtendimento = (pacienteId) => {
//         navigate(`/formulario-atendimento/${pacienteId}`);
//     };

//     const listarAtendimentos = async (pacienteId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/atendimentos/paciente/${pacienteId}`, {
//                 headers: {
//                     tipoAcesso: medico.tipoAcesso
//                 }
//             });
//             setAtendimentos(prev => ({ ...prev, [pacienteId]: response.data }));
//             setMostrarAtendimentos(pacienteId);
//         } catch (error) {
//             console.error('Erro ao buscar atendimentos:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <h1>Pacientes</h1>
//             <ul className="paciente-list">
//                 {pacientes.map(paciente => (
//                     <li key={paciente.id}>
//                         <PacienteCard
//                             paciente={paciente}
//                             onIniciarAtendimento={iniciarAtendimento}
//                             onListarAtendimentos={listarAtendimentos}
//                         />
//                         {mostrarAtendimentos === paciente.id && atendimentos[paciente.id] && (
//                             <div className="atendimentos">
//                                 <h2>Atendimentos Realizados</h2>
//                                 {atendimentos[paciente.id].length > 0 ? (
//                                     atendimentos[paciente.id].map(atendimento => (
//                                         <div key={atendimento.id} className="atendimento-item">
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
