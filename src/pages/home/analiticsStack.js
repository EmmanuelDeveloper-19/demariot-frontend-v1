export const AnaliticsStack = () => {
    return (
        <div className="d-flex gap-row row w-100">
            <div className="col-md-3">
                <div className="card-small bg-outline-primary">
                    <div className="card-icon">
                        <i className="fa-solid fa-flask text-primary"></i>
                    </div>
                    <div className="card-content">
                        <p className="card-title text-primary">Análisis de ph </p>
                        <p className="card-value text-primary">6.46</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card-small bg-outline-success">
                    <div className="card-icon">
                        <i className="fa-solid fa-cloud-showers-heavy text-primary"></i>
                    </div>
                    <div className="card-content">
                        <p className="card-title text-primary">Análisis de turbidez</p>
                        <p className="card-value text-primary">Agua turbia</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card-small bg-outline-danger">
                    <div className="card-icon">
                        <i className="fa-solid fa-temperature-half text-primary"></i>
                    </div>
                    <div className="card-content">
                        <p className="card-title text-primary">Análisis de temperatura </p>
                        <p className="card-value text-primary">20.19°</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card-small bg-outline-alert">
                    <div className="card-icon">
                        <i className="fa-solid fa-droplet text-primary"></i>
                    </div>
                    <div className="card-content">
                        <p className="card-title text-primary">Análisis de tds </p>
                        <p className="card-value text-primary">450.34</p>
                    </div>
                </div>
            </div>
        </div>
    )
}