import React, { useState } from 'react';
import { CadmioTab } from './cadmioTab';
import { MercurioTab } from './mercurioTab';

export const Historial = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <>
      <h1 className='text-title text-primary'>Historial de datos</h1>
      <p className='text-base text-primary'>En esta sección se recopilan todos los datos analizados por el prototipo.</p>

      <div className="tab-buttons mt-1">
        <button onClick={() => setActiveTab('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
          Cadmio
        </button>
        <button onClick={() => setActiveTab('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
          Mercurio
        </button>
        <button onClick={() => setActiveTab('tab3')} className={activeTab === 'tab3' ? 'active' : ''}>
          Plomo
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <h3>Cadmio</h3>
            <CadmioTab/>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <h3>Datos del mercurio</h3>
            <MercurioTab/>
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <h3>Actividad reciente</h3>
            {/* Aquí va la tabla de actividad */}
          </div>
        )}
      </div>
    </>
  );
};
