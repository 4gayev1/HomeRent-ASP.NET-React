import axios from "axios";
import { useEffect, useState } from "react";



const Contract = () => {

    const [contractInfo, setContractInfo] = useState();
    const [blokInfo, setBlokInfo] = useState();
  
    const [inputData, setInputData] = useState({
        id: "",
        menzil_id: "",
        bashlamaTarix: "",
        bitmeTarix: "",
        ad: "",
        soyad: "",
        qiymet: "",
        status: ""
    });
  
    let urlBlok = "http://localhost:5254/api/Blok/";
  
    useEffect(() => {
      axios(urlBlok).then((response) => setBlokInfo(response.data));
  
    }, []);
  
   let url = "http://localhost:5254/api/Contract/";
  
    useEffect(() => {
      axios(url).then((response) => setContractInfo(response.data));
    }, [contractInfo]);
  
  
    function Edit(e) {
      axios.put(" http://localhost:5254/api/Contract?id= " + e.target.id, {
        id: e.target.id,
        menzil_id: inputData.menzil_id,
        bashlamaTarix: inputData.bashlamaTarix,
        bitmeTarix: inputData.bitmeTarix,
        ad: inputData.ad,
        soyad: inputData.soyad,
        qiymet: inputData.qiymet,
        status: inputData.status
      });
      console.log()
    }
  
    function Delete(e) {
      axios.delete("http://localhost:5254/api/Contract/(id)?id=" + e.target.id);
    }
  
    function Save() {
      axios
        .post(
          url,
          {
            menzil_id: inputData.menzil_id,
            bashlamaTarix: inputData.bashlamaTarix,
            bitmeTarix: inputData.bitmeTarix,
            ad: inputData.ad,
            soyad: inputData.soyad,
            qiymet: inputData.qiymet,
            status: inputData.status
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
        .get("http://localhost:5254/api/Contract/(id)?id=" + e.target.id)
        .then((response) =>
          {
            setInputData({
              menzil_id: response.data.menzil_id,
              bashlamaTarix: response.data.bashlamaTarix.slice(0,10),
              bitmeTarix: response.data.bitmeTarix.slice(0,10),
              ad: response.data.ad,
              soyad: response.data.soyad,
              qiymet: response.data.qiymet,
              status: response.data.status });
          }
        )
     
  
    }

  return (
    <div className='container'>
        
<div className="row">
    <div className="col-md-3">
        <h4>Müqavilə Məlumatları</h4>

       
       
        <div className="mb-2">
            <label>Menzil ID</label>
             <select  style={{width:100 + "%"}} id="menzil_id" className='form-control' onChange={(e) => getValue(e)}>
          {blokInfo?.map((blok,index)=>{
            return(
              <option key={index} value={blok.id}  > {blok.id}</option>
              
            )
          })}
            </select>
       </div>

        <div className="mb-2">
            <label>Müqavilənin Başlama Vaxtı</label>
            <input type="date" placeholder="Müqavilənin Başlama Vaxtı" id="bashlamaTarix"  className="form-control mt-1" defaultValue={inputData.bashlamaTarix}
              onChange={(e) => getValue(e)}/>
        </div>

        <div className="mb-2">
            <label>Müqavilənin Bitmə Vaxtı</label>
            <input type="date" placeholder="Müqavilənin Bitmə Vaxtı" id="bitmeTarix"  className="form-control mt-1" defaultValue={inputData.bitmeTarix}
              onChange={(e) => getValue(e)}/>
        </div>

        <div className="mb-2">
            <label>ad</label>
            <input type="text" placeholder="Ad" id="ad"  className="form-control mt-1" defaultValue={inputData.ad}
              onChange={(e) => getValue(e)}/>
        </div>

        <div className="mb-2">
            <label>Soyad</label>
            <input type="text" placeholder="Soyad" id="soyad"  className="form-control mt-1" defaultValue={inputData.soyad}
              onChange={(e) => getValue(e)}/>
        </div>

        <div className="mb-2">
            <label>Qiymet</label>
            <input type="text" placeholder="Qiymet" id="qiymet"  className="form-control mt-1" defaultValue={inputData.qiymet}
              onChange={(e) => getValue(e)}/>
        </div>
        <div className="mb-2">
            <label>Status</label>
            <input type="text" placeholder="Status" id="status"  className="form-control mt-1" defaultValue={inputData.status}
              onChange={(e) => getValue(e)}/>
        </div>


        <div className="row">
                <label className="text-danger text-center" id="Errmsg" ></label>
                <div className="col d-grid">
                    <button id="SaveBtn" className="btn btn-primary btn-block"  onClick={Save}>Save</button>
                </div>
             
            </div>

    
    </div>
           <div className="col">


   <h3>Müqavilə məlumatları</h3>

   <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Menzil ID</th>
      <th scope="col">M Başlama Vaxtı</th>
      <th scope="col">M Bitme Vaxtı</th>
      <th scope="col">ad</th>
      <th scope="col">Soyad</th>
      <th scope="col">Qiymet</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {contractInfo?.map((contract, index) => {
                return (
                  <tr key={contract.id}>
                     <th scope="row">
                      <a onClick={(e) => Select(e)} id={contract.id}  style={{color:'red',cursor:"pointer"}}>
                        {index + 1}
                      </a>
                    </th>
                    <td>{contract.menzil_id}</td>
                    <td>{contract.bashlamaTarix.slice(0,10)}</td>
                    <td>{contract.bitmeTarix.slice(0,10)}</td>
                    <td>{contract.ad}</td>
                    <td>{contract.soyad}</td>
                    <td>{contract.qiymet}</td>
                    <td>{contract.status}</td>
                    <td className="d-flex justify-content-center ">
                      <div className="col">
                        <button
                          id={contract.id}
                          className="btn btn-success "
                          onClick={(e) => Edit(e)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="col ">
                        <button
                          id={contract.id}
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
  )
}

export default Contract