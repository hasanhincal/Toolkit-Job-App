import React, { useEffect, useState } from "react";
import Select from "./Select";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import { filterBySearch, sortJobs } from "../app/slices/jobSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  //*! DEBOUNCE;
  /*
   * Her tuş vuruşun da filtreleme yapmak düşük donanımlı cihazlarda kasmalara ve donmalara
   * sebep olabileceğinden filtreleme işlemini kullanıcı yazma işni bıraktığı anda yapmalıyız.
   * Bu işleme "DEBOUCE" denir.
   * Ardışık olarak gerçekleşen fonk. çağırma işlemlerinde fonk. kısa bir zaman aralığında
   * çağırıldığını görmezden gelir.
   */
  //* 2. yol;
  const debounceText = useDebounce(text, 500);

  useEffect(() => {
    //* Bir sayaç başlat ve işlemi sayaç durduğunda yap;
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    //* Eğer süre bitmeden useEffect çalışırsa önceki sayacın çalışmasını durdur;
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  const handleReset = () => {
    //* inputları resetler;
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
            handleChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          />
          <Select
            label={"Tür"}
            options={typeOpt}
            handleChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          />
          <Select
            label={"Sırala"}
            options={sortOpt}
            handleChange={(e) => dispatch(sortJobs(e.target.value))}
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
