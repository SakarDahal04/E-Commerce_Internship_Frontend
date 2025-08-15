import "./HelpContent.css"

const HelpContent = ({heading, help_message}) => {
  return (
    <div className='help-content'>
        <h1 className="heading">{heading}</h1>
        <p className="help_message"> {help_message} </p>
    </div>
  )
}

export default HelpContent