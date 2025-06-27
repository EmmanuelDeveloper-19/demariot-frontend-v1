import React from "react";

export const StatsCards = () => {
    const cardData = [
        {
            title: "Análisis sin comprobar",
            value: "24",
            icon: "fas fa-clipboard-list",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
            iconColor: "#3B82F6"
        },
        {
            title: "Análisis comprobados",
            value: "156",
            icon: "fas fa-check-circle",
            color: "bg-green-100 text-green-600",
            iconColor: "text-green-500",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
            iconColor: "#3B82F6"
        },
        {
            title: "Total de análisis",
            value: "180",
            icon: "fas fa-chart-line",
            color: "bg-purple-100 text-purple-600",
            iconColor: "text-purple-500",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
            iconColor: "#3B82F6"
        },
        {
            title: "Lugares analizados",
            value: "42",
            icon: "fas fa-map-marker-alt",
            color: "bg-orange-100 text-orange-600",
            iconColor: "text-orange-500",
            bgColor: "#DBEAFE",
            textColor: "#2563EB",
            iconColor: "#3B82F6"
        }
    ];

    return (

        <>
            {/* Card 1: Análisis sin comprobar */}
            <div className="card-small" style={{ backgroundColor: '#EFF6FF', color: '#1E40AF' }}>
                <div className="card-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
                    <i className="fas fa-clipboard-list"></i>
                </div>
                <div className="card-content">
                    <p className="card-title">Análisis sin comprobar</p>
                    <p className="card-value">24</p>
                </div>
            </div>

            {/* Card 2: Análisis comprobados */}
            <div className="card-small" style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
                <div className="card-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22C55E' }}>
                    <i className="fas fa-check-circle"></i>
                </div>
                <div className="card-content">
                    <p className="card-title">Análisis comprobados</p>
                    <p className="card-value">156</p>
                </div>
            </div>

            {/* Card 3: Total de análisis */}
            <div className="card-small" style={{ backgroundColor: '#F5F3FF', color: '#5B21B6' }}>
                <div className="card-icon" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#A855F7' }}>
                    <i className="fas fa-chart-line"></i>
                </div>
                <div className="card-content">
                    <p className="card-title">Total de análisis</p>
                    <p className="card-value">180</p>
                </div>
            </div>

            {/* Card 4: Lugares analizados */}
            <div className="card-small" style={{ backgroundColor: '#FFEDD5', color: '#9A3412' }}>
                <div className="card-icon" style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#F97316' }}>
                    <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="card-content">
                    <p className="card-title">Lugares analizados</p>
                    <p className="card-value">42</p>
                </div>
            </div>
        </>
    );
};