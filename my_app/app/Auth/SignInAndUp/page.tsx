"use client"

import {useState, ChangeEvent} from "react"
import * as Yup from "yup"
import useClientAuth from "../../Hooks/useClientAuth"
import Image from "next/image"

interface FormData {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function PageSignInAndUp() {
  const {user, isFetched, signUp, signIn, loginWithGoogle, redirectIfAuthenticated} = useClientAuth();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<Partial<FormData>>({})
  const [authError, setAuthError] = useState<string>("");

  const handleFormChange = () => {
    setIsSignUpActive(!isSignUpActive)
    setFormData({email: "", password: "", firstName: "", lastName: ""});
    setError({});
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSignUp = () => {
    signUpSchema.validate(formData, { abortEarly: false })
      .then(() => {
        signUp(formData.email, formData.password, formData.firstName, formData.lastName);
      })
      .catch((ValidationErrors: Yup.ValidationError) => {
        const formattedErrors: Partial<FormData> = {};
        ValidationErrors.inner.forEach((error) => {
          formattedErrors[error.path as keyof FormData] = error.message;
        });
        setError(formattedErrors);
      });
  }

  const handleSignIn = async () => {
    try {
      setAuthError("");
      setError({});
      const validData = await signInSchema.validate({ email: formData.email, password: formData.password }, { abortEarly: false });
      console.log("Attempting to sign in with:", validData);
      await signIn(formData.email, formData.password);
    } catch (err: any) {
      console.error("Sign in error:", err);
      if (err instanceof Yup.ValidationError) {
        const formattedErrors: Partial<FormData> = {};
        err.inner.forEach((error) => {
          formattedErrors[error.path as keyof FormData] = error.message;
        });
        setError(formattedErrors);
      } else {
        setAuthError(err.code === "auth/invalid-credential" ? "Invalid email or password" : "An error occurred during sign in");
      }
    }
  }

  if(isFetched) {
    return <h2>Loading...</h2>;
  }

  redirectIfAuthenticated();

  return (
    <section className='h-screen w-full flex items-center justify-center flex-col gap-2'>
      <form className="flex flex-col gap-2 bg-slate-50 p-5 rounded-md shadow-md">
        <h1 className="text-center text-gray-900 text-4xl mb-3 font-bold">
          {isSignUpActive ? "Sign up" : "Sign in"}
        </h1>

        {isSignUpActive && (
          <>
            <label htmlFor="firstName" className="text-slate-900">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              value={formData.firstName} 
              onChange={handleInputChange} 
              className="h-10 border border-slate-900 rounded-md p-4" 
            />
            {error.firstName && <p className="text-red-500">{error.firstName}</p>}

            <label htmlFor="lastName" className="text-slate-900">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              id="lastName" 
              value={formData.lastName} 
              onChange={handleInputChange} 
              className="h-10 border border-slate-900 rounded-md p-4" 
            />
            {error.lastName && <p className="text-red-500">{error.lastName}</p>}
          </>
        )}

        <label htmlFor="email" className="text-slate-900">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          value={formData.email} 
          onChange={handleInputChange} 
          className="h-10 border border-slate-900 rounded-md p-4" 
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <label htmlFor="password" className="text-slate-900">Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          value={formData.password} 
          onChange={handleInputChange} 
          className="h-10 border border-slate-900 rounded-md p-4" 
        />
        {error.password && <p className="text-red-500">{error.password}</p>}
        {authError && <p className="text-red-500 mt-2 text-center">{authError}</p>}

        <button 
          type="button" 
          onClick={isSignUpActive ? handleSignUp : handleSignIn} 
          className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          {isSignUpActive ? "Sign up" : "Sign in"}
        </button>

        <button 
          type="button" 
          onClick={handleFormChange} 
          className="text-red-500 hover:text-red-900 transition-colors"
        >
          {isSignUpActive ? "Already have an account? Log in": "No account? Create an account"}
        </button>
      </form>

      <button 
        type="button" 
        onClick={loginWithGoogle} 
        className="bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 p-2 flex items-center gap-2 transition-colors mt-4"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
          </g>
        </svg>
        <span>{isSignUpActive ? "Sign up with Google": "Sign in with Google"}</span>
      </button>
    </section>
  )
}
