import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Breadcrumb reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.items - Array de objetos con la estructura {name: string, path: string}
 * @param {string} props.separator - Separador entre los elementos (opcional, por defecto '>')
 * @param {string} props.className - Clases CSS adicionales (opcional)
 * @returns {JSX.Element} - Componente Breadcrumb
 */
export const Breadcrumb = ({ items = [], separator = '>', className = '' }) => {
  // Verificar si hay elementos para mostrar
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={`breadcrumb-container ${className}`}>
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={`breadcrumb-item-${index}`} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-active">{item.name}</span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumb-link">
                    {item.name}
                  </Link>
                  <span className="breadcrumb-separator">{separator}</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Ejemplo de uso:
// <Breadcrumb 
//   items={[
//     { name: 'Inicio', path: '/' },
//     { name: 'Perfil', path: '/perfil' },
//     { name: 'Editar Información', path: '/perfil/editar' }
//   ]} 
// />e