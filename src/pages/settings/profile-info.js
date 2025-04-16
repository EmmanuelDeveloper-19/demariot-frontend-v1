import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/Modal";
import nouserimage from "../../assets/no_user_image.png";

const API_BASE_URL = process.env.REACT_APP_FOTOS;

export const ProfileInfo = () => {
  const { currentUser, updateUser, changePassword } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [firstName, setFirstName] = useState(currentUser?.first_name || "");
  const [lastname, setLastName] = useState(currentUser?.last_name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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
      }

      if(currentPassword || newPassword || confirmPassword)
      {
        if(newPassword !== confirmPassword)
        {
          throw new Error("Las contraseñas no coinciden")
        }

        const result = await changePassword(currentUser._id, currentPassword, newPassword);
        if (!result.success)
        {
          throw new Error(result.error || "Contraseña actual incorrecta");
        }
      }
      setShowSuccessModal(true);
    } catch (error) {
      if (error.message.includes("contraseña")) {
        setPasswordError(error.message);
      } else {
        setShowErrorModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="container">
      <header>Información del usuario</header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <h2 className="titulo">Foto de perfil</h2>
          <div className="profile-picture-wrapper">
            <img
              src={preview ? preview : nouserimage}
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

          <h2 className="titulo">Datos personales</h2>
          <div className="column">
            <div className="input-box">
              <label>Nombre:</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Apellidos:</label>
              <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="column">
            <div className="input-box">
              <label>Télefono:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Correo electrónico:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <h2 className="titulo">Datos del domicilio</h2>
          <div className="column">
            <div className="input-box">
              <label>Estado:</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Ciudad:</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="column">
            <div className="input-box">
              <label>Avenida o calle:</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>

            <div className="input-box">
              <label>Código postal:</label>
              <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>

          </div>

          <h2 className="titulo">Cambiar contraseña</h2>
          <div className="password-box">
          <label>Contraseña actual</label>
          <div className="input-icon-container">
            <input
              className="password-input"
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <div className="password-box">
          <label>Contraseña nueva</label>
          <div className="input-icon-container">
            <input
              className="password-input"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="password-box">
          <label>Confirmar contraseña</label>
          <div className="input-icon-container">
            <input
              className={`password-input ${confirmPassword && (passwordMatch ? "match" : "mismatch")}`}
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {confirmPassword && (
            <p style={{ color: passwordMatch ? "green" : "red" }}>
              {passwordMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
            </p>
          )}
        </div>

        {passwordError && <p className="error-message">{passwordError}</p>}

        <div className="save-button">

        <button className="btn btn-primary " type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
        </div>

      </form>

      {/* Modales */}
      <Modal
        isOpen={showConfirmModal}
        icon={<i className="fas fa-save"></i>}
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
        icon={<i className="fas fa-check"></i>}
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
