import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import "../css/Join.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = ({ setToken }) => {
  const navigate = useNavigate();

  // 이메일, 비밀번호 확인
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //이메일 형식확인 메세지
  const onChangeEmail = (event) => {
    const {
      target: { id, value },
    } = event;

    setEmailMessage(null);

    if (id === "email") {
      setEmail(value);
      if (value === "") {
        setEmailMessage(`이메일을 입력해주세요.`);
        setIsEmail(false);
      } else if (!value.includes("@") || !value.includes(".")) {
        setEmailMessage(`이메일 형식으로 입력해주세요.`);
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    }
  };

  //비밀번호 형식 확인 메세지
  const onChangePassword = (event) => {
    const {
      target: { id, value },
    } = event;

    setPasswordMessage(null);

    if (id === "password") {
      setPassword(value);
      if (value === "") {
        setPasswordMessage(`비밀번호를 입력해주세요.`);
        setIsPassword(false);
      } else if (value.length < 8) {
        setPasswordMessage(`비밀번호는 8자리 이상 입력해주세요.`);
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    }
  };

  //API
  const onHandleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.access_token) {
          window.location.href = "/";
        }
        alert("회원가입을 축하드립니다. ");
      });
  };

  return (
    <Form className="JoinForm" method="post" onSubmit={onHandleSubmit}>
      <Container className="JoinBorder">
        <Form.Group
          className="mb-3"
          controlId="formGridAddress1"
          style={{ marginTop: "3%" }}
        >
          <Row>
            <Col
              style={{
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              회원가입
            </Col>
          </Row>
          <Form.Label>이름</Form.Label>
          <Form.Control placeholder="이름을 입력하세요" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label type="email" id="userEmail">
            이메일
          </Form.Label>
          <Form.Control
            placeholder="이메일을 입력하세요"
            type="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
          />
          {emailMessage && (
            <p style={{ color: "red" }} className="error">
              {emailMessage}
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label type="password" id="password">
            비밀번호
          </Form.Label>
          <Form.Control
            placeholder="비밀번호를 입력하세요"
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
          {passwordMessage && (
            <p style={{ color: "red" }} className="error">
              {passwordMessage}
            </p>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ marginBottom: "3%" }}
          disabled={!(isEmail && isPassword)}
        >
          회원가입
        </Button>
      </Container>
    </Form>
  );
};

export default Join;
