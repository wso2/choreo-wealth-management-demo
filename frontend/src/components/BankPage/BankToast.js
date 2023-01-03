
import { Alert } from "bootstrap"

export const BankToast = ({error}) => {

    const alertList = document.querySelectorAll('.alert')
    const alerts = [...alertList].map(element => new Alert(element))
    alerts.map(alert => alert.close());

    return (
        <div class="alert alert-warning alert-dismissible fade show" role="alert" style={{width: "32%", float: "right"}}>
            <strong>{error.message}</strong> {" "}{error.description}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
