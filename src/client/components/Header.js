import React from "react";

function Header({ data }) {
  //console.log("Headerrrrrr", data);
  return <div>{data.table[0].Nom}</div>;
}

export default Header;
