import React from "react";
import HomeView from "../Views/homeView/homeView";
import NoUserView from "../Views/nouserView";
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged} from "firebase/auth";
import { auth, signingOut } from "../firebase/firebaseModel";
import { useState , useEffect } from "react";

export default
function Home(props){
    const navigate = useNavigate();

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(props.model.currentUser);


/*     if (handleAuthState) {
        if (initializing) setInitializing(false)
    }
    useEffect(() => {
        const subscriber = handleAuthState();
        return subscriber; // unsubscribe on unmount
      }, []);

    
    if (initializing) return null; */


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