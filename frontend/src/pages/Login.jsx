import { useForm } from "react-hook-form";
import'../styles/Lohin.css';
import Banner from '../components/Banner';

function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Banner />
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='login_div'>
      <div>
      <h2 className='login'>Login</h2>
        <label>Email</label><br/>
        <input className="inputPart"
          type="email"
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address!"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label><br/>
        <input className="inputPart"
          type="password"
          {...register("password", {
            validate: value => value !== "admin" || "NiceTry!"
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
      </div>
    </form>
    </div>
  );
}

export default Login;
