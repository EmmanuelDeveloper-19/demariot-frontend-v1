import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import * as XLSX from "xlsx";


export const UserList = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const { updateUserRol } = useAuth();
    const { deleteUser } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { getUsers, currentUser, createMultipleUsers } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { success, users } = await getUsers();
            if (success) {
                const filteredUsers = users.filter(user => user._id !== currentUser?._id);
                setUsers(filteredUsers);
            }
        };
        fetchUsers();
    }, [getUsers, currentUser]);

    const handleEdit = (user) => {
        setSelectedUserId(user._id);
        setSelectedRole(user.role);
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setSelectedUserId(user._id);
        setShowDeleteModal(true);
    }


    const editRol = async () => {
        try {
            const { success } = await updateUserRol(selectedUserId, selectedRole);
            if (success) {
                setShowEditModal(false);
                setShowSuccessModal(true);
                const { users } = await getUsers();
                setUsers(users);
            } else {
                throw new Error("Error al editar rol");
            }
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
        }
    };

    const eliminarUsuario = async (userId) => {
        try {
            const { success } = await deleteUser(userId);
            if (success) {
                const { users } = await getUsers();
                setUsers(users);
                setShowDeleteModal(false);
                setShowSuccessModal(true);
            } else {
                throw new Error("Error al eliminar");
            }
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
        }
    };

    const handleExport = () => {
        const exportData = users.map(user => ({
            Nombre: user.first_name,
            Apellidos: user.last_name,
            Telefono: user.phone,
            Correo: user.email,
            Rol: user.role,
            Contraseña: user.password,
            Estado: user.address.state,
            Ciudad: user.address.city,
            Calle: user.address.street,
            CP: user.address.zip,
            Foto: user.profile_picture
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

        XLSX.writeFile(workbook, "usuarios.xlsx");
    };

    const handleImport = async(event) => 
    {
        const file = event.target.files[0];

        if (!file)
        {
            console.error('No se selecciono ningún archivo');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) =>
        {
            const data = new  Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const transformedData = jsonData.map(user => ({
                first_name: user.Nombre,
                last_name: user.Apellidos,
                phone: user.Telefono,
                email: user.Correo,
                role: user.Rol,
                password: user.Contraseña,
                address: {
                  state: user.Estado,
                  city: user.Ciudad,
                  street: user.Calle,
                  zip: user.CP
                },
                profile_picture: user.Foto
              }));
              
            
            try
            {
                const response = await createMultipleUsers({ users: transformedData});
                
                if(response.success)
                {
                    const { users } = await getUsers();
                    setUsers(users);
                    setShowSuccessModal(true);
                }
                else
                {
                    throw new Error('Error la importar usuarios');
                }
            } 
            catch(error)
            {
                console.error(error);
                setShowErrorModal(true);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleDownloadTemplate = () => {
        const templateData = [
          {
            Nombre: "",
            Apellidos: "",
            Telefono: "",
            Correo: "",
            Rol: "",
            Contraseña: "",
            Estado: "",
            Ciudad: "",
            Calle: "",
            CP: "",
            Foto: ""
          }
        ];
      
        const worksheet = XLSX.utils.json_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PlantillaUsuarios");
      
        XLSX.writeFile(workbook, "plantilla_usuarios.xlsx");
      };
      

    return (
        <div className='container'>
            <div className='row'>
                <h2>Usuarios</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className='btn btn-success' onClick={handleDownloadTemplate}>
                        Descargar plantilla 
                    </button>
                    <label className='btn btn-success'>
                        <i className='fas fa-file-excel'/> Importar excel
                        <input
                        type="file"
                        accept='.xlsx, .xls'
                        style={{display: 'none'}}
                        onChange={handleImport}/>
                    </label>

                    <button onClick={handleExport} className='btn btn-success'>
                        <i className='fas fa-file-excel' />Descargar Excel
                    </button>
                    <Link to="/dashboard/agregarUsuario" className='btn btn-info'>
                        Añadir nuevo usuario
                    </Link>
                </div>
            </div>

            <div>
                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo electrónico</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link to={`/dashboard/usuarioInfo/${user._id}`} className='btn btn-success'>
                                        <i className='fas fa-eye' />
                                    </Link>
                                    <button onClick={() => handleEdit(user)} className='btn btn-info'>
                                        <i className='fas fa-pencil' />
                                    </button>
                                    <button onClick={() => handleDelete(user)} className='btn btn-danger'>
                                        <i className='fas fa-trash' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modales */}
            <Modal
                isOpen={showConfirmModal}
                title="¿Guardar cambios?"
                message="¿Estás seguro de que deseas actualizar tu información?"
                onConfirm={handleEdit}
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

            <Modal
                isOpen={showEditModal}
                title="Editar rol del usuario"
                message={
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="user">Usuario</option>
                        <option value="admin">Admin</option>
                    </select>
                }
                onConfirm={editRol}
                onCancel={() => setShowEditModal(false)}
            />

            <Modal
                isOpen={showDeleteModal}
                title="Eliminar usuario"
                message={"¿Estás seguro de eliminar este usuario?"}
                onConfirm={() => eliminarUsuario(selectedUserId)}
                onCancel={() => setShowDeleteModal(false)}
            />

        </div>
    )
}

/*
    <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.first_name}{user.last_name}
                        <Link to={`/dashboard/usuarioInfo/${user._id}`}>
                            <button>Ver detalles</button>
                        </Link>
                    </li>
                ))}
            </ul>*/