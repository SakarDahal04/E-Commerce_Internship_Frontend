import "./InputField.css"

const InputField = ({label, type, name, value, onChange, placeholder}) => {

  
  return (
    <div>
        <div className="form-group">
            <label htmlFor={value} className="form-label">{label}</label>
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
                required
                className="form-field"
            />
        </div>
    </div>
  )
}

export default InputField