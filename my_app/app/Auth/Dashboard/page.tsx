"use client"


import {signOut} from "firebase/auth"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
import {auth} from "../../db/firebaseConfig"
import useClientAuth from "../../Hooks/useClientAuth"

export default function pageDashboard() {
  const {user,redirectIfAuthenticated} = useClientAuth();
  useEffect(() => {
    redirectIfAuthenticated();
  }, [user]);
  
const router = useRouter();

const handleSignOut = () => {
  signOut(auth)
  .then(() => console.log("Signed out successfully"))
  .catch((error) => console.error(error));
  router.push("/");

}






    return (
      <>
          {user && (
            <div className="h-screen w-full flex items-center justify-center flex-col gap-4">
              <h1 className="text-4xl uppercase font-black">Dashboard</h1>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome, {user?.displayName || 'User'}!</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <button 
                type="button" 
                onClick={handleSignOut} 
                className="bg-slate-900 px-6 py-2 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
          
      </>
    )
  }