import { authChange } from "./firebase/firebaseModel";

class AuthModel{
   
    constructor(){
        this.user = {};
        this.observers=[];
        this.currentUser = undefined;
       this.addAuthObserver();
    }

    addObserver(addObserverCB){
        this.observers = [...this.observers, addObserverCB]
    }

    removeObserver(observerToRemove){
        function removeObserverCB(observer){
            return observerToRemove !== observer;
        }
        this.observers = [...this.observers].filter(removeObserverCB)
    }

    notifyObservers(payload){
        try {
            this.observers.forEach(function invokeObserverCB(obs){obs(payload);})
          }
        catch(err) {
            console.error(err)
          }
    }

     addAuthObserver(){
            function authUserACB(user){
           // run off() functions for firebase listeners + try catch for user presence

            this.currentUser = user;
            if(this.currentUser){

            }
            this.notifyObservers()
        }
        authChange(authUserACB.bind(this))

    }   

/*     setUser(user){
        this.user = user
    } */

}


export default AuthModel;
