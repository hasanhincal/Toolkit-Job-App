import React, { useEffect, useState } from "react";
import Select from "./Select";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../app/slices/jobSlice";
import api from "../utils/api";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();
  console.log(text);
  console.log(status);
  console.log(type);
  console.log(sort);

  //* Filtreleme veya sıralama ile ilgili bir state değiştiğinde "api"'den güncel verileri al;
  useEffect(() => {
    const sortParam =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort === "En Yeni" || sort === "En Eski"
        ? "date"
        : undefined;

    const orderParam =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "En Yeni"
        ? "desc"
        : sort === "En Eski"
        ? "asc"
        : undefined;

    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };

    dispatch(setLoading());

    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [text, sort, type, status]);

  //* Filtreyi sıfırla butonuna tıkladığımızda stateleri ve inputları sıfırlar;
  const handleReset = (e) => {
    e.preventDefault();

    //* stateleri sıfırla;
    setText();
    setStatus();
    setType();
    setSort();

    //* inputları sıfırla;
    e.target.reset();
  };

  return (
    <div className="filter-section">
      <h2>Filtreleme Formu</h2>
      <form onSubmit={handleReset}>
        <div className="form-box">
          <div>
            <label htmlFor="search">Ara</label>
            <input
              type="text"
              id="search"
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <Select
            label="Durum"
            options={statusOpt}
            handleChange={(e) => setStatus(e.target.value)}
          />
          <Select
            label={"Tür"}
            options={typeOpt}
            handleChange={(e) => setType(e.target.value)}
          />
          <Select
            label={"Sırala"}
            options={sortOpt}
            handleChange={(e) => setSort(e.target.value)}
          />
        </div>

        <div>
          <SubmitButton text={"Filtreleri Sıfırla"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
