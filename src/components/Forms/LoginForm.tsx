import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { validateEmail, validateRequired } from '../../utils/validation';
import { login } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useData } from '../../context/DataContext';
import { Paths } from '../../routes/pats';

const LoginForm = () => {
  const { navigateToSpecificRoute, success } = useData()
  const dispatch = useDispatch()
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: validateEmail("Email is required", "Invalid Email"),
      password: validateRequired("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values
      login(email, password, dispatch, navigateToSpecificRoute, success, "Logged in successfully")
    }
  })
  return (
    <form onSubmit={loginFormik.handleSubmit}>
      <div>
        <h2 className="fs_banner_larg">WELCOME</h2>
        <p className="my_4 fs_sm">We are glad to see you back with us</p>
      </div>
      <div>
        <div>
          <CustomInput
            onChange={loginFormik.handleChange}
            name="email"
            value={loginFormik.values.email}
            error={loginFormik.errors.email}
            touched={loginFormik.touched.email}
            placeholder="User email" />
          <CustomInput
            onChange={loginFormik.handleChange}
            name="password"
            value={loginFormik.values.password}
            error={loginFormik.errors.password}
            touched={loginFormik.touched.password}
            className="mt_4" placeholder="Password" />
          <CustomButton className="mt_4 btn_secondary w_100 br_3 fs_sm" label="LOGIN" />
        </div>
      </div>
      <p className='ta_center fs_md mt_4 mb_4'>If you don't have an account <span className='blue pointer td_underline' onClick={() => navigateToSpecificRoute(Paths.SIGN_UP)}>Sign up</span></p>
    </form>
  )
}

export default LoginForm