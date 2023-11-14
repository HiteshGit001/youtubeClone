import { Col, Row } from 'antd'
import CustomInput from '../custom/CustomInput'
import CustomButton from '../custom/CustomButton'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { validateEmail, validateFirstName, validateRequired } from '../../utils/validation';
import { axiosPost } from '../../utils/https.server';
import { SIGN_UP_URL } from '../../api/api';
import { HttpStatusCode } from 'axios';
import { useData } from '../../context/DataContext';
import { login } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';

interface ISignUp {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}
const SignupForm = () => {
  const { navigateToSpecificRoute, success } = useData()
  const dispatch = useDispatch();
  const signUpFormik = useFormik<ISignUp>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: validateFirstName("First name is required", "Invalid First name"),
      lastName: validateFirstName("Last name is required", "Invalid Last name"),
      email: validateEmail("Email is required", "Invalid Email"),
      password: validateRequired("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values): Promise<any> => {
      try {
        const { firstName, lastName, email, password } = values;
        const signupBody = { firstName, lastName, email, password }
        const response = await axiosPost(SIGN_UP_URL, signupBody, true);
        if (response.status === HttpStatusCode.Ok) {
          login(email, password, dispatch, navigateToSpecificRoute, success, "Signed up succesfully");
        }
      } catch (error) {
        success("error", "Something went wrong", 10)
      }
    },
  })

  return (
    <form onSubmit={signUpFormik.handleSubmit}>
      <div className='ta_center'>
        <h2 className="fs_banner_larg">SIGN UP</h2>
        <p className="my_4 fs_sm">We are glad you want to join</p>
      </div>
      <Row className="justify_center">
        <Col md={18}>
          <div>
            <CustomInput
              onChange={signUpFormik.handleChange}
              name="firstName"
              value={signUpFormik.values.firstName}
              error={signUpFormik.errors.firstName}
              touched={signUpFormik.touched.firstName}
              placeholder="First name" />
            <CustomInput
              onChange={signUpFormik.handleChange}
              name="lastName"
              value={signUpFormik.values.lastName}
              error={signUpFormik.errors.lastName}
              touched={signUpFormik.touched.lastName}
              className="mt_4" placeholder="Last name" />
            <CustomInput
              onChange={signUpFormik.handleChange}
              name="email"
              value={signUpFormik.values.email}
              error={signUpFormik.errors.email}
              touched={signUpFormik.touched.email}
              className="mt_4"
              placeholder="User email"
            />
            <CustomInput
              onChange={signUpFormik.handleChange}
              name="password"
              value={signUpFormik.values.password}
              error={signUpFormik.errors.password}
              touched={signUpFormik.touched.password}
              className="mt_4" placeholder="Password" />
            <CustomInput
              onChange={signUpFormik.handleChange}
              name="confirmPassword"
              value={signUpFormik.values.confirmPassword}
              error={signUpFormik.errors.confirmPassword}
              touched={signUpFormik.touched.confirmPassword}
              className="mt_4" placeholder="Confirm Password" />
            <CustomButton htmlType='submit' className="mt_4 btn_secondary w_100 br_3 fs_sm" label="SIGN UP" />
          </div>
        </Col>
      </Row>
    </form>
  )
}

export default SignupForm