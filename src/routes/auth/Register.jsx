import { useForm } from "react-hook-form";
import { TextField, Button, Hidden } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Register() {
  const validationSchema = yup.object().shape({
    fullname: yup.string().required('This field is required.'),
    email: yup.string().required('This field is required.').email('Email is invalid.'),
    username: yup.string().required('This field is required.'),
    password: yup.string().required('This field is required.').min(6, 'Password must be at least 6 characters.').max(30, 'Password must be less than 30 characters'),
    confirm: yup.string().required('This field is required.').oneOf([yup.ref('password')], 'Passwords must be match.')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    reset();
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
          <h1 className="w-full my-8 text-primary text-4xl text-center">Sign up</h1>

          <TextField
            color="primary"
            variant="outlined"
            label="Full Name"
            type="text"
            sx={{
              margin: "8px 0"
            }}
            {...register('fullname')}
            helperText={errors.fullname?.message}
            error={errors.fullname?.message ? true : false}
            required
          />

          <TextField
            color="primary"
            variant="outlined"
            label="Email Address"
            type="text"
            sx={{
              margin: "8px 0"
            }}
            {...register('email')}
            helperText={errors.email?.message}
            error={errors.email?.message ? true : false}
            required
          />

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

          <TextField
            color="primary"
            variant="outlined"
            label="Confirm Password"
            type="password"
            sx={{
              margin: "8px 0"
            }}
            {...register('confirm')}
            helperText={errors.confirm?.message}
            error={errors.confirm?.message ? true : false}
            required
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              width: "100%",
              height: "48px",
              margin: "24px 0 12px 0"
            }}
          >
            Register
          </Button>

          <a
            href={'/auth/login'}
            className="w-full text-center mt-6 hover:underline hover:text-orange-500"
          >
            Already have an account?
          </a>
        </form>
      </div>
    </main>
  )
}