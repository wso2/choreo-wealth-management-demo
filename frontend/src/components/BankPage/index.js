import { useEffect, useState } from "react";
import { CONSTANTS, getTokenFromCookieOrRetrieve } from "../../services/utils";
import BankData from "../../data/BankData.json";
import { getAddedBanks } from "../../services/banks-service";
import { BankCard } from "./BankCard";

export const Banks = () => {
    
    const [banks, setBanks] = useState([]);
    const [toastMsg, setToastMsg] = useState("");
    const [isBankAdded, setIsBankAdded] = useState("");

    useEffect(() => {
        fetchBanksAPI().then(result => {
            setBanks(result);
        });
    }, [toastMsg])

    const fetchBanksAPI = async () => {
        const new_banks = BankData.banks;
        const access_token = await getTokenFromCookieOrRetrieve();
        console.log("fetching banks data")
        const added_banks_resp = await getAddedBanks(access_token);
        added_banks_resp.data.forEach(added_bank => {
            let index = new_banks.findIndex((bank => bank.name === added_bank.Name));
            if (index >= 0) {
                new_banks[index].isAdded = true;
            }
        });
        return new_banks;
    }

    const updateBank = (bankId, isAdded) => {
        let index = banks.findIndex((bank => bank.id === bankId));
        if (index >= 0) {
            banks[index].isAdded = isAdded;   
            sessionStorage.setItem(CONSTANTS.is_bank_added, isAdded);
            setIsBankAdded(isAdded);
        }
        setBanks(banks);
    }

    const renderToast = () => {
        return (
            <div className="toast-container bottom-0 end-0 p-3">
            <div className="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">{toastMsg}</div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                </div>
            </div>
            </div>
        )
    }

    return (
        <div>
            <div className="d-flex mb-3">
                <h4>My Banks</h4>
            </div>
            <div className="row row-cols-sm-2 row-cols-md-4 text-center mx-1" id="section-body">
                {banks && banks.map((bank) => <BankCard key={bank.id} bank={bank} 
                    updateBank={updateBank} setToastMsg={setToastMsg} />)}
            </div>
            {isBankAdded && renderToast()}
        </div>
    )
}
