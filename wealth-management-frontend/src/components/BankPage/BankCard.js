import { getTokenFromCookieOrRetrieve, loadBankLogo } from "../../services/utils";
import { Card, Image } from 'react-bootstrap';
import { addBank, deleteBank } from "../../services/banks-service";

export const BankCard = ({bank, updateBank, setToastMsg}) => {

    const handleBankAdd = (event, bankId) => {
        event.preventDefault();
        getTokenFromCookieOrRetrieve().then(access_token => {
            addBank(access_token, bankId).then(resp => {
                updateBank(bankId, true);
                setToastMsg("Successfully added the bank!");
            }).catch(err => {
                console.log("failed to add bank. Caused by, ", err);
                setToastMsg("Try Again! Failed to add the bank!")
            });
        })
    }

    const handleBankDelete = (event, bankId) => {
        event.preventDefault();
        getTokenFromCookieOrRetrieve().then(access_token => {
            deleteBank(access_token, bankId)
            .then(resp => {
                    updateBank(bankId, false);
                    setToastMsg("Successfully deleted the bank!");
                })
                .catch(err => {
                    setToastMsg("Bank deletion failed, Try again!")
                    console.log("Failed to delete bank. Caused by, ", err)});
        })
    }

    /*
    This method will load add, edit, and delete icons
    Displays add icon if bank is not added
    Displays edit, delete icons if bank is already added
    */
    const loadBankFunctions = (bank) => {
        return bank.isAdded ? 
            (
                <div className="list-inline-item">
                    <button
                        type="button"
                        className="btn bank-card-button button-error"
                        onClick={e => handleBankDelete(e, bank.id)}
                    >
                        <i className="fi fi-rr-trash"/> Remove Bank
                    </button>
                </div>
            ):
            (
                <div className="list-inline-item">
                    <button
                        type="button"
                        className="btn bank-card-button button-primary"
                        onClick={e => handleBankAdd(e, bank.id)}
                    >
                        <i className="fi fi-rr-add"/>Add Bank
                    </button>
                </div>
            );
    };

    return (
        <Card className="col p-4 mb-3 me-3 bank-card" id="bank-card" border="light">
            <Image src={loadBankLogo(bank.name)} width="40px" roundedCircle={true} />
            <div className="d-flex align-items-baseline flex-column my-3">
                <h5 className="bank-name mb-0">{bank.name}</h5>
                <span className="bank-location text-uppercase">{bank.country}</span>
            </div>
            <div className="d-flex bank-card-actions">
                {loadBankFunctions(bank)}
            </div>
        </Card>
    );
};
