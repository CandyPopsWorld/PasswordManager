import { Alert } from "react-bootstrap";
import './AlertMessage.scss';

const AlertMessage = ({errorText, variant = 'danger', setShow}) => {

    const closeAlert = () => {
        setShow(false);
    }

    return (
        <Alert className="alert_custom" variant={variant} onClose={closeAlert} dismissible> 
            <p>{errorText}</p>
        </Alert>
    )
}

export default AlertMessage;