import React, { useState } from 'react';
import CalendarioHeader from './CalendarioHeader';
import CalendarioGrid from './CalendarioGrid';
import ModalEventos from './ModalEventos';
import './App.css';

const Calendario = () => {
    const hoy = new Date();
    const [mesActual, setMesActual] = useState(hoy.getMonth());
    const [añoActual, setAñoActual] = useState(hoy.getFullYear());
    const [eventos, setEventos] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tipoModal, setTipoModal] = useState('add');
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    // Función para obtener los días del mes, incluyendo el primer día y los días vacíos antes del primero
    const getDiasDelMes = (mes, año) => {
        const dias = [];
        const fecha = new Date(año, mes, 1);
        const primerDiaSemanal = fecha.getDay();

        // Llenar con días vacíos hasta el primer día del mes
        for (let i = 0; i < primerDiaSemanal; i++) {
            dias.push(null);
        }

        // Llenar los días del mes
        while (fecha.getMonth() === mes) {
            dias.push(new Date(fecha));
            fecha.setDate(fecha.getDate() + 1);
        }

        return dias;
    };

    // Obtener los días del mes actual
    const diasDelMes = getDiasDelMes(mesActual, añoActual);

    // Manejo del clic en un día
    const clickDia = (dia) => {
        const diaEventos = eventos.filter(evento => evento.fecha.toDateString() === dia.toDateString());
        setFechaSeleccionada(dia); // Establecer la fecha seleccionada
        if (diaEventos.length > 0) {
            setEventoSeleccionado(diaEventos[0]);
            setTipoModal('view'); // Si el día tiene un evento, solo verlo
        } else {
            setTipoModal('add'); // Si no tiene evento, agregar uno nuevo
        }
        setModalAbierto(true); // Abrir el modal
    };

    return (
        <div className="calendario-container">
            <CalendarioHeader
                mesActual={mesActual}
                añoActual={añoActual}
                setMesActual={setMesActual}
                setAñoActual={setAñoActual}
            />

            <CalendarioGrid 
                diasDelMes={diasDelMes}
                eventos={eventos}
                onDayClick={clickDia}
                mesActual={mesActual}
                añoActual={añoActual}
            />

            {modalAbierto && (
                <ModalEventos
                    tipo={tipoModal}
                    fechaSeleccionada={fechaSeleccionada}
                    eventoSeleccionado={eventoSeleccionado}
                    onSave={(evento) => {
                        // Guardar el evento, ya sea nuevo o editado
                        setEventos(prevEventos => tipoModal === 'edit' 
                            ? prevEventos.map(ev => (ev.id === evento.id ? evento : ev)) 
                            : [...prevEventos, { ...evento, id: Date.now(), fecha: fechaSeleccionada }]
                        );
                        setModalAbierto(false); // Cerrar el modal
                    }}
                    onDelete={(eventoId) => {
                        // Eliminar el evento por su id
                        setEventos(prevEventos => prevEventos.filter(evento => evento.id !== eventoId));
                        setModalAbierto(false); // Cerrar el modal
                    }}
                    cerrarModal={() => setModalAbierto(false)} // Cerrar el modal sin guardar
                />
            )}
        </div>
    );
};

export default Calendario;
