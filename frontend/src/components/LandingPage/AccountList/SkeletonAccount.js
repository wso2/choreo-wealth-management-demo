import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import React from "react";

export const SkeletonAccount = () => {
  return (
    <SkeletonTheme baseColor="#EEEEEE" highlightColor="#FFFFFF">
      <div className="col">
        <div className="account-list-view">
          <div className="account-detail-view">
            
            <div className="row p-2">
              <div className="col-2">
                <Skeleton circle={true} height={32} width={32} />
              </div>

              <div className="col-8 mx-3">
                <Skeleton width={"100%"}></Skeleton>
                <Skeleton width={"50%"}></Skeleton>
              </div>
            </div>
            
            <div className="row ms-5"><Skeleton /></div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

