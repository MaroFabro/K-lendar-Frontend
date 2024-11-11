import React from 'react';
import './App.css';

const diasSemanales = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

const CalendarioGrid = ({ diasDelMes, eventos, onDayClick }) => {
  const getEventosPorDia = (dia) => {
    return eventos.filter(evento => evento.fecha.toDateString() === dia.toDateString());
  };

  // Crear las filas para el calendario, organizando los días en semanas
  const semanas = [];
  let semana = [];

  // Llenamos la primera semana con días vacíos si es necesario
  for (let i = 0; i < diasDelMes.length; i++) {
    if (diasDelMes[i]) {
      semana.push(diasDelMes[i]);
    } else {
      semana.push(null); // Los días vacíos
    }

    // Si la semana tiene 7 días, la añadimos al array de semanas
    if (semana.length === 7) {
      semanas.push(semana);
      semana = [];
    }
  }

  // Si la última semana no tiene 7 días, la agregamos igualmente (algunas celdas vacías pueden quedar)
  if (semana.length > 0) {
    semanas.push(semana);
  }

  return (
    <div className="calendario-grid">
      {/* Fila con los nombres de los días de la semana */}
      <div className="dias-semanales">
        {diasSemanales.map((dia, index) => (
          <div key={index} className="dia-semanal">{dia}</div>
        ))}
      </div>

      {/* Fila con los días del mes */}
      <div className="calendario-dias">
        {semanas.map((semana, index) => (
          <div key={index} className="fila-semana">
            {semana.map((dia, index) => (
              <div
                key={index}
                className={`dia ${dia ? '' : 'dia-vacio'}
                  ${dia && getEventosPorDia(dia).length ? 'tiene-evento' : ''}`}
                onClick={() => dia && onDayClick(dia)}
              >
                {dia ? dia.getDate() : ''}
                {dia && getEventosPorDia(dia).length > 0 && (
                  <span className="indicador-evento">+</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarioGrid;



