import { BankList } from "./BankList";
import { useState } from "react";
import { CONSTANTS } from "../../services/utils";
import BankData from "../../data/BankData.json";

export const Banks = () => {
    
    const [isBankAdding, setIsBankAdding] = useState(false);
    const [newBanks, setNewBanks] = useState(JSON.parse(sessionStorage.getItem(CONSTANTS.new_banks)));
    const [addedBanks, setAddedBanks] = useState(JSON.parse(sessionStorage.getItem(CONSTANTS.added_banks)));

    const updateSession = (data) => {
        setNewBanks(data.newBanks);
        setAddedBanks(data.addedBanks);

        sessionStorage.setItem(CONSTANTS.new_banks, JSON.stringify(data.newBanks));
        sessionStorage.setItem(CONSTANTS.added_banks, JSON.stringify(data.addedBanks));
    }

    if (!newBanks || !addedBanks) {
        updateSession(BankData);
    }

    const updateBankList = bankId => {
        let index = newBanks.findIndex((bank => bank.id === bankId));
        if (index > 0) {
            const newlyAddedBank = newBanks[index];
            newlyAddedBank.isAdded = true;
            
            addedBanks.push(newlyAddedBank);
            newBanks.splice(index, 1);
        } else {
            index = addedBanks.findIndex((bank => bank.id === bankId));
            const newlyRemovedBank = addedBanks[index];
            newlyRemovedBank.isAdded = false;
            
            newBanks.push(newlyRemovedBank);
            addedBanks.splice(index, 1);    
        }
        updateSession({newBanks, addedBanks});
    }

    return (
        <div>
            <div className="d-flex mb-3">
                <h4>All Banks</h4>
            </div>
            <div>
                <BankList title="Link my other bank" banks={newBanks}
                    setIsBankLoading={setIsBankAdding} updateBankList={updateBankList} />
                <BankList title="Added banks" banks={addedBanks} isBankLoading={isBankAdding}
                          updateBankList={updateBankList} />
            </div>
        </div>
    )
}
