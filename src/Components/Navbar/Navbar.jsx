import React from "react";

export default function Navbar() {
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3 "  style={{backgroundColor:" #e3f2fd"}}>
  <div className="container-fluid">
    <a class="navbar-brand" href="/">Movies</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
       
        
      </ul>
     
    </div>
  </div>
</nav>
    </>
}
