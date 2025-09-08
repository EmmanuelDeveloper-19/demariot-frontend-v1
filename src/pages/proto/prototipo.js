import React, { useState } from "react";
import { Battery, Wifi, MapPin, Power, RefreshCw, Trash2, Download, Activity, AlertCircle } from "lucide-react";

const Modal = ({ isOpen, title, message, onCancel, onConfirm }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1f2937'
        }}>{title}</h3>
        <div style={{ marginBottom: '24px' }}>{message}</div>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Cancelar
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Prototype = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [sampleData, setSampleData] = useState('');

  const prototype = {
    id_prototype: "PROTO-001",
    created_at: "2025-05-01T14:23:00Z",
    status: "Activo",
    battery: 78,
    location: {
      type: "Point",
      coordinates: [-99.1332, 19.4326]
    },
    network: {
      signal_strength: 85,
      last_connection: "2025-07-14T09:15:00Z"
    },
    activity_log: [
      { time: "2025-07-14 09:15", event: "Conexión exitosa", type: "success" },
      { time: "2025-07-14 08:45", event: "Muestra recolectada", type: "info" },
      { time: "2025-07-14 07:30", event: "Firmware actualizado", type: "info" },
      { time: "2025-07-13 22:00", event: "Batería baja - 20%", type: "warning" },
      { time: "2025-07-13 18:15", event: "Datos enviados", type: "success" }
    ]
  };

  const sensorData = [
    { id: 1, name: "Sensor pH", value: "7.2", date: "2025-07-14 09:10", coordinates: "19.4326, -99.1332" },
    { id: 2, name: "Sensor Turbidez", value: "15 NTU", date: "2025-07-14 09:10", coordinates: "19.4326, -99.1332" },
    { id: 3, name: "Sensor Oxígeno", value: "8.5 mg/L", date: "2025-07-14 09:10", coordinates: "19.4326, -99.1332" },
    { id: 4, name: "Sensor Temperatura", value: "22.3°C", date: "2025-07-14 09:10", coordinates: "19.4326, -99.1332" },
    { id: 5, name: "Sensor Conductividad", value: "450 µS/cm", date: "2025-07-14 09:10", coordinates: "19.4326, -99.1332" }
  ];

  const getBatteryColor = (level) => {
    if (level > 75) return '#059669';
    if (level > 40) return '#d97706';
    return '#dc2626';
  };

  const getSignalColor = (strength) => {
    if (strength > 70) return '#059669';
    if (strength > 40) return '#d97706';
    return '#dc2626';
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'success': return '#059669';
      case 'warning': return '#d97706';
      case 'error': return '#dc2626';
      default: return '#2563eb';
    }
  };

  const handleMuestra = () => {
    setModalType('sample');
    setShowModal(true);
  };

  const handleAction = (action) => {
    setModalType(action);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (modalType === 'sample') {
      console.log('Muestra recolectada:', sampleData);
    }
    setShowModal(false);
    setSampleData('');
  };

  const getModalContent = () => {
    switch(modalType) {
      case 'sample':
        return {
          title: "Recoger Muestra",
          message: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: '#374151' }}>Configuración de análisis de muestra:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Color detectado (RGBA):
                  </label>
                  <input
                    type="text"
                    value={sampleData}
                    onChange={(e) => setSampleData(e.target.value)}
                    placeholder="rgba(255, 0, 0, 0.8)"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  <p>Ubicación: {prototype.location.coordinates[1]}, {prototype.location.coordinates[0]}</p>
                  <p>Fecha: {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        };
      case 'power':
        return {
          title: "Reiniciar Prototipo",
          message: "¿Está seguro que desea reiniciar el prototipo? Esta acción puede tomar varios minutos."
        };
      case 'update':
        return {
          title: "Actualizar Firmware",
          message: "¿Desea actualizar el firmware del prototipo a la versión más reciente?"
        };
      case 'delete':
        return {
          title: "Eliminar Prototipo",
          message: "⚠️ Esta acción es irreversible. ¿Está seguro que desea eliminar este prototipo?"
        };
      default:
        return { title: "", message: "" };
    }
  };

  return (
    <div className="container"style={{
      minHeight: '100vh',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 className="text-primary text-bold" style={{
            fontSize: '30px',
            marginBottom: '8px'
          }}>Gestión del Prototipo IoT</h1>
          <p className="text-primary ">Monitoreo y control en tiempo real</p>
        </div>

        {/* Status Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>Estado</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#059669'
                }}>{prototype.status}</p>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%'
              }}>
                <Activity size={24} color="#059669" />
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>Batería</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: getBatteryColor(prototype.battery)
                }}>
                  {prototype.battery}%
                </p>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%'
              }}>
                <Battery size={24} color="#2563eb" />
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>Señal</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: getSignalColor(prototype.network.signal_strength)
                }}>
                  {prototype.network.signal_strength}%
                </p>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#ede9fe',
                borderRadius: '50%'
              }}>
                <Wifi size={24} color="#7c3aed" />
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>Ubicación</p>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111827'
                }}>
                  {prototype.location.coordinates[1].toFixed(4)}°
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {prototype.location.coordinates[0].toFixed(4)}°
                </p>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#fed7aa',
                borderRadius: '50%'
              }}>
                <MapPin size={24} color="#ea580c" />
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Control Panel */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px'
            }}>Panel de Control</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px'
              }}>
                <div>
                  <p style={{
                    fontWeight: '500',
                    color: '#111827'
                  }}>ID del Prototipo</p>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>{prototype.id_prototype}</p>
                </div>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Activo
                </span>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '12px'
              }}>
                <button
                  onClick={handleMuestra}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  <Download size={20} style={{ marginRight: '8px' }} />
                  Recoger Muestra
                </button>
                
                <button
                  onClick={() => handleAction('power')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#059669'}
                >
                  <Power size={20} style={{ marginRight: '8px' }} />
                  Reiniciar Prototipo
                </button>
                
                <button
                  onClick={() => handleAction('update')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    backgroundColor: '#d97706',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#b45309'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#d97706'}
                >
                  <RefreshCw size={20} style={{ marginRight: '8px' }} />
                  Actualizar Firmware
                </button>
                
                <button
                  onClick={() => handleAction('delete')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                >
                  <Trash2 size={20} style={{ marginRight: '8px' }} />
                  Eliminar Prototipo
                </button>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px'
            }}>Actividad Reciente</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {prototype.activity_log.map((log, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: log.type === 'success' ? '#dcfce7' : 
                                   log.type === 'warning' ? '#fef3c7' : 
                                   log.type === 'error' ? '#fee2e2' : '#dbeafe'
                  }}>
                    <AlertCircle size={16} color={getEventTypeColor(log.type)} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#111827'
                    }}>{log.event}</p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sensor Data Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827'
            }}>Datos de Sensores</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{
                    padding: '12px 24px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    #
                  </th>
                  <th style={{
                    padding: '12px 24px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Sensor
                  </th>
                  <th style={{
                    padding: '12px 24px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Valor
                  </th>
                  <th style={{
                    padding: '12px 24px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Fecha
                  </th>
                  <th style={{
                    padding: '12px 24px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Coordenadas
                  </th>
                </tr>
              </thead>
              <tbody>
                {sensorData.map((sensor, index) => (
                  <tr key={sensor.id} style={{
                    backgroundColor: 'white',
                    borderTop: index > 0 ? '1px solid #e5e7eb' : 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#111827'
                    }}>
                      {sensor.id}
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      color: '#111827'
                    }}>
                      {sensor.name}
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      color: '#111827',
                      fontWeight: '500'
                    }}>
                      {sensor.value}
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      {sensor.date}
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      {sensor.coordinates}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title={getModalContent().title}
        message={getModalContent().message}
        onCancel={() => setShowModal(false)}
        onConfirm={modalType === 'sample' ? handleConfirmAction : undefined}
      />
    </div>
  );
}