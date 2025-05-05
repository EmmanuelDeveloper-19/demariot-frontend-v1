import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { useUsersHoook } from '../../hooks/useUsers';
import { exportUsersToExcel, importUsersFromExcel } from '../../utils/excelUtils';
import nouserimage from "../../assets/no_user_image.png";
import { usePagination } from '../../hooks/usePagination';
import { Usuarios } from '../../context/UserContext';
const API_BASE_URL = process.env.REACT_APP_FOTOS;


export const UserList = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const { users, setUsers } = useUsersHoook();
    const {
        currentData: paginatedUsers,
        currentPage,
        maxPage,
        next,
        prev,
        jump,
    } = usePagination(users, 5);
    const { currentUser } = useAuth();
    const { createMultipleUsers, updateUserRol, getUsers, deleteUser } = Usuarios();

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
                const filteredUsers = users.filter(user => user._id !== currentUser?._id);
                setUsers(filteredUsers);
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
                <div className='row'>
                    <div className='col-md-6 d-flex  align-items-center'>
                        <h2 className='text-subtitle text-primary'>Gestión de Usuarios</h2>
                    </div>

                    <div className='col-md-6 d-flex gap'>
                        <label className='btn btn-outline-primary m-10'>
                            <i className='fas fa-upload' /> Importar excel
                            <input
                                type="file"
                                accept='.xlsx, .xls'
                                style={{ display: 'none' }}
                                onChange={handleImport}
                            />
                        </label>

                        <button onClick={() => exportUsersToExcel(users.filter(user => user._id !== currentUser?._id))} className='btn btn-outline-primary m-10'>
                            <i className='fas fa-file-excel' /> Descargar Excel
                        </button>

                        <Link to="/dashboard-admin/agregarUsuario" className='btn btn-primary m-10'>
                            <i className='fas fa-plus' /> Agregar Usuario
                        </Link>
                    </div>
                </div>

                <div className='table-container mt-1'>
                    <table className='content-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th></th>
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
                                    <td>
                                        {user?.profile_picture ? (
                                            <img
                                                src={`${API_BASE_URL}${user.profile_picture}`}

                                                alt="Foto de perfil"
                                                className="profile-picture-small"
                                            />
                                        ) : (
                                            <img
                                                src={nouserimage}
                                                alt="Foto de perfil por defecto"
                                                className="profile-picture-small"
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <p>{user.first_name} {user.last_name}</p>
                                    </td>
                                    <td>{user.email}</td>
                                    <td >
                                        <span className={user.role === 'admin' ? 'btn-badge btn-outline-primary-light btn-disabled m-10' : 'btn-badge btn-outline-yellow-light m-10'}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className='row gap'>
                                        <Link to={`/dashboard-admin/usuarioInfo/${user._id}`} className='btn-icono btn-small btn-success' >
                                            <i className='fas fa-eye' />
                                        </Link>


                                        <button onClick={() => handleEdit(user)} className='btn-small btn-info '>
                                            <i className='fas fa-pencil' />
                                        </button>
                                        <button onClick={() => handleDelete(user)} className='btn-small btn-danger '>
                                            <i className='fas fa-trash' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="row mt-10">
                    <div className='col-md-6 d-flex gap'>
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
                </div>

                {/* Modales */}
                <Modal
                    isOpen={showEditModal}
                    title="Editar rol del usuario"
                    message={
                        <div className='flex-column'>
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
