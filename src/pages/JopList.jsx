import React from "react";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const JopList = ({ retry }) => {
  const { jobs, mainJobs, isLoading, error } = useSelector(
    (store) => store.jobsReducer
  );
  console.log(jobs, mainJobs, isLoading, error);
  return (
    <div className="list-page">
      <div>
        <Filter />
        <h3 className="counter">
          Bulunan ( {mainJobs?.length} ) iş arasından ( {jobs?.length} )
          tanesini görüntülüyorsunuz.
        </h3>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error} retry={retry} />
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
