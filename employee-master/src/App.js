import React,{ useState,} from 'react';
import './App.css';
import Form from './components/Form/Form';
import Nav from './components/Nav/Nav';
import Table from './components/Table/Table';
import {createContext} from 'react';
export const FormState = createContext()
export const SearchTerm = createContext()


function App() {
const [showFrom , SetShowFrom] = useState(false)
const showFormHandler=() =>{
  SetShowFrom(pre =>!pre)
}
//serach function
const [searchTerm ,setSearchTerm] = useState("")
  const getSearchTerm = (search) => {
    setSearchTerm(search);
  }

  return (<div>
    <Nav showFormHandler={showFormHandler}  getSearchTerm={getSearchTerm} />
   {showFrom && <Form showFormHandler={showFormHandler} />}
   <SearchTerm.Provider value={searchTerm}>
   <Table/>
   </SearchTerm.Provider>
    </div>
  

  );
}

export default App;
