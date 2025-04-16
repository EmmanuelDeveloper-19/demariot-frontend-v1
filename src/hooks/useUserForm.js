import { useState } from "react";

export const useUserForm = () => 
{
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        address: {
          street: "",
          city: "",
          zip: "",
          state: "",
        },
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
    
        if (userData.phone.length !== 10) {
          newErrors.phone = "El teléfono debe tener 10 dígitos";
        }
    
        if (userData.address.zip.length > 5) {
          newErrors.zip = "El código postal no puede tener más de 5 caracteres";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      return { userData, setUserData, validate, errors };
}