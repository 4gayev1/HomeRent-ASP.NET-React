import axios from "axios";
import { useEffect, useState } from "react";

const Flat = () => {
  const [flatInfo, setFlatInfo] = useState();
  const [blokInfo, setBlokInfo] = useState();

  const [inputData, setInputData] = useState({
    blok_id: "",
    nomresi: "",
    otaqSayi: "",
    kv: "",
    qiymet: "",
    status: "",
  });

  let urlBlok = "http://localhost:5254/api/Blok/";

  useEffect(() => {
    axios(urlBlok).then((response) => setBlokInfo(response.data));
  }, []);

  let url = "http://localhost:5254/api/Flat/";

  useEffect(() => {
    axios(url).then((response) => setFlatInfo(response.data));
  }, [flatInfo]);

  function Edit(e) {
    axios.put(" http://localhost:5254/api/Flat?id= " + e.target.id, {
      id: e.target.id,
      blok_id: inputData.blok_id,
      nomresi: inputData.nomresi,
      otaqSayi: inputData.otaqSayi,
      kv: inputData.kv,
      qiymet: inputData.qiymet,
      status: inputData.status,
    });
  }

  function Delete(e) {
    axios.delete("http://localhost:5254/api/Flat/(id)?id=" + e.target.id);
  }

  function Save() {
    axios
      .post(
        url,
        {
          blok_id: inputData.blok_id,
          nomresi: inputData.nomresi,
          otaqSayi: inputData.otaqSayi,
          kv: inputData.kv,
          qiymet: inputData.qiymet,
          status: inputData.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.userData);
      });
  }

  function getValue(e) {
    const newData = { ...inputData };
    newData[e.target.id] = e.target.value;
    setInputData(newData);
    console.log(inputData);
  }

  function Select(e) {
    axios
      .get("http://localhost:5254/api/Flat/(id)?id=" + e.target.id)
      .then((response) =>
        setInputData({
          blok_id: response.data.blok_id,
          nomresi: response.data.nomresi,
          otaqSayi: response.data.otaqSayi,
          kv: response.data.kv,
          qiymet: response.data.qiymet,
          status: response.data.status,
        })
      );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h4>Mənzil Məlumatları</h4>

          <div className="mb-2">
            <label>Blok ID</label>
            <select
              style={{ width: 100 + "%" }}
              id="blok_id"
              className="form-control"
              onChange={(e) => getValue(e)}
            >
              {blokInfo?.map((blok, index) => {
                return (
                  <option key={index} defaultValue={blok.id}>
                    {" "}
                    {blok.id}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-2">
            <label>Nömrəsi</label>
            <input
              type="text"
              placeholder="Nömrəsi"
              id="nomresi"
              className="form-control mt-1"
              defaultValue={inputData.nomresi}
              onChange={(e) => getValue(e)}
            />
          </div>

          <div className="mb-2">
            <label>Otaq Sayı</label>
            <input
              type="text"
              placeholder="Otaq Sayı"
              id="otaqSayi"
              className="form-control mt-1"
              defaultValue={inputData.otaqSayi}
              onChange={(e) => getValue(e)}
            />
          </div>

          <div className="mb-2">
            <label>Kv</label>
            <input
              type="text"
              placeholder="Kvadret metr"
              id="kv"
              className="form-control mt-1"
              defaultValue={inputData.kv}
              onChange={(e) => getValue(e)}
            />
          </div>

          <div className="mb-2">
            <label>Qiymət</label>
            <input
              type="text"
              placeholder="qiymet"
              id="qiymet"
              className="form-control mt-1"
              defaultValue={inputData.qiymet}
              onChange={(e) => getValue(e)}
            />
          </div>

          <div className="mb-2">
            <label>Status</label>
            <input
              type="text"
              placeholder="Status"
              id="status"
              className="form-control mt-1"
              defaultValue={inputData.status}
              onChange={(e) => getValue(e)}
            />
          </div>

          <div className="row">
            <label className="text-danger text-center" id="Errmsg"></label>
            <div className="col d-grid">
              <button
                id="SaveBtn"
                className="btn btn-primary btn-block"
                onClick={Save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <h3>Mənzil Məlumatları</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Blok ID</th>
                <th scope="col">Nömrəsi</th>
                <th scope="col">Otaq Sayı</th>
                <th scope="col">Kv</th>
                <th scope="col">Qiymət</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {flatInfo?.map((flat, index) => {
                return (
                  <tr key={flat.id}>
                    <th scope="row">
                     
                        <a
                          onClick={(e) => Select(e)}
                          id={flat.id}
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          {index + 1}
                        </a>
                     
                    </th>
                    <td>{flat.blok_id}</td>
                    <td>{flat.nomresi}</td>
                    <td>{flat.otaqSayi}</td>
                    <td>{flat.kv}</td>
                    <td>{flat.qiymet}</td>
                    <td>{flat.status}</td>
                    <td className="d-flex justify-content-center ">
                      <div className="col">
                        <button
                          id={flat.id}
                          className="btn btn-success "
                          onClick={(e) => Edit(e)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="col ">
                        <button
                          id={flat.id}
                          className="btn btn-danger "
                          onClick={(e) => Delete(e)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Flat;
