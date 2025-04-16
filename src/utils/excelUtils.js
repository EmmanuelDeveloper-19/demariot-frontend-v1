import * as XLSX from "xlsx";

export const exportUsersToExcel = (users) => {
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

export const importUsersFromExcel = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
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

                resolve(transformedData);
            } catch (err) {
                reject(err);
            }
        };

        reader.readAsArrayBuffer(file);
    });
};
