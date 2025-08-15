import { useContext, useState } from 'react'

import AuthContext from '../context/AuthContext'

import HelpContent from './../components/HelpContent/HelpContent'
import InputField from "./../components/InputField/InputField"
import { loginFields } from '../data/LoginRegisterData'

const Login = () => {
  const { loginUser } = useContext(AuthContext)

  const [formValues, setFormValues] = useState(
    loginFields.reduce((acc, field) => {
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

  const handleLoginForm = (e) => {
    e.preventDefault();
    // console.log('obatained value\n')
    // console.log(formValues['username'], formValues['password'])
    loginUser(formValues['username'], formValues['password'])
  }

  return (
    <div className='loginContainer'>
      <div className="loginContent">
        <HelpContent
          heading="Welcome"
          help_message={
            "Sign in to continue to Intern-commerce"
          }
        />

        <form className="formContainer" onSubmit={handleLoginForm}>
          {
            loginFields.map((field) => {
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
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login