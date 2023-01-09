import { Card, Image } from "react-bootstrap";
import { loadBankLogoByNickName } from "../../../services/utils";

export const AccountCard = ({account}) => {

    return (
        <Card className="account-card-wrapper col me-3 px-4 py-3">
            <div className="d-flex align-items-center flex-row mb-1">
                <Image roundedCircle={true} src={loadBankLogoByNickName(account.Nickname)} alt="bank-logo" height="30px"/>
                <h3 className="account-balance">{account.Balance}</h3>
            </div>

            <div className="account-details d-flex flex-column mt-3">
                <h5 className="account-number mb-1">{account.AccountId}</h5>
                <h6 className="account-name mb-0">{account.Nickname}</h6>
            </div>
        </Card>
    )
}