import { Card, Image } from "react-bootstrap";
import { loadBankLogo } from "../../../services/utils";

export const AccountCard = ({account}) => {
    return (
        <Card className="account-card-wrapper col me-1 px-4 py-3">
            <div className="d-flex align-items-center flex-row mb-1">
                <Image roundedCircle={true} src={loadBankLogo(account.Bank)} alt="bank-logo" style={{height: "30px", width: "30px"}} />
                <h3 className="account-balance">{account.Balance}</h3>
            </div>

            <div className="account-details d-flex flex-column mt-3">
                <h5 className="account-number mb-1">{account.AccountId}</h5>
                <h6 className="account-name mb-0">{account.AccountType}</h6>
            </div>
        </Card>
    )
}