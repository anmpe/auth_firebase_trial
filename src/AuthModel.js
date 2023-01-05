import { authChange } from "./firebase/firebaseModel";

class AuthModel{
   
    constructor(){
        this.user = {};
        this.observers=[];
        this.currentUser = undefined;
        //this.addAuthObserver();
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

/*      addAuthObserver(){
            authChange(this)
            this.notifyObservers()
    }   */

    setUser(user){
        this.currentUser = user
    }

}


export default AuthModel;
