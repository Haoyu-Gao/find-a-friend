import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB90H7qY7ClIDn4Jn7pQN4ym5QiEAVY59A",
    authDomain: "find-a-friend-c1432.firebaseapp.com",
    databaseURL: "https://find-a-friend-c1432-default-rtdb.firebaseio.com",
    projectId: "find-a-friend-c1432",
    storageBucket: "find-a-friend-c1432.appspot.com",
    messagingSenderId: "418576865834",
    appId: "1:418576865834:web:edb1db2150b55c852f8153"
};

app.initializeApp(firebaseConfig);

class Firebase {
    constructor(){
        this.database = app.database();
        this.storage = app.storage();
        this.auth = app.auth();
    }

    debugError(error) {
        alert(`${error.code} error has occurred - ${error.message}`);
    }

    writeDatabase(root, json) {
        this.database.ref(root).set(json)
            .catch(this.debugError);

    }

    readDatabase(root, event, callback) {
        this.database.ref(root).on(event, callback);
    }

    onUserActive(callback, fallback=null) {
        this.auth.onAuthStateChanged((userInstance) => {
            if(userInstance != null){
                callback(userInstance.uid)
            }
            else if(fallback != null){
                fallback();
            }
        });
    }
}

export default Firebase;
