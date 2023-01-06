import React from "react";
import HomeView from "../Views/homeView/homeView";
import NoUserView from "../Views/nouserView";
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged} from "firebase/auth";
import {  signingOut, authChange } from "../firebase/firebaseModel";
import { useState , useEffect } from "react";

export default
function Home(props){
    const navigate = useNavigate();

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(props.model.currentUser);


/*     function AuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
    
      useEffect(() => {
        const subscriber = authChange(AuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null; */

      function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    function observerACB(){   
        setUser(props.model.currentUser)
        }
  
  
    React.useEffect(() => {
        if (user) navigate("/home");
      }, [user]);

    function redirectHomeACB(){
        navigate('/home')
    }

    function signingOutHome(){
        signingOut(redirectHomeACB)
    }

    if (!user) {
        return <NoUserView />
    }
    else{
        return <div>
            <HomeView
            onClickSignOut = {signingOutHome}/>
        </div>
    }
}