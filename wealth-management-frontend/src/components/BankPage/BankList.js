import { BankCard } from "./BankCard";
import { SkeletonBankCard } from "./SkeletonBankCard";

export const BankList = ({banks, isBankLoading, setIsBankLoading, updateBankList}) => {

  const bankCards = banks.map((bank) => {
    return <BankCard key={bank.id} bank={bank} 
      setIsBankLoading={setIsBankLoading} updateBankList={updateBankList} />;
  });

  return (
      <div className="row row-cols-sm-2 row-cols-md-4 text-center mx-1" id="section-body">
        {bankCards}
        {isBankLoading && <SkeletonBankCard />}
      </div>
  );
};
