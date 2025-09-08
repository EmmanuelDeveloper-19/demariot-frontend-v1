import React, { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Info, Clock, Filter, Search, Eye, Archive, Trash2 } from "lucide-react";

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
        maxWidth: '500px',
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
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const HistorialAlertas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [modalType, setModalType] = useState('');

  const alertas = [
    {
      id: 1,
      tipo: 'critical',
      titulo: 'Batería crítica',
      descripcion: 'El prototipo PROTO-001 tiene un nivel de batería crítico (5%)',
      fecha: '2025-07-14 10:30:00',
      prototipo: 'PROTO-001',
      estado: 'active',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Sistema de energía reporta voltaje por debajo del umbral crítico. Reemplazar batería inmediatamente.',
      accionesTomadas: 'Notificación enviada al equipo técnico'
    },
    {
      id: 2,
      tipo: 'warning',
      titulo: 'Señal débil',
      descripcion: 'Intensidad de señal por debajo del 40% en PROTO-001',
      fecha: '2025-07-14 09:45:00',
      prototipo: 'PROTO-001',
      estado: 'resolved',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Conectividad intermitente detectada. Posible interferencia electromagnética.',
      accionesTomadas: 'Antena reorientada, señal restablecida'
    },
    {
      id: 3,
      tipo: 'info',
      titulo: 'Actualización completada',
      descripcion: 'Firmware actualizado exitosamente a versión 2.1.3',
      fecha: '2025-07-14 08:00:00',
      prototipo: 'PROTO-001',
      estado: 'resolved',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Actualización de firmware incluye mejoras de estabilidad y nuevas funcionalidades.',
      accionesTomadas: 'Sistema reiniciado y verificado'
    },
    {
      id: 4,
      tipo: 'warning',
      titulo: 'Temperatura alta',
      descripcion: 'Sensor de temperatura reporta 35°C - Por encima del rango normal',
      fecha: '2025-07-13 16:20:00',
      prototipo: 'PROTO-001',
      estado: 'resolved',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Temperatura ambiente elevada detectada por sensores internos.',
      accionesTomadas: 'Ventilación mejorada, temperatura normalizada'
    },
    {
      id: 5,
      tipo: 'error',
      titulo: 'Fallo de comunicación',
      descripcion: 'Pérdida de conexión con servidor durante 45 minutos',
      fecha: '2025-07-13 14:15:00',
      prototipo: 'PROTO-001',
      estado: 'resolved',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Interrupción en la comunicación con el servidor central. Datos almacenados localmente.',
      accionesTomadas: 'Conexión restablecida, datos sincronizados'
    },
    {
      id: 6,
      tipo: 'critical',
      titulo: 'Sensor pH dañado',
      descripcion: 'Sensor de pH no responde - Posible daño físico',
      fecha: '2025-07-12 11:30:00',
      prototipo: 'PROTO-001',
      estado: 'active',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Sensor de pH no envía datos. Inspección física requerida.',
      accionesTomadas: 'Programada revisión técnica'
    },
    {
      id: 7,
      tipo: 'info',
      titulo: 'Mantenimiento programado',
      descripcion: 'Mantenimiento preventivo completado exitosamente',
      fecha: '2025-07-11 09:00:00',
      prototipo: 'PROTO-001',
      estado: 'resolved',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Mantenimiento rutinario incluye limpieza de sensores y calibración.',
      accionesTomadas: 'Todos los sistemas verificados y calibrados'
    },
    {
      id: 8,
      tipo: 'warning',
      titulo: 'Humedad alta',
      descripcion: 'Nivel de humedad interno del 85% - Revisar sellado',
      fecha: '2025-07-10 18:45:00',
      prototipo: 'PROTO-001',
      estado: 'resolved',
      ubicacion: '19.4326, -99.1332',
      detalles: 'Humedad interna elevada puede afectar componentes electrónicos.',
      accionesTomadas: 'Sellado reforzado, humedad controlada'
    }
  ];

  const getAlertIcon = (tipo) => {
    switch(tipo) {
      case 'critical': return <AlertTriangle size={20} color="#dc2626" />;
      case 'warning': return <AlertTriangle size={20} color="#d97706" />;
      case 'error': return <XCircle size={20} color="#dc2626" />;
      case 'info': return <Info size={20} color="#2563eb" />;
      default: return <Info size={20} color="#6b7280" />;
    }
  };

  const getAlertColor = (tipo) => {
    switch(tipo) {
      case 'critical': return '#dc2626';
      case 'warning': return '#d97706';
      case 'error': return '#dc2626';
      case 'info': return '#2563eb';
      default: return '#6b7280';
    }
  };

  const getAlertBgColor = (tipo) => {
    switch(tipo) {
      case 'critical': return '#fee2e2';
      case 'warning': return '#fef3c7';
      case 'error': return '#fee2e2';
      case 'info': return '#dbeafe';
      default: return '#f3f4f6';
    }
  };

  const getStatusColor = (estado) => {
    return estado === 'active' ? '#dc2626' : '#059669';
  };

  const getStatusBgColor = (estado) => {
    return estado === 'active' ? '#fee2e2' : '#dcfce7';
  };

  const filteredAlertas = alertas.filter(alerta => {
    const matchesSearch = alerta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alerta.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alerta.prototipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || alerta.tipo === filterType;
    return matchesSearch && matchesFilter;
  });

  const alertStats = {
    total: alertas.length,
    critical: alertas.filter(a => a.tipo === 'critical').length,
    warning: alertas.filter(a => a.tipo === 'warning').length,
    active: alertas.filter(a => a.estado === 'active').length,
    resolved: alertas.filter(a => a.estado === 'resolved').length
  };

  const handleViewAlert = (alerta) => {
    setSelectedAlert(alerta);
    setModalType('view');
    setShowModal(true);
  };

  const handleDeleteAlert = (alerta) => {
    setSelectedAlert(alerta);
    setModalType('delete');
    setShowModal(true);
  };

  const handleArchiveAlert = (alerta) => {
    setSelectedAlert(alerta);
    setModalType('archive');
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (modalType === 'delete') {
      console.log('Eliminando alerta:', selectedAlert.id);
    } else if (modalType === 'archive') {
      console.log('Archivando alerta:', selectedAlert.id);
    }
    setShowModal(false);
    setSelectedAlert(null);
  };

  const getModalContent = () => {
    if (!selectedAlert) return { title: "", message: "" };

    switch(modalType) {
      case 'view':
        return {
          title: selectedAlert.titulo,
          message: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                {getAlertIcon(selectedAlert.tipo)}
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: getAlertBgColor(selectedAlert.tipo),
                  color: getAlertColor(selectedAlert.tipo),
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {selectedAlert.tipo}
                </span>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: getStatusBgColor(selectedAlert.estado),
                  color: getStatusColor(selectedAlert.estado),
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {selectedAlert.estado === 'active' ? 'Activa' : 'Resuelta'}
                </span>
              </div>
              
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px' }}>Descripción:</p>
                <p style={{ color: '#374151' }}>{selectedAlert.descripcion}</p>
              </div>
              
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px' }}>Detalles:</p>
                <p style={{ color: '#374151' }}>{selectedAlert.detalles}</p>
              </div>
              
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px' }}>Acciones tomadas:</p>
                <p style={{ color: '#374151' }}>{selectedAlert.accionesTomadas}</p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginTop: '16px',
                fontSize: '14px'
              }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#6b7280' }}>Prototipo:</p>
                  <p>{selectedAlert.prototipo}</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#6b7280' }}>Fecha:</p>
                  <p>{new Date(selectedAlert.fecha).toLocaleString()}</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <p style={{ fontWeight: '600', color: '#6b7280' }}>Ubicación:</p>
                  <p>{selectedAlert.ubicacion}</p>
                </div>
              </div>
            </div>
          )
        };
      case 'delete':
        return {
          title: "Eliminar Alerta",
          message: `¿Está seguro que desea eliminar la alerta "${selectedAlert.titulo}"? Esta acción no se puede deshacer.`
        };
      case 'archive':
        return {
          title: "Archivar Alerta",
          message: `¿Desea archivar la alerta "${selectedAlert.titulo}"? Podrá encontrarla en la sección de alertas archivadas.`
        };
      default:
        return { title: "", message: "" };
    }
  };

  return (
    <div className="container" style={{
      minHeight: '100vh',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px'
          }}>Historial de Alertas</h1>
          <p style={{ color: '#6b7280' }}>Gestión y monitoreo de alertas del sistema</p>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280',
              marginBottom: '8px'
            }}>Total de Alertas</h3>
            <p style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827'
            }}>{alertStats.total}</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280',
              marginBottom: '8px'
            }}>Críticas</h3>
            <p style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#dc2626'
            }}>{alertStats.critical}</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280',
              marginBottom: '8px'
            }}>Activas</h3>
            <p style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#dc2626'
            }}>{alertStats.active}</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280',
              marginBottom: '8px'
            }}>Resueltas</h3>
            <p style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#059669'
            }}>{alertStats.resolved}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                position: 'relative',
                flex: '1',
                minWidth: '250px'
              }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} />
                <input
                  type="text"
                  placeholder="Buscar alertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Filter size={20} color="#6b7280" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="all">Todas las alertas</option>
                  <option value="critical">Críticas</option>
                  <option value="warning">Advertencias</option>
                  <option value="error">Errores</option>
                  <option value="info">Información</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>Alertas ({filteredAlertas.length})</h2>
          </div>
          
          <div style={{
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {filteredAlertas.length === 0 ? (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                No se encontraron alertas que coincidan con los criterios de búsqueda.
              </div>
            ) : (
              filteredAlertas.map((alerta, index) => (
                <div
                  key={alerta.id}
                  style={{
                    padding: '16px 20px',
                    borderBottom: index < filteredAlertas.length - 1 ? '1px solid #e5e7eb' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      flex: 1
                    }}>
                      <div style={{
                        padding: '8px',
                        backgroundColor: getAlertBgColor(alerta.tipo),
                        borderRadius: '50%',
                        marginTop: '4px'
                      }}>
                        {getAlertIcon(alerta.tipo)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            margin: 0
                          }}>{alerta.titulo}</h3>
                          <span style={{
                            padding: '2px 6px',
                            backgroundColor: getAlertBgColor(alerta.tipo),
                            color: getAlertColor(alerta.tipo),
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '500',
                            textTransform: 'uppercase'
                          }}>
                            {alerta.tipo}
                          </span>
                          <span style={{
                            padding: '2px 6px',
                            backgroundColor: getStatusBgColor(alerta.estado),
                            color: getStatusColor(alerta.estado),
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '500',
                            textTransform: 'uppercase'
                          }}>
                            {alerta.estado === 'active' ? 'Activa' : 'Resuelta'}
                          </span>
                        </div>
                        
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '8px'
                        }}>{alerta.descripcion}</p>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          fontSize: '12px',
                          color: '#6b7280'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Clock size={14} />
                            {new Date(alerta.fecha).toLocaleString()}
                          </div>
                          <span>Prototipo: {alerta.prototipo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => handleViewAlert(alerta)}
                        style={{
                          padding: '6px',
                          backgroundColor: '#dbeafe',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#bfdbfe'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#dbeafe'}
                      >
                        <Eye size={16} color="#2563eb" />
                      </button>
                      
                      <button
                        onClick={() => handleArchiveAlert(alerta)}
                        style={{
                          padding: '6px',
                          backgroundColor: '#f3f4f6',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      >
                        <Archive size={16} color="#6b7280" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteAlert(alerta)}
                        style={{
                          padding: '6px',
                          backgroundColor: '#fee2e2',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#fecaca'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#fee2e2'}
                      >
                        <Trash2 size={16} color="#dc2626" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title={getModalContent().title}
        message={getModalContent().message}
        onCancel={() => setShowModal(false)}
        onConfirm={modalType !== 'view' ? handleConfirmAction : undefined}
      />
    </div>
  );
};