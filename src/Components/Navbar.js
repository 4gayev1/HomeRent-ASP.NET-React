import axios from 'axios';

const Navbar = () => {
  return (
    <>

     <nav className="navbar navbar-expand-lg navbar-light bg-light container mb-5">
  <a className="navbar-brand" href="/" style={{fontSize:26 + 'px'}}>HomeRent</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="/" style={{fontSize:22 + 'px'}}>Blok <span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/flat" style={{fontSize:22 + 'px'}}>Flats</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/contract" style={{fontSize:22 + 'px'}}>Contracts</a>
      </li>
      
    </ul>
  </div>
</nav>   
    </>
  )
}

export default Navbar