import { useAuth } from "../../context/AuthContext";
import { PhData } from "../../components/sensors/phData";
import { TurbidezData } from "../../components/sensors/turbidezData";
import { Humidity, Temperature } from "../../components/sensors/weather";
import { MetalsData } from "../../components/sensors/metalsData";
import { LocationData } from "../../components/sensors/locationData";
import { WeatherQuality } from "../../components/sensors/weatherCuality";
import { Prototype } from "../../components/prototype/prototype";
import { PredictionChart } from "../../components/charts/prediction";
import { StatsCards } from "../../components/startsCards";

export const Home = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <div className="container">
                <h1 className="text-start text-primary">¡Hola!, {currentUser.first_name} {currentUser.last_name}</h1>
                <p className="text-primary">
                    En esta aplicación podrás monitorear información en tiempo real sobre datos del prototipo, así mismo podras visualizar predicciones a futuro
                    acerca de la contaminación de metales pesados en aguas residuales. Si quieres saber más acerca de la contaminación de metales pesados en aguas residuales, da clic al siguiente botón.
                </p>
                <button className="btn btn-primary mt-1">Ver más información </button>
            </div>

            <div className="d-flex gap-row row w-100">
                <div className="col-md-3">
                    <div className="card-small">
                        <div className="card-icon">
                            <i className="fa-solid fa-flask"></i>
                        </div>
                        <div className="card-content">
                            <p className="card-title">Análisis de ph </p>
                            <p className="card-value">7</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-icon">
                            <i className="fa-solid fa-cloud-showers-heavy"></i>
                        </div>
                        <div className="card-content">
                            <p className="card-title">Análisis de ph </p>
                            <p className="card-value">7</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-icon">
                            <i className="fa-solid fa-temperature-half"></i>
                        </div>
                        <div className="card-content">
                            <p className="card-title">Análisis de ph </p>
                            <p className="card-value">7</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-icon">
                            <i className="fa-solid fa-droplet"></i>
                        </div>
                        <div className="card-content">
                            <p className="card-title">Análisis de ph </p>
                            <p className="card-value">7</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

/*

export const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div className="container-fluid">
            <div className="dashboard-header mb-4">
                <h1 className="text-primary">Hola! {currentUser.first_name}</h1>
                <p className="text-primary">Bienvenido. (Los datos en tiempo real se muestran si el prototipo esta ensendido, si no se muestra la última actualización).</p>
            </div>

            <div className="d-flex col-md-12 gap-row"> 
                <StatsCards />
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="card ">
                        <div className="card-body">
                            <Prototype />
                        </div>
                    </div>
                    <br></br>
                    <div className="card">
                        <div className="card-body">
                            <WeatherQuality />

                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card h-100">

                        <div className="chart-wrapper">
                            <PredictionChart />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}*/