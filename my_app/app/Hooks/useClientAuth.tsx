import {useState, useEffect} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, updateProfile} from "@firebase/auth";
import {auth} from "../db/firebaseConfig.js";
import { useRouter } from "next/navigation";


const provider = new GoogleAuthProvider();


const useClientAuth = () => {
const [user, setUser] = useState<User | null>(null);
const [isFetched, setIsFetched] = useState(true);
const router = useRouter();

    const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`
            });
            setUser(userCredential.user);
            setIsFetched(false);
            router.push("/Auth/Dashboard");
        } catch(error) {
            console.log("error signUp", error)
        }
    }
    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsFetched(false);
            router.push("/Auth/Dashboard");
        } catch (error: any) {
            console.error("Error signing in:", error);
            throw error;
        }
    }
const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if(user){
        router.push("/Auth/Dashboard");
    }
}
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user:User | null) => {
        if (user) {
            setUser(user);
            setIsFetched(false);
        } else {
            setUser(null);
            setIsFetched(false);
        }
    });
    return unsubscribe;
}, [])
const redirectIfAuthenticated = () => {
    if(user){
        router.push("/Auth/Dashboard");
    }
};

return {user, isFetched, signUp, signIn, loginWithGoogle, redirectIfAuthenticated};



}

export default useClientAuth;








