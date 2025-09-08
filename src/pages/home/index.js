import { useAuth } from "../../context/AuthContext";
import { Prototype } from "../../components/prototype/prototype";
import { AnaliticsStack } from "./analiticsStack"
import { PredictionChart } from "../../components/charts/prediction";
import { NotiStatus } from "./NotiStatus";

export const HomeIndex = () => {
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

            <AnaliticsStack />

            <div className="row gap align-items-stretch">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <Prototype />
                        </div>
                    </div>
                    <br></br>
                    <NotiStatus/>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="chart-wrapper">
                            <PredictionChart />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}