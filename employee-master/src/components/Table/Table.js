import React, { useState,  Fragment } from "react";
import TableData from "../TableData/TableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./Table.css";
import { useDispatch, useSelector } from "react-redux";

const Table = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  //sorting
  const [icon, setIcon] = useState(false);
  const [order, setOreder] = useState("ASC");
  const sorting = (col) => {
    setIcon((preState) => !preState);
    if (order === "ASC") {
      const sorted = [...state.gobalSateEmployee].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
    dispatch({ type: "SORT", payload: sorted });
      setOreder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...state.gobalSateEmployee].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      dispatch({ type: "SORT", payload: sorted });
      setOreder("ASC");
    }
  };

  const selectAll = (event) => {
    dispatch({ type: "SELECTTOGGLE", payload: !state.selectToggle });
  };
 
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={state.selectToggle}
              />
            </th>
            <th onClick={() => sorting("firstName")}>
              First Name{" "}
              {icon === true ? (
                <FontAwesomeIcon icon={faArrowDown} />
              ) : (
                <FontAwesomeIcon icon={faArrowUp} />
              )}
            </th>
            <th onClick={() => sorting("lastName")}>Last Name</th>
            <th onClick={() => sorting("lastName")}>Date of Birth</th>
            <th>Email</th>
            <th>Update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableData />
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
