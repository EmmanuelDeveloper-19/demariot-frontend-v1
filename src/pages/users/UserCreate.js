import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";

export const UserCreate = () => {
    const {createUser } = useAuth();
    const firstNameRef = useRef(null); 
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const phoneRef = useRef(null);
    const roleRef = useRef(null);
    const streetRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const zipRef = useRef(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setShowConfirmModal(true);
    };

    const handleConfirmAdd = async(event) =>
    {
        event.preventDefault();
        setShowConfirmModal(false);
        const user = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            phone: phoneRef.current.value,
            role: roleRef.current.value,
            address: {
              street: streetRef.current.value,
              city: cityRef.current.value,
              state: stateRef.current.value,
              zip: zipRef.current.value,
            },
          };
        try{
            
            await createUser(user);
            setShowSuccessModal(true);
            navigate("/dashboard/usuarios");


        }catch (error){
            console.log("Error", error)
            setShowErrorModal(true);
        }
    }

    return (
        <div className="container">
            <header>Registro de usuario</header>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Información del usuario</h3>
                <div className="column">
                    <div className="input-box">
                        <label>Nombre</label>
                        <input
                            type="text"
                            id="first_name"
                            ref={firstNameRef}
                            placeholder="Ingresa el nombre del usuario"
                        />
                    </div>
                    <div className="input-box">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            id="last_name"
                            ref={lastNameRef}
                            placeholder="Ingresa los apellidos del usuario"
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-box">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            placeholder="Ingresa el correo electrónico del usuario"
                        />
                    </div>

                    <div className="input-box">
                        <label>Telefono</label>
                        <input
                            type="number"
                            id="phone"
                            placeholder="Ingresa el télefono del usuario"
                            ref={phoneRef}

                        />
                    </div>
                </div>
                <h3>Dirección</h3>

                <div className="column">
                    <div className="input-box">
                        <label>Calle</label>
                        <input
                            id="street"
                            name="street"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            ref={streetRef}
                        />
                    </div>
                    <div className="input-box">
                        <label>Ciudad</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            ref={cityRef}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-box">
                        <label>Estado</label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            ref={stateRef}
                        />
                    </div>
                    <div className="input-box">
                        <label>Código postal</label>
                        <input
                            id="zip"
                            name="zip"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            ref={zipRef}
                        />
                    </div>
                </div>

                <h3>Privilegios y autenticación</h3>
                <br></br>
                <div className="select-box">
                    <label>Rol del usuario</label>
                    <select id="role" ref={roleRef}>
                        <option>selecciona el rol del usuario</option>
                        <option value="admin">ADMIN</option>
                        <option value="user">USUARIO NORMAL</option>
                    </select>
                </div>

                <div className="column">
                    <div className="input-box">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            placeholder="Ingresa una contraseña para el usuario"
                        />
                    </div>
    
                    </div>

                    <button type="submit">Guardar usuario</button>
    
                </form>
                <Modal
                    isOpen={showConfirmModal}
                    title="¿Guardar cambios?"
                    message="¿Estás seguro de que deseas actualizar tu información?"
                    onConfirm={handleConfirmAdd}
                    onCancel={() => {
                        setShowConfirmModal(false);
                        window.location.reload(); // recarga valores originales
                    }}
                />
    
                <Modal
                    isOpen={showSuccessModal}
                    title="¡Éxito!"
                    message="Tu información fue actualizada correctamente."
                    onConfirm={() => setShowSuccessModal(false)}
                    onlyConfirm
                />
    
                <Modal
                    isOpen={showErrorModal}
                    title="Error"
                    message="Ocurrió un problema al actualizar la información."
                    onConfirm={() => setShowErrorModal(false)}
                    onlyConfirm
                />
            </div>
    
    
        )

}   


