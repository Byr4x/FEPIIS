import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SignInput from "../components/auth/SignInput";

function LoginPage() {
  const {register, handleSubmit, formState: {errors}} = useForm()

  const {signin, errors: signinErrors} = useAuth()

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Login</h1>
        {
          signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2" key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <input type="text" {...register("usernameOrEmail", {required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Username or Email"/>
          {errors.usernameOrEmail && errors.usernameOrEmail.type === "required" && (<p className="text-red-500">Username or Email is required</p>)}
          <input type="password" {...register("password", {required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password"/>
          {errors.password && errors.password.type === "required" && (<p className="text-red-500">Password is required</p>)}
          <button type="submit">Login</button>
        </form> 

        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to="/fepi/auth/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
  
export default LoginPage;