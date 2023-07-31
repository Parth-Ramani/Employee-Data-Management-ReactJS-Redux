import React, { Fragment, useState } from "react";
import "./UpdateForm.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
const UpdateForm = ({ closeUpdateForm, obj }) => {
  const fetchdata = JSON.parse(localStorage.getItem("employee"));
  const employee = fetchdata === null ? [] : fetchdata;
  const dispatch = useDispatch();
  const [isValue, setIsValue] = useState({
    firstName: obj.firstName,
    lastName: obj.lastName,
    age: obj.age,
    number: obj.number,
    email: obj.email,
    address: obj.address,
    id: obj.id,
  });
  const [isVaild ,setIsValid] =useState({
    firstNameHasError : false ,
    lastNameHasError: false,
    ageHasError:false,
    numberHasError:false,
    emailHasError:false,
    addressHasError:false,
  })

  const firstNameChangeHandler = (e) => {
    // console.log(e.target.value);
    if (e.target.value.trim() === '') {
     setIsValid({...isVaild ,firstNameHasError :true})
    }else{
      setIsValid({...isVaild ,firstNameHasError :false})
    }
    setIsValue({ ...isValue, firstName: e.target.value });
  };
  const lastNameChangeHandler = (e) => {
    if (e.target.value.trim() === '') {
      setIsValid({...isVaild ,lastNameHasError :true})
     }else{
      setIsValid({...isVaild ,lastNameHasError :false})
    }
    setIsValue({ ...isValue, lastName: e.target.value });
  };
  const ageChangeHandler = (e) => {
    if (e.target.value.trim() === '') {
      setIsValid({...isVaild ,ageHasError :true})
     }else{
      setIsValid({...isVaild ,ageHasError :false})
    }
    setIsValue({ ...isValue, age: e.target.value });
  };
  const numberChangeHandler = (e) => {
    if (e.target.value.length !== 10) {
      setIsValid({...isVaild ,numberHasError :true})
     }else{
      setIsValid({...isVaild ,numberHasError :false})
    }
    setIsValue({ ...isValue, number: e.target.value });
  };
  const emailChangeHandler = (e) => {
    if (e.target.value.trim() === '') {
      setIsValid({...isVaild ,emailHasError :true})
     }else{
      setIsValid({...isVaild ,emailHasError :false})
    }
    setIsValue({ ...isValue, email: e.target.value });
  };
  const addressChangeHandler = (e) => {

    if (e.target.value.trim() === '') {
      setIsValid({...isVaild ,addressHasError :true})
     }else{
      setIsValid({...isVaild ,firstNameHasError :false})
    }
    setIsValue({ ...isValue, address: e.target.value });
  };
 
    
  const submitHandler = (event) => {
    event.preventDefault();
    if (isVaild.firstNameHasError === true || isVaild.lastNameHasError === true ||isVaild.ageHasError === true || isVaild.numberHasError === true || isVaild.emailHasError === true || isVaild.addressHasError === true) {
      return
    }
    if(employee.filter(cur => cur.number === isValue.number && cur.number !== obj.number ).length > 0 || employee.filter(cur => cur.email === isValue.email && cur.email !== obj.email).length > 0 ){
      return
    }  
    const newDataArray = employee.map(
      (obj) => [isValue].find((o) => o.id === obj.id) || obj
    );
    localStorage.setItem("employee", JSON.stringify(newDataArray));
    dispatch({ type: "EDIT", payload: newDataArray });
     setIsValue({
      firstName:"",
      lastName: "",
      age: "",
      number: "",
      email: "",
      address: "",
      id: "",
    })
    closeUpdateForm();
  };
  const firstnameClasses = isVaild.firstNameHasError
  ? "form-control invalid"
  : "form-control";
const lastnameClasses = isVaild.lastNameHasError
  ? "form-control invalid"
  : "form-control";
const ageClasses = isVaild.ageHasError ? "form-control invalid" : "form-control";

const numberClasses = isVaild.numberHasError
  ? "form-control invalid"
  : "form-control";
const emailClasses = isVaild.emailHasError ? "form-control invalid" : "form-control";
const addressClasses = isVaild.addressHasError
  ? "form-control invalid"
  : "form-control";

  return (
    <Fragment>
      <tr>
        <td colSpan="6">
          <div className="overlay"></div>
          <form onSubmit={submitHandler} className="form">
            <div className={firstnameClasses}>
              <input
                onChange={firstNameChangeHandler}
                value={isValue.firstName ?? ""}
                placeholder="First Name"
              />
            </div>
            {isVaild.firstNameHasError && (
            <p className="error-text"> Please enter valid First Name </p>
          )}
            <div className={lastnameClasses}>
              <Input
                onChange={lastNameChangeHandler}
                value={isValue.lastName || ""}
                placeholder="Last Name"
              />
            </div>
            {isVaild.lastNameHasError && (
            <p className="error-text"> Please enter valid last Name </p>
          )}
            <div className={ageClasses}>
              <Input
                type="date"
                onChange={ageChangeHandler}
                value={isValue.age || ""}
                placeholder="Age"
              />
            </div>
            {isVaild.ageHasError && (
            <p className="error-text"> Please enter valid Age </p>
          )}
            <div className={numberClasses}>
              <Input
                type="number"
                onChange={numberChangeHandler}
                value={isValue.number || ""}
                placeholder="Ph. Number"
              />
            </div>
            {isVaild.numberHasError && (
            <p className="error-text"> Please enter valid Phone number </p>
          )}
          {employee.filter(cur => cur.number === isValue.number &&  cur.number !== obj.number).length > 0 ? <p className="error-text"> Phone number already exist </p> : <></>}
            <div className={emailClasses}>
              <Input
                type="email"
                onChange={emailChangeHandler}
                value={isValue.email || ""}
                placeholder="Email"
              />
            </div>
            {isVaild.emailHasError && (
            <p className="error-text"> Please enter valid Email </p>
          )}
          {employee.filter(cur => cur.email === isValue.email &&  cur.email !== obj.email).length > 0 ? <p className="error-text"> Email already exist </p> : <></>}
            <div className={addressClasses}>
              <textarea
                placeholder="Address..."
                onChange={addressChangeHandler}
                value={isValue.address || ""}
              ></textarea>
            </div>
            {isVaild.addressHasError && (
            <p className="error-text"> Please enter valid Address </p>
          )}  
           
            <div>
              <div></div>
              <div className="button_div">
                <Button type="submit">Add</Button>
                <Button type="button" onClick={closeUpdateForm}>
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </form>
        </td>
      </tr>
    </Fragment>
  );
};

export default UpdateForm;
