export const InputField = ({ label, type, value, onChange, name, error }) =>
(
    <div className="input-box mt-1">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Ingresa tu ${label.toLowerCase()}`}
        />
        {error && <small className="text-red-500">{error}</small>}
    </div>
)