import React, { useState } from 'react';
import { PhTable } from './phTable';
import { TurbityTable } from './turbityTable';
import { TempTable } from './tempTable';
import { HumidityTable } from './humidityTable';
import { ColorimetryTable } from './colorimetryTable';
import { TdsData } from '../../components/sensors/tdsData';
import { TdsTable } from './tdsTable';
import { ConductivityTable } from './conductivityTable';

export const Historial = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <>
      <h1 className='text-subtitle text-primary'>Historial de datos</h1>
      <p className='text-body text-primary'>En esta sección se recopilan todos los datos analizados por el prototipo.</p>

      <div className="tab-buttons mt-1">
        <button onClick={() => setActiveTab('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
          Ph
        </button>
        <button onClick={() => setActiveTab('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
          Turbidez
        </button>
        <button onClick={() => setActiveTab('tab3')} className={activeTab === 'tab3' ? 'active' : ''}>
          Temperatura
        </button>
        <button onClick={() => setActiveTab('tab4')} className={activeTab === 'tab4' ? 'active' : ''}>
          Total de solidos disueltos (TDS)
        </button>
        <button onClick={() => setActiveTab('tab5')} className={activeTab === 'tab5' ? 'active' : ''}>
          Conductividad (TDS)
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <PhTable />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <TurbityTable />
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <TempTable />
          </div>
        )}
        {activeTab === 'tab4' && (
          <div>
            <TdsTable />
          </div>
        )}
        {activeTab === 'tab5' && (
          <div>
            <ConductivityTable />
          </div>
        )}
      </div>
    </>
  );
};
