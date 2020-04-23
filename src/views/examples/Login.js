import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";

import { AuthContext } from "../../components/Context/auth-context.js";

class Login extends React.Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: "",
        passwordState: "",
      },
      isValid: false,
    };
    this.submitForm = this.submitForm.bind(this);
  }

  validateForm(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    switch (e.target.id) {
      case "ipt1":
        emailRex.test(e.target.value)
          ? (validate.emailState = "has-success")
          : (validate.emailState = "has-danger");
        break;
      case "ipt2":
        e.target.value.length !== 0
          ? (validate.passwordState = "has-success")
          : (validate.passwordState = "has-danger");
        break;
      default:
        break;
    }
    this.setState({ validate });
    if (
      validate.emailState === "has-success" &&
      validate.passwordState === "has-success"
    ) {
      this.setState({ isValid: true });
    } else this.setState({ isValid: false });
  }

  submitForm(e) {
    const ctx = this.context;
    e.preventDefault();
    ctx.login();
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0 mt--5">
            <CardHeader className="bg-transparent pb-3">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>Login</h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.submitForm}>
                <FormGroup className="mb-3" id="f1">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="ipt1"
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      valid={this.state.validate.emailState === "has-success"}
                      invalid={this.state.validate.emailState === "has-danger"}
                      value={this.state.email}
                      onChange={(e) => {
                        this.validateForm(e);
                        this.setState({ email: e.target.value });
                      }}
                    />
                    <FormFeedback valid>
                      That's a tasty looking email you've got there.
                    </FormFeedback>
                    <FormFeedback>
                      Uh oh! Looks like there is an issue with your email.
                      Please input a correct email.
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="ipt2"
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={this.state.password}
                      valid={
                        this.state.validate.passwordState === "has-success"
                      }
                      invalid={
                        this.state.validate.passwordState === "has-danger"
                      }
                      onChange={(e) => {
                        this.validateForm(e);
                        this.setState({ password: e.target.value });
                      }}
                    />
                    <FormFeedback>Password field is required!</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={!this.state.isValid}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
