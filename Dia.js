import React from 'react';
import './App.css';

const Dia = ({ dia, esHoy, esEspecial, eventos, onClick }) => {
    return (
        <div
            className={`dia ${esHoy ? 'hoy' : ''} ${esEspecial ? 'dia-especial' : ''}`}
            onClick={onClick}
        >
            <span className="numero-dia">{dia}</span>
            {esEspecial && <span className="etiqueta-especial">{esEspecial}</span>}
            {eventos && eventos.length > 0 && (
                <div className="eventos">
                    {eventos.map((evento, index) => (
                        <div key={index} className="item-evento">{evento.nombre}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dia;
