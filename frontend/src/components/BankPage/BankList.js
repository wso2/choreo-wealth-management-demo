import { BankCard } from "./BankCard";
import { SkeletonBankCard } from "./SkeletonBankCard";

export const BankList = ({title, banks, isBankLoading, setIsBankLoading, updateBankList}) => {

  const bankCards = banks.map((bank) => {
    return <BankCard key={bank.id} bank={bank} 
      setIsBankLoading={setIsBankLoading} updateBankList={updateBankList} />;
  });

  return (
    <div className="container-md bg-light rounded">
      <div className="container-md py-3" id="section-title">
        <h3>{title}</h3>
      </div>
      <div className="row row-cols-sm-2 row-cols-md-4 text-center mx-2" id="section-body">
          {bankCards}
          {isBankLoading && <SkeletonBankCard />}
      </div>
    </div>
  );
};
