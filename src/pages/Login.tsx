// import { useEffect } from 'react'
// import { checkLoggedIn } from '../utils/helper'
// import { useNavigate } from "react-router-dom"
// import { Paths } from '../routes/pats'

import LoginBanner from "../assets/images/LoginBanner.png";
import { Col, Row } from "antd"
import LoginForm from "../components/Forms/LoginForm.tsx";

const Login = () => {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!checkLoggedIn()) {
  //     navigate(Paths.HOME)
  //   }
  // }, [])

  return (
    <div className="p_6">
      <Row gutter={22} className="align_center ta_center">
        <Col className="" sm={24} md={12}>
          <LoginForm />
        </Col>
        <Col md={12}>
          <img width="100%" src={LoginBanner} alt="img" />
        </Col>
      </Row>
    </div>
  )
}

export default Login