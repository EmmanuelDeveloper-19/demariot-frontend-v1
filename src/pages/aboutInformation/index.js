import React from 'react';
import { Info, Droplets, Activity, Globe, ChevronRight, Shield, Zap } from 'lucide-react';

export const AboutInformation = () => {
  const infoSections = [
    {
      id: 'metals',
      title: 'Acerca de Metales',
      description: 'Información sobre metales pesados y su impacto en el agua',
      icon: <Shield size={24} />,
      color: '#3B82F6'
    },
    {
      id: 'ph-sensor',
      title: 'Sensor de pH',
      description: 'Funcionamiento y calibración de sensores de pH',
      icon: <Droplets size={24} />,
      color: '#10B981'
    },
    {
      id: 'contamination',
      title: 'Niveles de Contaminación OMS',
      description: 'Estándares internacionales de calidad del agua',
      icon: <Globe size={24} />,
      color: '#EF4444'
    },
    {
      id: 'monitoring',
      title: 'Monitoreo de Agua',
      description: 'Sistemas de monitoreo y análisis en tiempo real',
      icon: <Activity size={24} />,
      color: '#8B5CF6'
    },
    {
      id: 'quality-standards',
      title: 'Estándares de Calidad',
      description: 'Normativas y regulaciones para agua potable',
      icon: <Zap size={24} />,
      color: '#F59E0B'
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header Principal */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '16px' 
        }}>
          <Info size={48} style={{ color: '#3B82F6', marginRight: '12px' }} />
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#1F2937',
            margin: 0
          }}>
            Sistema de Monitoreo de Agua
          </h1>
        </div>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6B7280', 
          maxWidth: '800px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Plataforma integral para el análisis y monitoreo de la calidad del agua, 
          detectando metales pesados y midiendo parámetros críticos como el pH.
        </p>
      </div>

      {/* Información Principal */}
      <div style={{ 
        background: 'linear-gradient(to right, #EBF8FF, #E0F7FA)',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '48px',
        border: '1px solid #BFDBFE'
      }}>
        <h2 style={{ 
          fontSize: '1.875rem', 
          fontWeight: '600', 
          color: '#1F2937',
          marginBottom: '16px'
        }}>
          ¿Qué hace nuestro sistema?
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <h3 style={{ color: '#374151', fontSize: '1.125rem', fontWeight: '500', marginBottom: '8px' }}>
              Detección de Metales Pesados
            </h3>
            <p style={{ color: '#6B7280', lineHeight: '1.5' }}>
              Identificamos y cuantificamos metales como plomo, mercurio, cadmio y arsénico en muestras de agua.
            </p>
          </div>
          <div>
            <h3 style={{ color: '#374151', fontSize: '1.125rem', fontWeight: '500', marginBottom: '8px' }}>
              Medición de pH
            </h3>
            <p style={{ color: '#6B7280', lineHeight: '1.5' }}>
              Monitoreo continuo del nivel de acidez o alcalinidad del agua con sensores de alta precisión.
            </p>
          </div>
          <div>
            <h3 style={{ color: '#374151', fontSize: '1.125rem', fontWeight: '500', marginBottom: '8px' }}>
              Análisis en Tiempo Real
            </h3>
            <p style={{ color: '#6B7280', lineHeight: '1.5' }}>
              Procesamiento instantáneo de datos con alertas automáticas ante niveles peligrosos.
            </p>
          </div>
        </div>
      </div>

      {/* Secciones de Información */}
      <div>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          color: '#1F2937',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Recursos de Información
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {infoSections.map((section) => (
            <div
              key={section.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ 
                  backgroundColor: section.color,
                  padding: '12px',
                  borderRadius: '8px',
                  color: 'white',
                  marginRight: '16px'
                }}>
                  {section.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1F2937',
                  margin: 0
                }}>
                  {section.title}
                </h3>
              </div>
              <p style={{ 
                color: '#6B7280', 
                lineHeight: '1.5',
                marginBottom: '16px'
              }}>
                {section.description}
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: section.color,
                fontWeight: '500'
              }}>
                <span>Ver más información</span>
                <ChevronRight size={16} style={{ marginLeft: '8px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer del módulo */}
      <div style={{ 
        textAlign: 'center',
        marginTop: '48px',
        padding: '24px',
        backgroundColor: '#F9FAFB',
        borderRadius: '8px'
      }}>
        <p style={{ 
          color: '#6B7280',
          fontSize: '1rem',
          margin: 0
        }}>
          Para más información técnica o soporte, consulta nuestra documentación completa.
        </p>
      </div>
    </div>
  );
};