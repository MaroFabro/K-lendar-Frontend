import React from 'react';

const CalendarioHeader = ({ mesActual, añoActual, setMesActual, setAñoActual }) => {

    // Función para manejar el cambio de mes
    const handleMesChange = (event) => {
        setMesActual(parseInt(event.target.value));
    };

    // Función para manejar el cambio de año
    const handleAñoChange = (event) => {
        setAñoActual(parseInt(event.target.value));
    };

    return (
        <div className="calendario-header">
            <h1>K-LENDAR</h1>
            <div className="control-fecha">
                <select value={mesActual} onChange={handleMesChange}>
                    {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((mes, index) => (
                        <option key={index} value={index}>{mes}</option>
                    ))}
                </select>
                <select value={añoActual} onChange={handleAñoChange}>
                    {[2024, 2023, 2022].map((año) => (
                        <option key={año} value={año}>{año}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CalendarioHeader;
