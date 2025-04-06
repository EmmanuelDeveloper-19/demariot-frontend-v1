import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {Modal} from "../../components/Modal";

const API_BASE_URL = "http://localhost:8000";

export const ProfileInfo = () => {
  const { currentUser, updateUser } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [firstName, setFirstName] = useState(currentUser?.first_name || "");
  const [lastname, setLastName] = useState(currentUser?.last_name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [rol, setRol] = useState(currentUser?.role || "");
  const [city, setCity] = useState(currentUser?.address?.city || "");
  const [street, setStreet] = useState(currentUser?.address?.street || "");
  const [state, setState] = useState(currentUser?.address?.state || "");
  const [zip, setZip] = useState(currentUser?.address?.zip || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(
    currentUser?.profile_picture
      ? `${API_BASE_URL}${currentUser.profile_picture}`
      : null
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      const updatedData = {};

      if (firstName !== currentUser?.first_name) updatedData.first_name = firstName;
      if (lastname !== currentUser?.last_name) updatedData.last_name = lastname;
      if (phone !== currentUser?.phone) updatedData.phone = phone;
      if (email !== currentUser?.email) updatedData.email = email;

      if (
        street !== currentUser?.address?.street ||
        city !== currentUser?.address?.city ||
        state !== currentUser?.address?.state ||
        zip !== currentUser?.address?.zip
      ) {
        updatedData.address = {
          street,
          city,
          state,
          zip,
          country: currentUser?.address?.country || "",
        };
      }

      if (profilePicture) updatedData.profile_picture = profilePicture;

      if (Object.keys(updatedData).length > 0) {
        await updateUser(currentUser?._id, updatedData);
        setShowSuccessModal(true);
      }
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="title-header">
        <h1>Información del perfil</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <h2>Foto de perfil</h2>
          <div className="profile-picture-wrapper">
            <img
              src={preview}
              alt="Vista previa"
              className="profile-picture"
            />
            <label htmlFor="profilePicture" className="edit-icon">
              <i className="fas fa-pencil-alt"></i>
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-input"
            />
          </div>

          <h2>Datos personales</h2>
          <div>
            <label>Nombre:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div>
            <label>Apellidos:</label>
            <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div>
            <label>Télefono:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <label>Correo electrónico:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label>Rol:</label>
            <input type="text" value={rol} disabled />
          </div>

          <h2>Datos del domicilio</h2>
          <div>
            <label>Estado:</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          </div>

          <div>
            <label>Ciudad:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div>
            <label>Avenida o calle:</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>

          <div>
            <label>Código postal:</label>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>

      {/* Modales */}
      <Modal
        isOpen={showConfirmModal}
        title="¿Guardar cambios?"
        message="¿Estás seguro de que deseas actualizar tu información?"
        onConfirm={handleConfirmUpdate}
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
  );
};
