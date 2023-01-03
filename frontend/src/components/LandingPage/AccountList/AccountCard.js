import { loadBankLogoByNickName } from "../../../services/utils"

export const AccountCard = ({account}) => {
    return (
        <div className="col pe-3">
            <div className="account-list-view" style={{width: "228px"}}>
            <div className="account-detail-view">
                
                <div className="row">
                <div className="col-2 no-padding-element ms-2 mt-2">
                    <img className="img-fluid rounded-circle" src={loadBankLogoByNickName(account.Nickname)} alt="bank-logo" />
                </div>
                
                <div className="col-8 m-1 pt-2">
                    <h6 className="font-size-small font-color-orange">{account.Nickname}</h6>
                    <div className="font-size-small font-color-dark">{account.AccountId}</div>
                </div>

                </div>
            
            </div>
            <div className="account-detail-view font-color-dark text-align-right my-0">{account.Balance}</div>
            </div>
        </div>
    )
}