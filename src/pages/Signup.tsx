import { Col, Row } from "antd"
import LoginBanner from "../assets/images/LoginBanner.png";
import SignupForm from "../components/Forms/SignupForm";

const Signup = () => {
  return (
    <div className="p_6">
      <Row className="align_center w_100 ta_center">
        <Col className="" sm={24} md={12}>
          <SignupForm />
        </Col>
        <Col md={12}>
          <img width="100%" src={LoginBanner} alt="img" />
        </Col>
      </Row>
    </div>
  )
}

export default Signup