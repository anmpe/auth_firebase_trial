import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, get, onValue, push, off, update, query, orderByChild, equalTo, onChildAdded } from "firebase/database";
import firebaseConfig from "./firebaseConfig";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const REF = "authdb"


function authChange(model){
    onAuthStateChanged(auth, (user) =>{
        if (user) {
            model.setUser(user)
          } else {
            //return false
          }
    })
}


function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {  // export
        // Signed in 
        const user = userCredential.user;
        console.log("signed in")
        // ...
        },    
        {
            onlyOnce: true
          })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert(errorCode)
        })
        ;
        return true;
        //get(child(ref(db), `users/publicUsers/${username}`))
    }

    function signingOut(func) {
        signOut(auth).then(() => {
            //off(onValue) // maybe just off() or off(db/app),either on this row or below func()
            func()
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log("An error happened", error)
        });
        return true;
    }

    function updateAccount(username) {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: username
        }).then(() => {
            console.log("completed")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorCode)
        });
    }
    
    function createAccount(email, password, username){
        const userREF = query(ref(db, REF + "/users/publicUsers/"),orderByChild("username"), equalTo(username))
        onValue(userREF, (snapshot) =>{
            if (snapshot.val() === null) {
                createUserWithEmailAndPassword(auth, email, password, username)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log("created account")
                        set(ref(db, REF + "/users/publicUsers/" + username), {
                            username: username,
                            games: [null],
                            score: 0,
                            profilePictureSrc: "https://cdn-icons-png.flaticon.com/128/4128/4128176.png"
                        })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                        alert(errorCode)
                    });
            }
            else {
                const errorUsername = "This username is already being used!"
                console.log(errorUsername)
                alert(errorUsername)
            }
        },
        {
            onlyOnce: true
          }
        )
        return true;
    }

export {app, db, REF, auth, signIn, updateAccount, createAccount, signingOut, authChange}