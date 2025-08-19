import { useContext, useState } from "react"

import AuthContext from "../context/AuthContext"

import HelpContent from "../components/HelpContent/HelpContent"
import InputField from "../components/InputField/InputField"
import { registerFields } from "../data/LoginRegisterData"


const Register = () => {
    const { registerUser } = useContext(AuthContext)

    const [formValues, setFormValues] = useState(
        registerFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    );

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterForm = (e) => {
        e.preventDefault();
        console.log('obatained value\n')
        console.log(
            "\nusername", formValues['username'],
            "\npassword",  formValues['password'],
            "\nemail",  formValues['email'], 
            "\nConfirm", formValues['confirm_password'] )
        registerUser( 
            formValues['username'], 
            formValues['password'], 
            formValues['email'], 
            formValues['confirm_password']
        )
    }

    return (
        <div className='loginContainer'>
            <div className="loginContent">
                <HelpContent
                    heading="Welcome"
                    help_message={
                        "Sign up to continue to Intern-commerce"
                    }
                />

                <form className="formContainer" onSubmit={handleRegisterForm}>
                    {
                        registerFields.map((field) => {
                            return (
                                <InputField
                                    key={field.name}
                                    {...field}
                                    value={formValues[field.name]}
                                    onChange={handleChange}
                                />
                            )
                        })
                    }
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register