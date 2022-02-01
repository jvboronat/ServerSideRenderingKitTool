import React from "react";
import Header from "./components/Header";

function App(params) {

  //console.log(params.data)

  return (
    <div className="container">      
 

    <Header data={params.data}/>

      
    </div>
  );
}

export default App;


/*  */