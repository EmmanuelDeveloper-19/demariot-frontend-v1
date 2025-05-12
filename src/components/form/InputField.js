export const InputField = ({ label, type, value, onChange, name, error, required, maxLength, minLength }) =>
(
    <div className="input-box mt-1">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={`Ingresa tu ${label.toLowerCase()}`}
        />
        {error && <small className="text-red-500">{error}</small>}
    </div>
)