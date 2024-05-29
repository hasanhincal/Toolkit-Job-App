import React from "react";
import AutoInput from "../components/AutoInput";
import { statusOpt, typeOpt } from "../constants";
import Select from "../components/Select";
import SubmitButton from "../components/SubmitButton";
import { v4 } from "uuid";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createJob } from "../app/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const AddJop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    //* Form data oluştur.
    const formData = new FormData(e.target);

    const newJobData = Object.fromEntries(formData.entries());
    newJobData.id = v4();
    newJobData.date = Date.now();

    api
      .post("/jobs", newJobData)
      .then(() => {
        toast.success("İş Başarıyla Eklendi!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        //* Store'a yeni veriyi kaydet;
        dispatch(createJob(newJobData));

        //* İşlem Başarılı olursa ANAsayfaya yönlendir;
        navigate("/");
      })
      .catch((err) => toast.error("İş eklenirken bir sorun oluştu!"));
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-box">
            <AutoInput label={"Pozisyon"} name="position" />
            <AutoInput label={"Şirket"} name="company" />
            <AutoInput label={"Lokasyon"} name="location" />

            <Select label={"Durum"} options={statusOpt} name="status" />
            <Select label={"Tür"} options={typeOpt} name="type" />
          </div>

          <div>
            <SubmitButton text={"Oluştur"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJop;
