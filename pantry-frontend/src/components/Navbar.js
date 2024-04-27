import React, {useState, useEffect} from "react";
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return(
    <div className="w-full flex justify-between px-11 py-5">
      <div>
        <h1>Pantry</h1>
      </div>
      <a className="cursor-pointer" href="http://localhost:5000/user/sign-in">
        Sign in
      </a>
    </div>
  )
}
