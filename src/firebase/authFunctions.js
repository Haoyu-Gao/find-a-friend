import Firebase from './firebase';

class AuthFunctions extends Firebase {
    signUp(firstname, lastname, email, pwd) {
        // Create a user on firebase
        // Write the user's information into the databse
        // Catch any errors thrown by firebase
        this.auth.createUserWithEmailAndPassword(email, pwd)
            .then((userCred) => {
                this.writeDatabase(userCred.user.uid, {
                    name: {
                        first: firstname,
                        last: lastname
                    },
                    email: email, 
                    profile_pic: "https://www.google.com/search?q=default+profile+picture&rlz=1C1CHWL_zh-CNHK942HK942&sxsrf=ALeKk02YCAiqiF7oHKP6iAtiReSV1XlZEA:1616650996082&tbm=isch&source=iu&ictx=1&fir=YIG-EMKSk-GO4M%252Ce6gEsA9KT4s-2M%252C_&vet=1&usg=AI4_-kQLpVjLJH57ppb_4nDQa-KK9L-bzQ&sa=X&ved=2ahUKEwi7nuOi3srvAhUUM94KHRs7AOQQ9QF6BAgTEAE#imgrc=YIG-EMKSk-GO4M",
                    posts: {},
                    following: {
                        [userCred.user.uid]: 0
                    }
                });
            })
            .catch(this.debugError);

    }
    logIn(email, pwd) {
        // Log the user in to firebase
        // Catch any errors thrown
        this.auth.signInWithEmailAndPassword(email, pwd)
            .catch(this.debugError);
    }

    logOut(callback) {
        this.auth.signOut()
            .then(callback)
            .catch(this.debugError);
    }
}

const authFunctions = new AuthFunctions();
export default authFunctions;