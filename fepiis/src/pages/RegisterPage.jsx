import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"

function RegisterPage() {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const {signup, user, errors: registerErrors} = useAuth()

  console.log(user)

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return ( 
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-2xl font-bold">Registro de Admins</h1>
        {
          registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2" key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <input type="text" {...register("username", {required:true, minLength:4})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Username"/>
          {errors.username && errors.username.type === "required" && (<p className="text-red-500">Username is required</p>)}
          {errors.username && errors.username.type === "minLength" && (<p className="text-red-500">Username must be at least 4 characters long</p>)}
          <input type="text" {...register("email", {required:true, pattern:/^\S+@\S+$/i })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Email"/>
          {errors.email && errors.email.type === "required" && (<p className="text-red-500">Email is required</p>)}
          {errors.email && errors.email.type === "pattern" && (<p className="text-red-500">Invalid email format</p>)}
          <input type="password" {...register("password", {required:true, minLength:8})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password"/>
          {errors.password && errors.password.type === "required" && (<p className="text-red-500">Password is required</p>)}
          {errors.password && errors.password.type === "minLength" && (<p className="text-red-500">Password must be at least 8 characters long</p>)}
          <button type="submit">Register</button>
        </form> 

        <p className="flex gap-x-2 justify-between">
          Already have an account? <Link to="/fepi/auth/login" className="text-sky-500">Login</Link>
        </p>
      </div>
    </div> 
  )
}
  
export default RegisterPage