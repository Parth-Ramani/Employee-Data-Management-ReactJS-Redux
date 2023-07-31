import React,{useState} from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import "./Form.css";
import { useDispatch } from "react-redux";
const Form = (props) => {
  const fetchdata = JSON.parse(localStorage.getItem("employee"));
  const employee = fetchdata === null ? [] : fetchdata;
  const [formTouch, setFormToch] = useState({
    firstNameIsTouch: false,
    lastNameIsTouch: false,
    ageIsTouch: false,
    numberIsTouch: false,
    emailIsTouch: false,
    addressIsTouch: false,
  })
  const [isValue, setValue] = useState({
    firstNameValue : "",
    lastNameValue: "",
    ageValue: "" , 
    numberValue:"",
    emailValue:"",
    addressValue:"",
  })
  const [isValid, setIsValid] = useState({
    firstNameValid:true,
    lastNameValid: true,
    ageValid: true , 
    numberValid:true,
    emailValid:true,
    addressValid:true,
  })
  const [reEntry , setReEntry] = useState({
    reEntredNumber : false,
    reEntredemail : false
  })
  const firstNameBlurHandler =(e) =>{
    setIsValid({...isValid,firstNameValid:  isValue.firstNameValue.trim() !== "" ? false : true })
    setFormToch({...formTouch,firstNameIsTouch : true})
  }
  const lastNameBlurHandler =() =>{
    setIsValid({...isValid,lastNameValid:  isValue.lastNameValue.trim() !== "" ? false : true })
    setFormToch({...formTouch,lastNameIsTouch : true})
  }
  const ageBlurHandler =() =>{
    setIsValid({...isValid,ageValid:  isValue.ageValue.trim() !== "" ? false : true })
    setFormToch({...formTouch,ageIsTouch : true})
  }
  const numberBlurHandler =() =>{
    setIsValid({...isValid,numberValid:  isValue.numberValue.length === 10 ? false : true })
  setFormToch({...formTouch,numberIsTouch : true})
  setReEntry({...reEntry, reEntredNumber:employee.filter(obj => obj.number === isValue.numberValue).length > 0 ? true : false })
  }
  const emailBlurHandler =() =>{
    setIsValid({...isValid,emailValid:  isValue.emailValue.trim() !== "" ? false : true })
    setFormToch({...formTouch,emailIsTouch : true})
    setReEntry({...reEntry, reEntredemail:employee.filter(obj => obj.number === isValue.email).length > 0 ? true : false })
  }
  const addressBlurHandler =() =>{
    setIsValid({...isValid,addressValid:  isValue.addressValue.trim() !== "" ? false : true })
    setFormToch({...formTouch,addressIsTouch : true})
    
  }
  let formIsValid = false
     if (
    !isValid.firstNameValid &&
     ! isValid.lastNameValid &&
     ! isValid.ageValid &&
     ! isValid.numberValid &&
     ! isValid.emailValid &&
     ! isValid.addressValid
    ) {
      formIsValid = true
    } 
  const update =[...employee]

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    setFormToch({
      firstNameIsTouch: true,
      lastNameIsTouch: true,
      ageIsTouch: true,
      numberIsTouch: true,
      emailIsTouch: true,
      addressIsTouch: true,
    })
  setIsValid({
    firstNameValid:  isValue.firstNameValue.trim() !== "" ? false : true,
    lastNameValid:  isValue.lastNameValue.trim() !== "" ?  false : true,
    ageValid:  isValue.ageValue.trim() !== "" ?  false : true,
    numberValid:  isValue.numberValue.trim() !== "" ?  false : true,
    emailValid:  isValue.emailValue.trim() !== "" ?  false : true,
    addressValid:  isValue.addressValue.trim() !== "" ? false : true
  })
if(employee.filter(obj => obj.number === isValue.numberValue).length > 0 || employee.filter(obj => obj.email === isValue.emailValue).length > 0 ){
  return
}
  if (!formIsValid) {
    return;
  }

    let resdata = {
      firstName: isValue.firstNameValue,
      lastName: isValue.lastNameValue,
      age: isValue.ageValue,
      number: isValue.numberValue,
      email: isValue.emailValue,
      address: isValue.addressValue,
      id: Math.random(),
      select: false,
    };
    
    update.push(resdata);
    localStorage.setItem("employee", JSON.stringify(update));
    dispatch({ type: "ADD", payload: update });

  setValue({
    firstNameValue : "",
    lastNameValue: "",
    ageValue: "" , 
    numbervalue:"",
    emailValue:"",
    addressValue:"",
  })
    props.showFormHandler();
  };
  const firstNameValid = formTouch.firstNameIsTouch &&  isValid.firstNameValid
  const lastNameValid = formTouch.lastNameIsTouch && isValid.lastNameValid
  const ageValid = formTouch.ageIsTouch && isValid.ageValid
  const numberValid = formTouch.numberIsTouch &&  isValid.numberValid
  const emailValid = formTouch.emailIsTouch && isValid.emailValid
  const addressValid =  formTouch.addressIsTouch && isValid.addressValid
  const firstnameClasses =  firstNameValid
    ? "form-control invalid"
    : "form-control";
  const lastnameClasses =  lastNameValid
    ? "form-control invalid"
    : "form-control";
  const ageClasses =  ageValid ? "form-control invalid" : "form-control";

  const numberClasses = numberValid
    ? "form-control invalid"
    : "form-control";
  const emailClasses =  emailValid ? "form-control invalid" : "form-control";
  const addressClasses =  addressValid
    ? "form-control invalid"
    : "form-control";
  return (
    <>
      <div className="overlay"></div>
      <form onSubmit={submitHandler} className="form">
        <div className={firstnameClasses}>
          <Input
            onChange={(e)=>setValue({...isValue,firstNameValue: e.target.value})}
            value={isValue.firstNameValue}
            onBlur={firstNameBlurHandler}
            placeholder="First Name"
          />
          {firstNameValid && (
            <p className="error-text"> Please enter firstName </p>
          )}
        </div>
        <div className={lastnameClasses}>
          <Input
            onChange={(e)=>setValue({...isValue,lastNameValue: e.target.value})}
            onBlur={lastNameBlurHandler}
            placeholder="Last Name"
          />
          {lastNameValid && (
            <p className="error-text"> Please enter lastName </p>
          )}
        </div>
        <div className={ageClasses}>
          <Input
            type="date"
            onChange={(e)=>setValue({...isValue,ageValue: e.target.value}) }
            value={isValue.ageValue}
            onBlur={ageBlurHandler}
            placeholder="Age"
          />
          {ageValid && (
            <p className="error-text"> Please enter valid age! </p>
          )}
        </div>
        <div className={numberClasses}>
          <Input
            type="number"
            onChange={(e)=>setValue({...isValue,numberValue: e.target.value}) }
            value={isValue.numberValue}
            onBlur={numberBlurHandler}
            placeholder="Ph. Number"
          />
          {numberValid && (
            <p className="error-text"> Please enter 10(ten) digit number! </p>
          )}
           {employee.filter(obj => obj.number === isValue.numberValue).length > 0 ? <p className="error-text"> Phone number already exist </p> :""}
        </div>
        <div className={emailClasses}>
          <Input
            type="email"
            onChange={(e)=>setValue({...isValue,emailValue: e.target.value}) }
            value={isValue.emailValue}
            onBlur={emailBlurHandler}
            placeholder="Email"
          />
          {emailValid && (
            <p className="error-text"> Please enter Email include "@" </p>
          )}
              {employee.filter(obj => obj.email === isValue.emailValue).length > 0 ? <p className="error-text"> Email already exist </p> :""}
        </div>
        <div className={addressClasses}>
          <textarea
            placeholder="Address..."
            onChange={(e)=>setValue({...isValue,addressValue: e.target.value}) }
            value={isValue.addressValue}
            onBlur={addressBlurHandler}
          ></textarea>
          {addressValid && (
            <p className="error-text"> Please enter Address </p>
          )}
        </div>
        <div>

          <div></div>
          <div className="button_div">
            <Button type="submit" disabled={!formIsValid}>
              Add
            </Button>
            <Button type="button" onClick={props.showFormHandler}>
              Cancel{" "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
