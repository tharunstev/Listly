import { styled } from "@mui/material/styles";
import logo from "../assets/Logo.jpeg";

import NewTaskDialogBox from "./NewTaskDialogBox";
import Home from "./Home"
import { useState } from "react";



const Wrapper = styled("div")`
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #20233f;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 98vw; 
  box-sizing: border-box; 
  overflow-x: hidden; 

  @media (max-width: 600px) {
    text-align: center;
    height: auto;
    padding: 10px;
  }
`;

const Logo = styled("img")`
  max-width: 50px;
  max-height: 50px;
  border-radius: 20px;
  @media (max-width: 900px) {
    max-width: 120px;
  }
  @media (max-width: 600px) {
    max-width: 100px;
  }
  @media (max-width: 400px) {
    max-width: 80px;
  }
`;

const Search = styled("input")`
  background-color: #808492;
  width: 200px;
  height: 30px;
  border-radius: 20px;
  border: 2px #808492;
  color: #F5F6F7;
  padding: 0 10px;
  box-sizing: border-box;

  &::placeholder {
    color: white;
  }

  @media (max-width: 900px) {
    width: 150px;
  }

  @media (max-width: 600px) {
    width: 120px;
  }

  @media (max-width: 400px) {
    width: 100px;
  }
`;

const Navbar = () => {
    const [input,setInput]=useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value)
    // console.log(input);
    
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
    <Wrapper>
      
      <Logo src={logo} alt="LOGO" />
      <Search type="text" placeholder="Search Anything " value={input} onChange={handleInput}/>
      
      <NewTaskDialogBox open={dialogOpen} onClose={handleClose} />
      
    </Wrapper>
    <Home input={input}/>
    </>
  );
};

export default Navbar;
