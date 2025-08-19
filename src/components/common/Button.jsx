import './css/button.css'

function Button({button, onClick}) {

    return (
            <button type="button" onClick={
                (e) => {
                    if(onClick){
                        onClick(e);
                    }
                    if(button.onClickFunction){
                        button.onClickFunction(e)
                    }
                }
            } className="common-button" style={{ '--background-color': button.bgColor, '--text-color': button.textColor }}>{button.text}</button>
    )
}

export default Button
import './css/button.css'

function Button({button}) {

    return (
            <button 
                type="button" 
                onClick={button.onClickFunction} 
                className="common-button" 
                style={{ 
                    '--background-color': button.bgColor, 
                    '--text-color': button.textColor 
                }}>
                    {button.text}
                </button>
    )
}

export default Button