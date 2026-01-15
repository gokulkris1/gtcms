import React, { useEffect, useRef, useState } from "react";
import Api from "api/Api";
import SmallLoader from "components/common/SmallLoader";
import Toaster from "components/common/Toaster";

const GenerateKey = ({ data }) => {
  const { storeId, storeUniqueKey } = data;

  const toaster = useRef(null);
  const [key, setKey] = useState(storeUniqueKey);
  const [loading, setLoading] = useState(!storeUniqueKey);

  useEffect(() => {
    if (!key) {
      Api.post(`/admin/store/generateKey/${storeId}`)
        .then(res => {
          setKey(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          toaster.current.error(err.message);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="flex justify-content-center">
      {!loading && !!key && (
        <div className="flex space-between align-center storeKey">
          <div className="keyString">{key}</div>
          <div
            className="cursor-pointer"
            role="button"
            onClick={() => {
              navigator.clipboard.writeText(key);
              if (toaster.current) toaster.current.success("Copied!");
            }}
          >
            <i className="fas fa-copy mlr-4" />
          </div>
        </div>
      )}
      {!loading && !key && (
        <div className="flex ptb-10 align-center error-msg fs-16 text-center">
          Couldn't generate Store Unique Key!
        </div>
      )}
      {!!loading && (
        <div className="flex flex-y ptb-10 align-center text-center fs-16">
          <SmallLoader />
          Generating Store Unique Key...
        </div>
      )}
      <Toaster ref={toaster} />
    </div>
  );
};

export default GenerateKey;
