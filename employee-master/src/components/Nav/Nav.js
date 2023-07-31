import React, { useState, useEffect } from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
const Nav = (props) => {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectLength, setSelectLength] = useState(0);
  const state = useSelector((state) => state);

  const searchHanlder = () => {
    setIsSearch((pre) => !pre);
    setSearch("");
    props.getSearchTerm("");
  };

  const searchValue = (event) => {
    setSearch(event.target.value);
    props.getSearchTerm(event.target.value);
  };
  const dispatch = useDispatch();
  console.log();
  const mutliDelete = () => {
    dispatch({ type: "SELECTTOGGLE", payload: false });
    const localStorageData = JSON.parse(localStorage.getItem("employee"));
    const fetchdata = localStorageData === null ? [] : localStorageData;
    const newArray = fetchdata.filter((ele) => {
      return ele.select === false;
    });
    localStorage.setItem("employee", JSON.stringify(newArray));
    dispatch({ type: "DELETE", payload: newArray });
  };
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("employee"));
    const fetchdata = localStorageData === null ? [] : localStorageData;
    const lengthSelect = fetchdata.filter((ele) => {
      return ele.select === true;
    });
    setSelectLength(lengthSelect.length);
  }, [state.gobalSateEmployee]);

  return (<>
  {selectLength === 0 ?  <nav className="nav">
      {isSearch === false ? (
        <h3>EmployeeList</h3>
      ) : (
        <div>
          <FontAwesomeIcon icon={faSearch} />
          &nbsp;
          <input type="text" onChange={searchValue} value={search} />
        </div>
      )}

      <ul>
        <li>
        {isSearch === false ?  <FontAwesomeIcon icon={faSearch} onClick={searchHanlder}/> :  <FontAwesomeIcon icon={faTimes} onClick={searchHanlder} />}
        </li>
        <li>
          <FontAwesomeIcon icon={faAdd} onClick={props.showFormHandler} />
        </li>
      </ul>
    </nav> :
    <nav className="delete_nav"> 
    <p>{selectLength === 0 ? '' : selectLength} Row(s) Selected</p>
    <li>
       <FontAwesomeIcon icon={faTrash} onClick={mutliDelete} />  
     </li></nav> }
    </>
  );
};

export default Nav;
