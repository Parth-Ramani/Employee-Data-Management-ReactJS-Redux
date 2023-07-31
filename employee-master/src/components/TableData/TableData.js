import React, { Fragment, useState, useEffect, useContext} from "react";
import TableExpand from "../TableExpand/TableExpand";
import UpdateForm from "../UpdateForm/UpdateForm";
import TableRow from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import { SearchTerm,  } from "../../App";
import Pagination from "../Pagination/Pagination";
function TableData() {
  const state = useSelector((state) => state);


  const dispatch = useDispatch();
  const [viewID, setviewID] = useState(null);
  const [employee ,setEmployee] = useState(state.gobalSateEmployee)
  //expand data
  const expandHnadler = (event, obj) => {
    setviewID(obj.id);
  };
  //update form handleing
  const [updateFormState, setUpdateFormState] = useState(null);
  const updateFormHandler = (event, objId) => {
    setUpdateFormState(objId);
    setviewID(null);
  };
  const closeUpdateForm = () => {
   
    setUpdateFormState(null);
  };
  const hideExpand = () => {
    setviewID(null);
  };
  
  
  

  ///multiple Select
  const checkedHandler = (event, data) => {
    const { checked } = event.target;
    const checkArray = state.gobalSateEmployee.map((ele) => {
      if (ele.id === data.id) {
        return { ...ele, select: checked };
      }
      return ele;
    });
    localStorage.setItem("employee", JSON.stringify(checkArray));
    dispatch({ type: "CHECK", payload: checkArray });
    
  };
  //search
  const searchTerm =useContext(SearchTerm)
  useEffect(() => {
    if ( searchTerm!== "") {
      const newData = state.gobalSateEmployee.filter((employe) => {
        return Object.values(employe)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setEmployee(newData);
    } else{
      setEmployee(state.gobalSateEmployee);
    }
  }, [searchTerm,state.gobalSateEmployee])

  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  // Get Current posts
  const indexOfLastPosts = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPosts - postPerPage;
  
 
    const currentEmployees = employee.slice(
      indexOfFirstPost,
      indexOfLastPosts
    );
  
  
  //change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const perPage = (post) => {
    setPostPerPage(post);
  };
  useEffect(() => {
    const deleteShift =currentEmployees.length === 0 ?currentPage -1 :currentPage

    // console.log(deleteShift);
    setCurrentPage(deleteShift <= 0 ? 1 : deleteShift);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.gobalSateEmployee])
  
  const newData = JSON.parse(localStorage.getItem("employee"));
  const employeeData = newData === null ? [] : newData;

 const getCurrentPage =(val) =>{
  setCurrentPage(val)
 }
 
  // Select all
  useEffect(() => {
    const selcted = currentEmployees.map((ele) => {
      return { ...ele, select: state.selectToggle };
    });
    const newDataArray = state.gobalSateEmployee.map(
      (obj) => selcted.find((o) => o.id === obj.id) || obj
    );
    localStorage.setItem("employee", JSON.stringify(newDataArray));
    dispatch({ type: "CHECK", payload: newDataArray });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectToggle,])


  
  return (
    <Fragment>
      {currentEmployees.map((obj) => (
        <Fragment key={obj.id}>
          <TableRow
            obj={obj}
            expandHnadler={expandHnadler}
            updateFormHandler={updateFormHandler}
            checkedHandler={checkedHandler}
            hideExpand={hideExpand}
          />
          {viewID === obj.id && (
            <TableExpand obj={obj} hideExpand={hideExpand} />
          )}
          {updateFormState === obj.id && (
            <UpdateForm obj={obj} closeUpdateForm={closeUpdateForm} />
          )}
        </Fragment>
      ))}
      {employeeData.length === 0 ? (
        <></>
      ) : (
        <Pagination
          postPerPage={postPerPage}
          totalPosts={employeeData.length}
          paginate={paginate}
          perPage={perPage}
          currentPage={currentPage}
          getCurrentPage ={getCurrentPage}
        />
      )}
    </Fragment>
  );
}

export default TableData;
