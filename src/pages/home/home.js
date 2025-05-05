import { useAuth } from "../../context/AuthContext";
import { PhData } from "./phData";
import { TurbidezData } from "./turbidezData";
import { Humidity, Temperature } from "./weather";
import { MetalsData } from "./metalsData";
import { LocationData } from "./locationData";
import { WeatherQuality } from "./weatherCuality";

export const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div className="">
            <div className="dashboard-header mb-1">
                <h1 className="text-title text-primary">Hola! {currentUser.first_name}</h1>
                <p className="text-base text-primary">Bienvenido. (Los datos en tiempo real se muestran si el prototipo esta ensendido, si no se muestra la última actualización).</p>
            </div>

            <div className="row gap">
                <div className="col-md-6 h-100 ">
                    <div className="row gap">
                        <div className="col-md-6 mb-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h1 className="text-title text-primary">Datos del agua</h1>
                                </div>
                                <div className="chart-wrapper row d-flex ">
                                    <div className="col-md-8">
                                        <PhData />
                                        <TurbidezData />
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-icons">
                                            <i class="fa fa-tint"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="text-title text-primary">Datos atmosfericos</h2>
                                </div>
                                <div className="chart-wrapper">
                                    <Temperature />
                                    <Humidity />

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fila 2 */}
                    <div className="row gap mt-1">
                        <div className="col-md-6 mb-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="text-title text-primary">Calidad del Agua</h2>
                                </div>
                                <div className="chart-wrapper">
                                    <WeatherQuality/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="text-title text-primary">Presencia de metales</h2>
                                </div>
                                <div className="chart-wrapper">
                                    <MetalsData/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-header">
                            <h2 className="text-title text-primary">Último análisis</h2>
                        </div>
                        <div className="chart-wrapper">
                            <LocationData/>
                        </div>
                        <button className="btn btn-primary action-button">Ver</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

