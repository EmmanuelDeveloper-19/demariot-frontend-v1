// components/form/SelectField.js
export const SelectField = ({ label, value, onChange, options }) => (
    <div className="input-box mt-1">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option>Selecciona el rol del usuario</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
  