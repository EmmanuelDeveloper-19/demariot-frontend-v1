import { useAuth } from "../../context/AuthContext";
import { PhData } from "../../components/sensors/phData";
import { TurbidezData } from "../../components/sensors/turbidezData";
import { Humidity, Temperature } from "../../components/sensors/weather";
import { MetalsData } from "../../components/sensors/metalsData";
import { LocationData } from "../../components/sensors/locationData";
import { WeatherQuality } from "../../components/sensors/weatherCuality";
import { Prototype } from "../../components/prototype/prototype";
import { PredictionChart } from "../../components/charts/prediction";

export const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div className="container-fluid">
            <div className="dashboard-header mb-4">
                <h1 className="text-title text-primary">Hola! {currentUser.first_name}</h1>
                <p className="text-base text-primary">Bienvenido. (Los datos en tiempo real se muestran si el prototipo esta ensendido, si no se muestra la última actualización).</p>
            </div>

            {/* Primera fila con 4 tarjetas */}
            <div className="row gap-row">
                <div className="col-md-3">
                    <div className="card bg-outline-primary">
                        <PhData />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-outline-success">
                        <TurbidezData />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-outline-danger">
                        <Temperature />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-outline-alert">
                        <Humidity />
                    </div>
                </div>
            </div>

            {/* Segunda fila con 2 tarjetas */}
            <div className="row gap-row">
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
}