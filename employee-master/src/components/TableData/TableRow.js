import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const TableRow = ({
  obj,
  expandHnadler,
  updateFormHandler,
  checkedHandler,
  hideExpand,
}) => {
  const onCheck = (event) => {
    event.stopPropagation();
  };
  const [accordineView, setAccordineView] = useState(false);
  const accordineHandle = (event, obj) => {
    setAccordineView((pre) => !pre);
    if (accordineView === false) {
      expandHnadler(event, obj);
    }
    if (accordineView === true) {
      hideExpand();
    }
  };

  return (
    <tr key={obj.id}>
      <td data-label="Select" onClick={onCheck}>
        <input
          type="checkbox"
          name={obj.id}
          checked={obj.select}
          onChange={(event) => checkedHandler(event, obj)}
        />
      </td>
      <td data-label="First Name">{obj.firstName}</td>
      <td data-label="Last Name">{obj.lastName}</td>
      <td data-label="Date of Birth">{obj.age}</td>
      <td data-label="Email">{obj.email}</td>
      <td className="number" data-label="Number">
        {obj.number}
      </td>
      <td className="address" data-label="Address">
        {obj.address}
      </td>
      <td className="update" data-label="Update">
        <FontAwesomeIcon
          icon={faPencil}
          onClick={(event) => updateFormHandler(event, obj.id)}
        />
      </td>
      <td>
        {" "}
        <FontAwesomeIcon
          icon={accordineView === false ? faChevronDown : faChevronUp}
          onClick={(event) => accordineHandle(event, obj)}
        />
      </td>
    </tr>
  );
};

export default TableRow;
