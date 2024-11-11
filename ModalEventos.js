import React, { useState, useEffect } from 'react';
import './App.css';

const ModalEventos = ({ tipo, fechaSeleccionada, eventoSeleccionado, onSave, onDelete, cerrarModal }) => {
    const [nombreEvento, setNombreEvento] = useState('');
    const [tiempoEvento, setTiempoEvento] = useState('');
    const [adjuntoEvento, setAdjuntoEvento] = useState(null);

    // Efecto para llenar los campos cuando el modal está en modo 'edit' o 'view'
    useEffect(() => {
        if (tipo === 'edit' || tipo === 'view') {
            setNombreEvento(eventoSeleccionado.nombre);
            setTiempoEvento(eventoSeleccionado.tiempo);
            setAdjuntoEvento(eventoSeleccionado.adjunto);
        } else {
            setNombreEvento('');
            setTiempoEvento('');
            setAdjuntoEvento(null);
        }
    }, [tipo, eventoSeleccionado]);

    // Función para guardar el evento
    const handleSave = () => {
        const evento = {
            id: eventoSeleccionado?.id || Date.now(),
            nombre: nombreEvento,
            tiempo: tiempoEvento,
            adjunto: adjuntoEvento,
        };
        onSave(evento);
        cerrarModal();
    };

    return (
        <div className="modal">
            <div className="contenido-modal">
                <h2>
                    {tipo === 'view'
                        ? 'Detalles del Evento'
                        : tipo === 'edit'
                        ? 'Modificar Evento'
                        : 'Agregar Evento'}
                </h2>
                <p>Fecha: {fechaSeleccionada.toDateString()}</p>

                {(tipo === 'add' || tipo === 'edit') && (
                    <>
                        <input
                            type="text"
                            placeholder="Nombre del evento"
                            value={nombreEvento}
                            onChange={(e) => setNombreEvento(e.target.value)}
                        />
                        <input
                            type="time"
                            placeholder="Hora del Evento"
                            value={tiempoEvento}
                            onChange={(e) => setTiempoEvento(e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(e) => setAdjuntoEvento(e.target.files[0])}
                        />
                        <button onClick={handleSave}>
                            {tipo === 'edit' ? 'Modificar' : 'Guardar'}
                        </button>
                    </>
                )}

                {tipo === 'view' && (
                    <>
                        <p>Nombre: {nombreEvento}</p>
                        <p>Tiempo: {tiempoEvento}</p>
                        <p>Adjunto: {adjuntoEvento ? adjuntoEvento.name : 'No hay adjuntos'}</p>
                        <button onClick={() => onDelete(eventoSeleccionado.id)}>Eliminar</button>
                    </>
                )}

                <button onClick={cerrarModal}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalEventos;