/*
import { useAuth } from "../../context/AuthContext"
import { Modal } from "../../components/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserCreate = () => {
    const { createUser } = useAuth();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [userData, setUserData] = useState(
        {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            address: {
                street: '',
                city: "",
                zip: "",
                state: "",
            },
        });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirmAdd = async (event) => {
        event.preventDefault();

        setShowConfirmModal(false);
        try {
            console.log("Datos enviados", userData);
            await createUser(userData);
            setShowSuccessModal(true);
            navigate("/dashboard/usuarios");

        }
        catch (error) {
            console.log("Error", error)
            setShowErrorModal(true);
        }
    };

    return (
        <div className="container">
            <header>Registro de usuario</header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="column">
                    <div className="input-box">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={userData.first_name}
                            onChange={(event) => setUserData({ ...userData, first_name: event.target.value })}
                            placeholder="Ingresa el nombre del usuario"
                        />
                    </div>
                    <div className="input-box">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            value={userData.last_name}
                            onChange={(event) => setUserData({ ...userData, last_name: event.target.value })}
                            placeholder="Ingresa los apellidos del usuario"
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-box">
                        <label>Correo electrónico</label>x|
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                            placeholder="Ingresa el correo electrónico del usuario"
                        />
                    </div>

                    <div className="input-box">
                        <label>Telefono</label>
                        <input
                            type="number"
                            placeholder="Ingresa el télefono del usuario"
                            value={userData.phone}
                            onChange={(event) => setUserData({ ...userData, phone: event.target.value })}
                        />
                    </div>
                </div>
                <h3>Dirección</h3>

                <div className="column">
                    <div className="input-box">
                        <label>Calle</label>
                        <input
                            id="street"
                            name="street"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            value={userData.address.street}
                            onChange={(event) => setUserData({ ...userData, address: { street: event.target.value } })}
                        />
                    </div>
                    <div className="input-box">
                        <label>Ciudad</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            value={userData.address.city}
                            onChange={(event) => setUserData({ ...userData, address: { city: event.target.value } })}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-box">
                        <label>Estado</label>
                        <input
                            id="state"
                            name="city"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            value={userData.address.state}
                            onChange={(event) => setUserData({ ...userData, address: { state: event.target.value } })}
                        />
                    </div>
                    <div className="input-box">
                        <label>Código postal</label>
                        <input
                            id="zip"
                            name="zip"
                            type="text"
                            placeholder="Ingresa el código postal del usuario"
                            value={userData.address.zip}
                            onChange={(event) => setUserData({ ...userData, address: { zip: event.target.value } })}
                        />
                    </div>
                </div>

                <h3>Privilegios y autenticación</h3>
                <br></br>
                <div className="select-box">
                    <label>Rol del usuario</label>
                    <select
                        value={userData.role}
                        onChange={(event) => setUserData({ ...userData, role: event.target.value })}>
                        <option>selecciona el rol del usuario</option>
                        <option value="admin">ADMIN</option>
                        <option value="user">USUARIO NORMAL</option>
                    </select>
                </div>

                <div className="column">
                    <div className="input-box">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingresa una contraseña para el usuario"
                            value={userData.password}
                            onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                        />
                    </div>
    
                    </div>

                    <button type="submit">Guardar usuario</button>
    
                </form>
                <Modal
                    isOpen={showConfirmModal}
                    title="¿Guardar cambios?"
                    message="¿Estás seguro de que deseas actualizar tu información?"
                    onConfirm={handleConfirmAdd}
                    onCancel={() => {
                        setShowConfirmModal(false);
                        window.location.reload(); // recarga valores originales
                    }}
                />
    
                <Modal
                    isOpen={showSuccessModal}
                    title="¡Éxito!"
                    message="Tu información fue actualizada correctamente."
                    onConfirm={() => setShowSuccessModal(false)}
                    onlyConfirm
                />
    
                <Modal
                    isOpen={showErrorModal}
                    title="Error"
                    message="Ocurrió un problema al actualizar la información."
                    onConfirm={() => setShowErrorModal(false)}
                    onlyConfirm
                />
            </div>
    
    
        )
    }
*/