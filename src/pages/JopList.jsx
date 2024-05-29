import React from "react";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const JopList = () => {
  const { jobs, isLoading, error } = useSelector((store) => store.jobsReducer);

  return (
    <div className="list-page">
      <div>
        <Filter />

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          <div className="cards-wrapper">
            {jobs?.map((i) => (
              <Card key={i.id} job={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JopList;
