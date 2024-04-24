import React, {useState, useEffect} from "react";
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{
    console.log("test")
  }, [])
  return(
    <div className="w-full flex space-between">
      <div>
        <h1>Pantry</h1>
      </div>
      <div>
        <div className="cursor-pointer" onClick={()=>{console.log("here")}}>
          My Pantry
        </div>
        <Menu open={menuOpen}>
          <MenuItem>Sign In</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
