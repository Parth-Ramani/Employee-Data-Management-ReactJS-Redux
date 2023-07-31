import React from 'react';
import classes from './TableExpand.module.css'

function TableExpand({obj}) {

  return  <tr>
  <td colSpan="7" className={classes.expandContainer}>
    <div className={classes.head}>
      <h2>
   {obj.firstName} {obj.lastName}
      </h2>
    </div>
    <div className={classes.expand}>
      <p className={classes.label}>FIRST NAME</p>
      <p className={classes.employeename}>{obj.firstName}</p>
      <p className={classes.label}>LAST NAME</p>
      <p className={classes.employeename}>{obj.lastName}</p>
      <p className={classes.label}>DATE OF BIRTH</p>
      <p>{obj.age}</p>
      <p className={classes.label}>NUMBER</p> <p>{obj.number}</p>
      <p className={classes.label}>EMAIL</p> <p>{obj.email}</p>
      <p className={classes.label}>ADDRESS</p>
      <p>{obj.address}</p>
    </div>
  </td>
</tr>;
}

export default TableExpand;
