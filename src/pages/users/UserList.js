import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { useUsers } from '../../hooks/useUsers';
import { exportUsersToExcel, importUsersFromExcel } from '../../utils/excelUtils';
import nouserimage from "../../assets/no_user_image.png";
import { usePagination } from '../../hooks/usePagination';
const API_BASE_URL = process.env.REACT_APP_FOTOS;


export const UserList = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const { users, setUsers } = useUsers();
    const {
        currentData: paginatedUsers,
        currentPage,
        maxPage,
        next,
        prev,
        jump,
    } = usePagination(users, 5);
    const { updateUserRol, deleteUser, createMultipleUsers, getUsers, currentUser } = useAuth();

    const handleEdit = (user) => {
        setSelectedUserId(user._id);
        setSelectedRole(user.role);
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setSelectedUserId(user._id);
        setShowDeleteModal(true);
    };

    const editRol = async () => {
        try {
            const { success } = await updateUserRol(selectedUserId, selectedRole);
            if (success) {
                const { users } = await getUsers();
                const filteredUsers = users.filter(user => user._id !== currentUser?._id);
                setUsers(filteredUsers);
                setShowEditModal(false);
                setShowSuccessModal(true);
            } else throw new Error("Error al editar rol");
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
        }
    };

    const eliminarUsuario = async () => {
        try {
            const { success } = await deleteUser(selectedUserId);
            if (success) {
                const { users } = await getUsers();
                const filteredUsers = users.filter(user => user._id !== currentUser?._id);
                setUsers(filteredUsers);
                setShowDeleteModal(false);
                setShowSuccessModal(true);
            } else throw new Error("Error al eliminar usuario");
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
        }
    };


    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const transformedData = await importUsersFromExcel(file);
            const response = await createMultipleUsers({ users: transformedData });

            if (response.success) {
                const { users } = await getUsers();
                setUsers(users);
                setShowSuccessModal(true);
            } else throw new Error("Error al importar");
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
        }
    };

    return (
        <>
            <div className='container'>

                <div className='row flex'>
                    <h2 className='titulo'>Gestión de Usuarios</h2>

                    <div className='buttons-container'>
                        <label className='btn btn-outline-primary m-10'>
                            <i className='fas fa-upload' /> Importar excel
                            <input
                                type="file"
                                accept='.xlsx, .xls'
                                style={{ display: 'none' }}
                                onChange={handleImport}
                            />
                        </label>

                        <button onClick={() => exportUsersToExcel(users)} className='btn btn-outline-primary m-10'>
                            <i className='fas fa-file-excel' /> Descargar Excel
                        </button>

                        <Link to="/dashboard/agregarUsuario" className='btn btn-primary m-10'>
                            <i className='fas fa-plus' /> Agregar Usuario
                        </Link>
                    </div>
                </div>

                <div className='table-container m-10'>
                    <table className='content-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre del usuario</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                                    <td className='row center'>
                                        {user?.profile_picture ? (
                                            <img
                                                src={`${API_BASE_URL}${user.profile_picture}`}

                                                alt="Foto de perfil"
                                                className="icon-user"
                                            />
                                        ) : (
                                            <img
                                                src={nouserimage}
                                                alt="Foto de perfil por defecto"
                                                className="icon-user"
                                            />
                                        )}
                                        <p>{user.first_name} {user.last_name}</p>
                                    </td>
                                    <td>{user.email}</td>
                                    <td >
                                        <p className={user.role === 'admin' ? 'btn btn-outline-primary-light btn-disabled m-10' : 'btn btn-outline-yellow-light m-10'}>
                                            {user.role}
                                        </p>
                                    </td>

                                    <td>
                                        <Link to={`/dashboard/usuarioInfo/${user._id}`} style={{textDecoration: "none", justifyContent: "center", display: "flex"}} >
                                            <button className='btn btn-success'>
                                            <i className='fas fa-eye'/>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(user)} className='btn btn-info '>
                                            <i className='fas fa-pencil' />
                                        </button>

                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className='btn btn-danger '>
                                            <i className='fas fa-trash' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="row flex-left">
                    <button onClick={prev} disabled={currentPage === 1} className="btn btn-outline-secondary m-10">
                        &laquo; Anterior
                    </button>

                    {[...Array(maxPage)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => jump(i + 1)}
                            className={`btn ${currentPage === i + 1 ? 'btn-info m-10' : 'btn-outline-secondary m-10'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={next} disabled={currentPage === maxPage} className="btn btn-outline-secondary m-10">
                        Siguiente &raquo;
                    </button>
                </div>

                {/* Modales */}
                <Modal
                    isOpen={showEditModal}
                    title="Editar rol del usuario"
                    message={
                        <div className='form-modal'>
                            <label><span className="required">* </span>Selecciona el nuevo rol del usuario</label>
                            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="user">Usuario</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    }
                    onConfirm={editRol}
                    onCancel={() => setShowEditModal(false)}
                />

                <Modal
                    isOpen={showDeleteModal}
                    icon={<i className='fas fa-warning'></i>}
                    title="Eliminar usuario"
                    message="¿Estás seguro de eliminar este usuario?"
                    onConfirm={eliminarUsuario}
                    onCancel={() => setShowDeleteModal(false)}
                />

                <Modal
                    isOpen={showSuccessModal}
                    icon={<i className='fas fa-check'></i>}
                    title="¡Éxito!"
                    message="Operación completada correctamente."
                    onConfirm={() => setShowSuccessModal(false)}
                    onlyConfirm
                />

                <Modal
                    isOpen={showErrorModal}
                    title="Error"
                    message="Ocurrió un problema."
                    onConfirm={() => setShowErrorModal(false)}
                    onlyConfirm
                />
            </div>
        </>
    );
};
