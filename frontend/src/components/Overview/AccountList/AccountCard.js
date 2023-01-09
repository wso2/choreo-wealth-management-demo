import { Card, Image } from "react-bootstrap";
import { loadBankLogoByNickName, getBankCardStyle } from "../../../services/utils";

export const AccountCard = ({account}) => {

    return (
        <Card className={ "account-card-wrapper col me-3 p-5 "+ getBankCardStyle(account.Nickname)} border="light">
            <div className="d-flex align-items-center flex-row mb-1">
                <Image roundedCircle={true} src={loadBankLogoByNickName(account.Nickname)} alt="bank-logo" height="30px"/>
                <h3 className="account-balance">{account.Balance}</h3>
            </div>

            <div className="account-details d-flex flex-column">
                <h5 className="account-number">{account.AccountId}</h5>
                <h6 className="account-name">{account.Nickname}</h6>
            </div>
        </Card>
    )
}