import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "@mui/material/Link";
import { useState, useEffect } from "react";

const Login = ({ setToken }) => {
  //이메일, 비밀번호 확인
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
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
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
          localStorage.setItem("token", res.access_token);
          window.location.href = "/todo";
          alert("로그인 성공 ");
        }
      });
  };

  // 토큰없이 접근시 경로변경
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/todo";
    }
  }, []);

  return (
    <Container className="LoginContainer">
      <Container className="square border border-primary">
        <Row>
          <Col
            style={{ textAlign: "center", fontSize: "30px", marginTop: "2% " }}
          >
            로그인
          </Col>
        </Row>
        <Form className="LoginForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>이메일 </Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              id="email"
              onChange={onChangeEmail}
            />
            {emailMessage && (
              <p style={{ color: "red" }} className="error">
                {emailMessage}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
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
            style={{ alignItems: "center", marginBottom: "3% " }}
            disabled={!(isEmail && isPassword)}
          >
            로그인
          </Button>
          <Link href="/join">
            <Button variant="link">회원가입하러가기</Button>
          </Link>
        </Form>
      </Container>
    </Container>
  );
};

export default Login;
