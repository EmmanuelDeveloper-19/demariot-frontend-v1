import { useState, useEffect} from "react";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://localhost:8000/api";

export const ProfileInfo = () => {
    const { currentUser, updateUser } = useAuth();
    const [formData, setFormData] = useState({
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || { street: "", city: "", state: "", zip: "", country: "" },
      password: "",
      profile_picture: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (currentUser) {
        setFormData({
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          email: currentUser.email,
          phone: currentUser.phone,
          address: currentUser.address || { street: "", city: "", state: "", zip: "", country: "" },
          password: "",
          profile_picture: null,
        });
      }
    }, [currentUser]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "address") {
        setFormData({
          ...formData,
          address: { ...formData.address, [e.target.dataset.field]: value },
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        profile_picture: e.target.files[0],
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const updatedData = { ...formData };
      // Convert address to JSON string for submission
      updatedData.address = JSON.stringify(updatedData.address);
  
      try {
        const result = await updateUser(currentUser._id, updatedData);
        if (!result.success) {
          setError(result.error.message);
        } else {
          setFormData({
            ...formData,
            password: "",
            profile_picture: null,
          });
          alert("Perfil actualizado con éxito");
        }
      } catch (err) {
        setError("Hubo un error al actualizar la información.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h2>Actualizar perfil</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Correo:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Dirección:</label>
            <div>
              <label>Calle:</label>
              <input
                type="text"
                name="address"
                data-field="street"
                value={formData.address?.street || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Ciudad:</label>
              <input
                type="text"
                name="address"
                data-field="city"
                value={formData.address?.city || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Estado:</label>
              <input
                type="text"
                name="address"
                data-field="state"
                value={formData.address?.state || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Código Postal:</label>
              <input
                type="text"
                name="address"
                data-field="zip"
                value={formData.address?.zip || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>País:</label>
              <input
                type="text"
                name="address"
                data-field="country"
                value={formData.address?.country || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label>Contraseña (opcional):</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Foto de perfil (opcional):</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar perfil"}
          </button>
        </form>
      </div>
    );
  };
/* 
  <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Foto de Perfil:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && <img src={preview} alt="Vista previa" width="150" height="150" />}
                </div>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
            */