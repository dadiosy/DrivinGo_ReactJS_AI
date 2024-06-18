import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { TextField, Checkbox, Button, Hidden } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/auth.action";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    username: yup.string().required('This field is required.'),
    password: yup.string().required('This field is required.')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    reset();
    dispatch(loginUser());
    navigate('/');
  }

  return (
    <main className="flex w-full h-screen bg-primary text-secondary">
      <Hidden mdDown>
        <div
          className="flex flex-col justify-center items-center w-full h-full p-8"
          style={{
            backgroundImage: "url(/assets/banner.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "fade_anim 1s"
          }}
        >
          <img alt="logo" src={'/assets/logos/long_secondary.png'} width={473} height={130} className="fade-down" />
          <p className="text-white text-center text-4xl my-4 fade-up">Bridging Communication Barriers</p>
        </div>
      </Hidden>

      <div className="flex justify-center items-center w-full xl:w-2/3 h-full bg-white shadow-2xl">
        <form className="flex flex-col w-96 fade-right" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="w-full my-8 text-primary text-4xl text-center">Sign in</h1>

          <TextField
            color="primary"
            variant="outlined"
            label="Username"
            type="text"
            sx={{
              margin: "8px 0"
            }}
            {...register('username')}
            helperText={errors.username?.message}
            error={errors.username?.message ? true : false}
            required
          />

          <TextField
            color="primary"
            variant="outlined"
            label="Password"
            type="password"
            sx={{
              margin: "8px 0"
            }}
            {...register('password')}
            helperText={errors.password?.message}
            error={errors.password?.message ? true : false}
            required
          />

          <div className="flex justify-between items-center w-full my-2">
            <div className="flex justify-center items-center">
              <Checkbox /> Remember Me
            </div>

            <a
              href={'/auth/reset-password'}
              className="hover:underline hover:text-orange-600"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              width: "100%",
              height: "48px",
              margin: "12px 0"
            }}
          >
            Login
          </Button>

          <a
            href={'/auth/register'}
            className="w-full text-center mt-6 hover:underline hover:text-orange-500"
          >
            Don&apos;t have an account?
          </a>
        </form>
      </div>
    </main>
  )
}