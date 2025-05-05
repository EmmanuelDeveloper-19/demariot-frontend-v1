import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserForm } from "../../hooks/useUserForm";
import { InputField } from "../../components/form/InputField";
import { SelectField } from "../../components/form/SelectField";
import { Breadcrumb } from "../../components/breadcrumb";
import { Usuarios } from "../../context/UserContext";

export const UserCreate = () => {
    const { createUser } = Usuarios();
    const {
        userData,
        setUserData,
        validate,
        errors
    } = useUserForm();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setShowConfirmModal(true);
    };

    const handleConfirmAdd = async (e) => {
        e.preventDefault();
        setShowConfirmModal(false);
        try {
            const result = await createUser(userData);
            if (result.success) {
                setShowSuccessModal(true);
            } else {
                setErrorMessage(result.error?.response?.data?.message || "Error desconocido");
                setShowErrorModal(true);
            }
        } catch (err) {
            setErrorMessage("Error inesperado al crear el usuario.");
            setShowErrorModal(true);
        }
    };

    const handleChange = (field) => (e) => {
        if (["street", "city", "zip", "state"].includes(field)) {
            setUserData({
                ...userData,
                address: { ...userData.address, [field]: e.target.value }
            });
        } else {
            setUserData({ ...userData, [field]: e.target.value });
        }
    };

    const breadcrumbItems = [
        { name: 'Inicio', path: '/dashboard-admin/home' },
        { name: 'Usuarios', path: '/dashboard-admin/usuarios' },
        { name: 'Agregar usuario', path: '/dashboard/agregarUsuario' },
    
      ];
    

    return (
        <>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="container">
                <header>Registro de usuario</header>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-title text-primary">Información del usuario</h3>
                    <div className="column">
                        <InputField label="Nombre" type="text" name="first_name" value={userData.first_name} onChange={handleChange("first_name")} />
                        <InputField label="Apellidos" type="text" name="last_name" value={userData.last_name} onChange={handleChange("last_name")} />
                    </div>
                    <div className="column">
                        <InputField label="Correo electrónico" type="email" name="email" value={userData.email} onChange={handleChange("email")} />
                        <InputField label="Teléfono" type="number" name="phone" value={userData.phone} onChange={handleChange("phone")} error={errors.phone} />
                    </div>

                    <h3 className="text-title text-primary mt-1">Dirección</h3>
                    <div className="column">
                        <InputField label="Calle" type="text" name="street" value={userData.address.street} onChange={handleChange("street")} />
                        <InputField label="Ciudad" type="text" name="city" value={userData.address.city} onChange={handleChange("city")} />
                    </div>
                    <div className="column">
                        <InputField label="Estado" type="text" name="state" value={userData.address.state} onChange={handleChange("state")} />
                        <InputField label="Código postal" type="text" name="zip" value={userData.address.zip} onChange={handleChange("zip")} error={errors.zip} />
                    </div>

                    <h3 className="text-title text-primary mt-1">Privilegios y autenticación</h3>
                    <div className="column">
                        <SelectField
                            label="Rol del usuario"
                            value={userData.role}
                            onChange={handleChange("role")}
                            options={[
                                { value: "admin", label: "ADMIN" },
                                { value: "user", label: "USUARIO NORMAL" }
                            ]}
                        />

                        <InputField label="Contraseña" type="password" name="password" value={userData.password} onChange={handleChange("password")} />

                    </div>
                    <div className="column mt-1">
                        <div className="input-box">
                            <div className="row gap">
                                <button className="btn btn-secondary" type="reset">Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar usuario</button>
                            </div>
                        </div>
                        <div className="input-box">

                        </div>
                    </div>
                </form>

                <Modal
                    isOpen={showConfirmModal}
                    icon={<i className="fas fa-save"></i>}
                    title="¿Guardar cambios?"
                    message="Al confirmar, los datos del usuario serán almacenados en el sistema."
                    onConfirm={handleConfirmAdd}
                    onCancel={() => setShowConfirmModal(false)}
                />

                <Modal
                    isOpen={showSuccessModal}
                    icon={<i className="fas fa-check"></i>}
                    title="¡Éxito!"
                    message="Usuario agregado correctamente"
                    onConfirm={() => {
                        setShowSuccessModal(false);
                        navigate("/dashboard/usuarios");
                    }}
                    onlyConfirm
                />

                <Modal
                    isOpen={showErrorModal}
                    title="Error"
                    message={errorMessage}
                    onConfirm={() => setShowErrorModal(false)}
                    onlyConfirm
                />
            </div>
        </>
    );
};
