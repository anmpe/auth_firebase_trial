import LoginView from "../Views/loginView/loginView";
import React from "react";
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged} from "firebase/auth";
import { signIn, auth } from "../firebase/firebaseModel";


function LogIn(props){

    const navigate = useNavigate();
    const [email, setEmail ] = React.useState(props.model.email) // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState(props.model.password)
    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)
    
    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    function observerACB(){   
        setEmail(props.model.email);    // when notified, update state with current value
        setPassword(props.model.password);
        setUserLogin(props.model.currentUser)
        }
  
  
    React.useEffect(() => {
        if (userLoggedIn) navigate("/home");
      }, [userLoggedIn]);

    
    function signInACB(){
        signIn(email, password)
        //  should I be using resolvePromise here in order to take care of the rendering/firebase issues that might come with unauth user
        navigate("/home")
    }

    function setEmailACB(emailInput){ //functionn created by me in order to keep track of the custom event
        setEmail(emailInput)
    }

    function setPasswordACB(passwordInput){
        setPassword(passwordInput)
    }

    return <div>
            <LoginView onLogin = {signInACB} 
            sendEmail = {setEmailACB} sendPassword = {setPasswordACB}/>
    </div>
}
// observer function to check if an user is signed out or logged in before showcasing the page

export default LogIn;
