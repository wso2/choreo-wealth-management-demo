import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonBankCard = () => {
  return (
    <div className="col" style={{"zIndex": "0"}}>
        <div className="rounded py-3 px-3 border" >
        <SkeletonTheme>
        <Skeleton circle={true} height={80} width={80} />
        <h5 className="mt-1"><Skeleton width={"95%"} /></h5>
        <Skeleton width={"60%"} />

        <ul className="social mb-0 list-inline mt-3">
            <li className="list-inline-item">
                <Skeleton circle={true} height={32} width={32} />
            </li>
            <li className="list-inline-item">
                <Skeleton circle={true} height={32} width={32} />
            </li>
        </ul>
        </SkeletonTheme>
        </div>
    </div>
  );
};
