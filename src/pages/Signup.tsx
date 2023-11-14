import { Col, Row } from "antd"
import LoginBanner from "../assets/images/LoginBanner.png";
import SignupForm from "../components/Forms/SignupForm";

const Signup = () => {
  return (
    <Row gutter={22} className="w_100 p_6 align_center">
      <Col className="" sm={24} md={12}>
        <SignupForm />
      </Col>
      <Col md={12}>
        <img width="100%" src={LoginBanner} alt="img" />
      </Col>
    </Row>
  )
}

export default Signup