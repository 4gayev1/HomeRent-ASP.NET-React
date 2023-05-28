import axios from "axios";
import { useEffect, useState } from "react";

const Blok = () => {
  const [blokInfo, setBlokInfo] = useState();

  const [inputData, setInputData] = useState({
    ad: "",
    status: "",
  });

  let url = "http://localhost:5254/api/Blok/";

  useEffect(() => {
    axios(url).then((response) => setBlokInfo(response.data));
  }, [blokInfo]);

  function Edit(e) {
    axios.put(" http://localhost:5254/api/Blok?id= " + e.target.id, {
      id: e.target.id,
      ad: inputData.ad,
      status: inputData.status,
    });
  }

  function Delete(e) {
    axios.delete("http://localhost:5254/api/Blok/(id)?id=" + e.target.id);
  }

  function Save() {
    axios.post(
      url,
      {
        ad: inputData.ad,
        status: inputData.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  function getValue(e) {
    const newData = { ...inputData };
    newData[e.target.id] = e.target.value;
    setInputData(newData);
  }

  function Select(e) {
    axios
      .get("http://localhost:5254/api/Blok/(id)?id=" + e.target.id)
      .then((response) =>
        setInputData({ ad: response.data.ad, status: response.data.status })
      )

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h4>Blok məlumatları</h4>
          <div className="mb-2">
            <label>Ad</label>
            <input
              type="text"
              placeholder="Ad"
              id="ad"
              defaultValue={inputData.ad}
              onChange={(e) => getValue(e)}
              className="form-control mt-1"
            />
          </div>

          <div className="mb-2">
            <label>Status</label>
            <input
              type="text"
              placeholder="Status"
              id="status"
              defaultValue={inputData.status}
              className="form-control mt-1"
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
          <h3>Blok məlumatları</h3>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ad</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {blokInfo?.map((blok, index) => {
                return (
                  <tr key={blok.id}>
                    <th scope="row">
                      <a onClick={(e) => Select(e)} id={blok.id}  style={{color:'red',cursor:"pointer"}}>
                        {index + 1}
                      </a>
                    </th>
                    <td>{blok.ad}</td>
                    <td>{blok.status}</td>
                    <td className="d-flex justify-content-center ">
                      <div className="col">
                        <button
                          id={blok.id}
                          className="btn btn-success "
                          onClick={(e) => Edit(e)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="col ">
                        <button
                          id={blok.id}
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

export default Blok;
