import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/Modal";
import nouserimage from "../../assets/no_user_image.png";
import { Breadcrumb } from "../../components/breadcrumb";

const API_BASE_URL = process.env.REACT_APP_FOTOS;

export const ProfileInfo = () => {
  const { currentUser, updateUser, changePassword } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const initialValues = {
    firstName: currentUser?.first_name || "",
    lastname: currentUser?.last_name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    city: currentUser?.address?.city || "",
    street: currentUser?.address?.street || "",
    state: currentUser?.address?.state || "",
    zip: currentUser?.address?.zip || "",
    preview: currentUser?.profile_picture
      ? `${API_BASE_URL}${currentUser.profile_picture}`
      : null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    passwordError: ""
  };

  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastname, setLastName] = useState(initialValues.lastname);
  const [phone, setPhone] = useState(initialValues.phone);
  const [email, setEmail] = useState(initialValues.email);
  const [city, setCity] = useState(initialValues.city);
  const [street, setStreet] = useState(initialValues.street);
  const [state, setState] = useState(initialValues.state);
  const [zip, setZip] = useState(initialValues.zip);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(initialValues.preview);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const checkForChanges = () => {

      const hasFormChanges =
        firstName !== initialValues.firstName ||
        lastname !== initialValues.lastname ||
        phone !== initialValues.phone ||
        email !== initialValues.email ||
        city !== initialValues.city ||
        street !== initialValues.street ||
        state !== initialValues.state ||
        zip !== initialValues.zip ||
        profilePicture !== null ||
        currentPassword !== "" ||
        newPassword !== "" ||
        confirmPassword !== "";

      setHasChanges(hasFormChanges);
    };

    checkForChanges();
  }, [firstName, lastname, phone, email, city, street, state, zip, profilePicture, currentPassword, newPassword, confirmPassword]);

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

      if (currentPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error("Las contraseñas no coinciden")
        }

        const result = await changePassword(currentUser._id, currentPassword, newPassword);
        if (!result.success) {
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

  const resetForm = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastname);
    setPhone(initialValues.phone);
    setEmail(initialValues.email);
    setCity(initialValues.city);
    setStreet(initialValues.street);
    setState(initialValues.state);
    setZip(initialValues.zip);
    setProfilePicture(initialValues.profilePicture);
    setPreview(initialValues.preview);
    setCurrentPassword(initialValues.currentPassword);
    setNewPassword(initialValues.newPassword);
    setConfirmPassword(initialValues.confirmPassword);
    setShowPassword(initialValues.showPassword);
    setPasswordError(initialValues.passwordError);
  };

  const breadcrumbItems = [
    { name: 'Inicio', path: '/dashboard/home' },
    { name: 'Perfil', path: '/perfil' },
    { name: 'Información Personal', path: '/perfil/informacion' },

  ];


  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="container">
        <header className="text-primary">Información del usuario</header>

        <form className="form" onSubmit={handleSubmit}>
          <h2 className="text-subtitle text-primary text-center">Foto de perfil</h2>
          <div className="profile-picture-wrapper mb-1">
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

          <h2 className="text-subtitle text-primary">Datos personales</h2>
          <div className="column">
            <div className="input-box mt-1">
              <label>Nombre:</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className="input-box mt-1">
              <label>Apellidos:</label>
              <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="column">
            <div className="input-box mt-1">
              <label>Télefono:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="input-box mt-1">
              <label>Correo electrónico:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <h2 className="text-subtitle mt-1 text-primary">Datos del domicilio</h2>
          <div className="column">
            <div className="input-box mt-1">
              <label>Estado:</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </div>

            <div className="input-box mt-1">
              <label>Ciudad:</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="column">
            <div className="input-box mt-1">
              <label>Avenida o calle:</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>

            <div className="input-box mt-1">
              <label>Código postal:</label>
              <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
          </div>

          <h2 className="text-subtitle mt-1 text-primary">Cambiar contraseña</h2>
          <div className="column">
            <div className="input-box mt-1">
              <label>contraseña actual: </label>
              <div className="input-icon">
                <input
                  id="currentPassword"
                  name="current_password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                />
                <i
                  className={`fas ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                  onClick={() => setShowPassword(!showCurrentPassword)}
                />
              </div>
            </div>
            <div className="input-box">
              {/*Vacio porque no supe como alinearlo (NO BORRAR)*/}
              
            </div>
          </div>

          <div className="column">
            <div className="input-box mt-1">
              <label>Nueva contraseña: </label>
              <div className="input-icon">
                <input
                  id="newPassword"
                  name="new_password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingresa una nueva contraseña"
                />
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className="input-box">
              {/*Vacio porque no supe como alinearlo (NO BORRAR)*/}
            </div>
          </div>

          <div className="column">
            <div className="input-box mt-1">
              <label>Confirmar contraseña: </label>
              <div className="input-icon">
                <input
                  id="confirmPassword"
                  name="confirm_password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                />
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {confirmPassword && (
                <p style={{ color: passwordMatch ? "green" : "red" }}>
                  {passwordMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                </p>
              )}
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <div className="input-box">
              {/*Vacio porque no supe como alinearlo (NO BORRAR)*/}
            </div>
          </div>

          <div className="column">
            <div className="input-box">
              <div className="row gap">
                <button className="btn btn-secondary mt-1" type="button" onClick={resetForm}>
                  Cancelar
                </button>
                <button
                  className="btn btn-primary mt-1"
                  type="submit"
                  disabled={loading || !hasChanges}
                >
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </div>
            <div className="input-box">
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
      </div></>
  );
};