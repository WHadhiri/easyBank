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
} from "reactstrap";

const validationHandler = (event) => {
  const f1 = document.getElementById("f1");
  const input = event.target.value;
  if (input.length > 0 && input.length < 10)
    if (/([0-9]+)/.test(input)) {
      f1.classList.remove("has-danger");
      f1.classList.add("has-success");
    } else {
      f1.classList.remove("has-success");
      f1.classList.add("has-danger");
    }
  else {
    f1.classList.remove("has-success");
    f1.classList.add("has-danger");
  }
};

class Login extends React.Component {
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
              <Form role="form">
                <FormGroup className="mb-3" id="f1">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onBlur={validationHandler}
                    />
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
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Login
                  </Button>
                </div>
              </Form>
              {/*<AvForm>
                <AvGroup className="mb-3">
                  <InputGroupAddon addonType="prepend" className="mb-2">
                    <InputGroupText>
                      <i className="ni ni-badge"><span>{" "}Account Number{" "}</span></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <AvField
                    name="numaccount"
                    type="text"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter an Account Number",
                      },
                      pattern: {
                        value: "^[0-9]+$",
                        errorMessage:
                          "Account number must be composed only numbers",
                      },
                      minLength: {
                        value: 10,
                        errorMessage:
                          "Account number must be composed only with 10 numbers",
                      },
                      maxLength: {
                        value: 10,
                        errorMessage:
                          "Account number must be composed only with 10 numbers",
                      },
                    }}
                  />
                </AvGroup>
                <AvGroup>
                <InputGroupAddon addonType="prepend" className="mb-2">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open"><span>{" "}Account Password{" "}</span></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <AvField
                    name="numpass"
                    type="password"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter an Account Password",
                      },
                      minLength: {
                        value: 6,
                        errorMessage:
                          "Account password must be between 6 and 16 characters",
                      },
                      maxLength: {
                        value: 16,
                        errorMessage:
                          "Account password must be between 6 and 16 characters",
                      },
                    }}
                  />
                </AvGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Login
                  </Button>
                </div>
              </AvForm>*/}
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
