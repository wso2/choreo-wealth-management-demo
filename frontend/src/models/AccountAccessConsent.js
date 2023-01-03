import moment from 'moment';

export class AccountAccessConsent {

    constructor() {
        this.Data = {
            Permissions: [
                "ReadAccountsBasic",
                "ReadTransactionsBasic"
            ],
            ExpirationDateTime: moment().add(1, 'd').format(),
            TransactionFromDateTime: moment().format(),
            TransactionToDateTime: moment().add(1, 'd').format()
        }
    }
}
