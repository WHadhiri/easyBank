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

import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

import { AuthContext } from "../../components/Context/auth-context.js";
import { Grid } from "@material-ui/core";
import ReactInputMask from "react-input-mask";

class Login extends React.Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      accountNumber: "",
      pin: "",
      validate1: {
        accountState: "",
        pinState: "",
      },
      validate2: {
        emailState: "",
        passwordState: "",
      },
      isValid: false,
      isValid2: false,
    };
    this.submitForm1 = this.submitForm1.bind(this);
    this.submitForm2 = this.submitForm2.bind(this);
  }

  validateForm1(e) {
    const accRex = /^(([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4})$)/;
    const { validate1 } = this.state;
    switch (e.target.id) {
      case "iptatm1":
        accRex.test(e.target.value)
          ? (validate1.accountState = "has-success")
          : (validate1.accountState = "has-danger");
        break;
      case "iptatm2":
        e.target.value.length === 4
          ? (validate1.pinState = "has-success")
          : (validate1.pinState = "has-danger");
        break;
      default:
        break;
    }
    this.setState({ validate1 });
    if (
      validate1.accountState === "has-success" &&
      validate1.pinState === "has-success"
    ) {
      this.setState({ isValid1: true });
    } else this.setState({ isValid1: false });
  }

  validateForm2(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate2 } = this.state;
    switch (e.target.id) {
      case "ipt1":
        emailRex.test(e.target.value)
          ? (validate2.emailState = "has-success")
          : (validate2.emailState = "has-danger");
        break;
      case "ipt2":
        e.target.value.length !== 0
          ? (validate2.passwordState = "has-success")
          : (validate2.passwordState = "has-danger");
        break;
      default:
        break;
    }
    this.setState({ validate2 });
    if (
      validate2.emailState === "has-success" &&
      validate2.passwordState === "has-success"
    ) {
      this.setState({ isValid2: true });
    } else this.setState({ isValid2: false });
  }

  async submitForm1(e) {
    const ctx = this.context;
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/accounts/atm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numacc: this.state.accountNumber,
          pin: this.state.pin,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      console.log(data);
      const clientAccount = data.clientAccount;
      const client = data.client;
      const atm = {
        clientAccount: clientAccount,
        client: client,
      };
      ctx.accessATM(atm);
    } catch (error) {
      console.log(error.message);
      const alertId = StatusAlertService.showError(error.message);
      this.setState({ alertId: alertId });
    }
  }

  submitForm2(e) {
    const ctx = this.context;
    e.preventDefault();
    ctx.login();
  }

  render() {
    return (
      <>
        <StatusAlert />
        <Grid container justify="space-between" spacing="2">
          <Col>
            <Card className="bg-secondary shadow border-0 mt--5">
              <CardHeader
                className=" pb-3 shadow-lg bg-dark rounded"
                style={{ fontFamily: "Comfortaa,cursive" }}
              >
                <div className="text-center">
                  <h1 style={{ color: "white" }}>ATM</h1>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.submitForm1}>
                  <FormGroup className="mb-3" id="f1">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-credit-card" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="iptatm1"
                        placeholder="Account-Number"
                        type="tel"
                        mask="9999-9999-9999-9999"
                        tag={ReactInputMask}
                        valid={
                          this.state.validate1.accountState === "has-success"
                        }
                        invalid={
                          this.state.validate1.accountState === "has-danger"
                        }
                        value={this.state.accountNumber}
                        onChange={(e) => {
                          this.validateForm1(e);
                          this.setState({ accountNumber: e.target.value });
                        }}
                      />
                      <FormFeedback>
                        Account Number must have 16 digits exp:
                        1234-xxxx-xxxx-xxxx.
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
                        id="iptatm2"
                        placeholder="PIN"
                        type="password"
                        autoComplete="new-password"
                        value={this.state.pin}
                        valid={this.state.validate1.pinState === "has-success"}
                        invalid={this.state.validate1.pinState === "has-danger"}
                        onChange={(e) => {
                          this.validateForm1(e);
                          this.setState({ pin: e.target.value });
                        }}
                        maxLength="4"
                      />
                      <FormFeedback>PIN field require 4-digits!</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      style={{ fontFamily: "Comfortaa,cursive" }}
                      className="my-4"
                      color="primary"
                      type="submit"
                      disabled={!this.state.isValid1}
                    >
                      Access
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="bg-secondary shadow border-0 mt--5">
              <CardHeader
                className=" pb-3 shadow-lg bg-dark rounded"
                style={{ fontFamily: "Comfortaa,cursive" }}
              >
                <div className="text-center">
                  <h1 style={{ color: "white" }}>CASHIER</h1>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.submitForm2}>
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
                        valid={
                          this.state.validate2.emailState === "has-success"
                        }
                        invalid={
                          this.state.validate2.emailState === "has-danger"
                        }
                        value={this.state.email}
                        onChange={(e) => {
                          this.validateForm2(e);
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
                          this.state.validate2.passwordState === "has-success"
                        }
                        invalid={
                          this.state.validate2.passwordState === "has-danger"
                        }
                        onChange={(e) => {
                          this.validateForm2(e);
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
                      disabled={!this.state.isValid2}
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
        </Grid>
      </>
    );
  }
}

export default Login;
