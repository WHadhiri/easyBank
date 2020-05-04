import React from "react";
import ReactDatetime from "react-datetime";
import "react-status-alert/dist/status-alert.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
} from "reactstrap";

import StatusAlert, { StatusAlertService } from "react-status-alert";

// core components
import UserHeader from "components/Headers/UserHeader.js";

class AddClient extends React.Component {
  state = {
    clientInfo: {
      cin: "",
      firstname: "",
      lastname: "",
      email: "",
      birthDay: new Date(""),
    },
    contact: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    number: 0,
    selected: 0,
    validate: {
      cinState: "",
      firstnameState: "",
      lastnameState: "",
      emailState: "",
      birthdayState: "",
      addressState: "",
      cityState: "",
      countryState: "",
      postalState: "",
    },
    isValid: false,
    alertId: "",
  };

  generateRandomNumber = () => {
    const randomNumber = Math.trunc(Math.random() * 100000000000);
    this.setState({ number: randomNumber });
  };

  handleBirthDay = (date) => {
    const { clientInfo } = this.state;
    clientInfo.birthDay = date;
    this.setState({ clientInfo });
    console.log(this.state.clientInfo.birthDay);
  };

  handleaccount1 = () => {
    this.setState({ selected: 1 });
  };

  handleaccount2 = () => {
    this.setState({ selected: 2 });
  };

  addClient = (e) => {
    const client = {
      cin: "",
      firstname: "",
      lastname: "",
      email: "",
      birthDay: new Date(""),
      cptEpt: false,
      cptCrt: false,
      address: "",
      city: "",
      country: "",
      postalCode: "",
    };
    e.preventDefault();
    const { clientInfo, contact } = this.state;
    if (
      clientInfo.cin.length !== 0 &&
      clientInfo.firstname.length !== 0 &&
      clientInfo.lastname.length !== 0 &&
      clientInfo.birthDay.toString().length !== 0 &&
      clientInfo.email.length !== 0 &&
      contact.address.length !== 0 &&
      contact.city.length !== 0 &&
      contact.country.length !== 0 &&
      contact.postalCode.length !== 0
    ) {
      if (this.state.selected === 0) {
        const alertId = StatusAlertService.showError(
          "Please choose an Account Type (Courant || Epargne)!"
        );
        this.setState({ alertId: alertId });
      } else if (clientInfo.birthDay.toString() === "Invalid Date") {
        const alertId = StatusAlertService.showError(
          "Please provide a valid birthday!"
        );
        this.setState({ alertId: alertId });
      } else if ((new Date(clientInfo.birthDay.toString()).getFullYear() - (new Date().getFullYear())) <= 18) {
        const alertId = StatusAlertService.showError(
          "Client must be 18 or older!"
        );
        this.setState({ alertId: alertId });
      } else {
        client.cin = clientInfo.cin;
        client.firstname = clientInfo.firstname;
        client.lastname = clientInfo.lastname;
        client.email = clientInfo.email;
        client.birthDay = clientInfo.birthDay;
        client.address = contact.address;
        client.city = contact.city;
        client.country = contact.country;
        client.postalCode = contact.postalCode;
        switch (this.state.selected) {
          case 1:
            client.cptCrt = true;
            break;
          case 2:
            client.cptEpt = true;
            break;
          default:
            break;
        }
        console.log(client);
      }
    } else {
      console.log("there is an error!");
    }
  };

  validateForm(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const cinRex = /^[0-9]{8}$/;
    const nameRex = /^[a-zA-Z]{3,}$/;
    const { validate } = this.state;
    switch (e.target?.id) {
      case "input-cin":
        if (cinRex.test(e.target.value)) {
          validate.cinState = "has-success";
        } else {
          validate.cinState = "has-danger";
        }
        break;
      case "input-firstname":
        nameRex.test(e.target.value)
          ? (validate.firstnameState = "has-success")
          : (validate.firstnameState = "has-danger");
        break;
      case "input-lastname":
        nameRex.test(e.target.value)
          ? (validate.lastnameState = "has-success")
          : (validate.lastnameState = "has-danger");
        break;
      case "input-email":
        emailRex.test(e.target.value)
          ? (validate.emailState = "has-success")
          : (validate.emailState = "has-danger");
        break;
      case "input-address":
        e.target.value.length !== 0
          ? (validate.addressState = "has-success")
          : (validate.addressState = "has-danger");
        break;
      case "input-city":
        e.target.value.length !== 0
          ? (validate.cityState = "has-success")
          : (validate.cityState = "has-danger");
        break;
      case "input-country":
        e.target.value.length !== 0
          ? (validate.countryState = "has-success")
          : (validate.countryState = "has-danger");
        break;
      case "input-postal-code":
        e.target.value.length !== 0
          ? (validate.postalState = "has-success")
          : (validate.postalState = "has-danger");
        break;
      default:
        break;
    }

    this.setState({ validate });
    if (
      validate.cinState === "has-success" &&
      validate.firstnameState === "has-success" &&
      validate.lastnameState === "has-success" &&
      validate.emailState === "has-success" &&
      validate.addressState === "has-success" &&
      validate.cityState === "has-success" &&
      validate.countryState === "has-success" &&
      validate.postalState === "has-success"
    ) {
      this.setState({ isValid: true });
    } else this.setState({ isValid: false });
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <StatusAlert />
        <Container className="mt--8" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add Client</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.addClient}>
                    <h6 className="heading-small text-muted mb-4">
                      Client information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-cin"
                            >
                              CIN Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-cin"
                              placeholder="CIN Number"
                              type="text"
                              value={this.state.clientInfo.cin}
                              valid={
                                this.state.validate.cinState === "has-success"
                              }
                              invalid={
                                this.state.validate.cinState === "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { clientInfo } = this.state;
                                clientInfo.cin = e.target.value;
                                this.setState({ clientInfo });
                              }}
                            />
                            <FormFeedback>
                              Please input a correct CIN.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-firstname"
                            >
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-firstname"
                              placeholder="First Name"
                              type="text"
                              value={this.state.clientInfo.firstname}
                              valid={
                                this.state.validate.firstnameState ===
                                "has-success"
                              }
                              invalid={
                                this.state.validate.firstnameState ===
                                "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { clientInfo } = this.state;
                                clientInfo.firstname = e.target.value;
                                this.setState({ clientInfo });
                              }}
                            />
                            <FormFeedback>
                              Please input a Firstname.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-lastname"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-lastname"
                              placeholder="Last Name"
                              type="text"
                              value={this.state.clientInfo.lastname}
                              valid={
                                this.state.validate.lastnameState ===
                                "has-success"
                              }
                              invalid={
                                this.state.validate.lastnameState ===
                                "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { clientInfo } = this.state;
                                clientInfo.lastname = e.target.value;
                                this.setState({ clientInfo });
                              }}
                            />
                            <FormFeedback>
                              Please input a Lastname.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-birthday"
                            >
                              Birthday
                            </label>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                inputProps={{
                                  placeholder: "Date Picker Here",
                                  name: "birthday",
                                  required: true,
                                }}
                                timeFormat={false}
                                closeOnSelect={true}
                                value={this.state.clientInfo.birthDay}
                                onChange={(e) => {
                                  this.handleBirthDay(e.format("DD-MM-YYYY"));
                                }}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              E-mail
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email Address"
                              type="email"
                              value={this.state.clientInfo.email}
                              valid={
                                this.state.validate.emailState === "has-success"
                              }
                              invalid={
                                this.state.validate.emailState === "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { clientInfo } = this.state;
                                clientInfo.email = e.target.value;
                                this.setState({ clientInfo });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid E-mail.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      account information
                    </h6>
                    <div className="pl-lg-4">
                      <hr className="my-4" />
                      {/* Account Type */}
                      <h6 className="heading-small text-muted mb-4">
                        Account Type
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6" className="text-center mb-3">
                            <Button
                              id="btn-crt"
                              outline
                              color="default"
                              onClick={this.handleaccount1}
                              active={this.state.selected === 1}
                            >
                              Compte Courant
                            </Button>
                          </Col>
                          <Col lg="6" className="text-center mb-3">
                            <Button
                              id="btn-ept"
                              outline
                              color="default"
                              onClick={() => {
                                this.handleaccount2();
                                this.generateRandomNumber();
                              }}
                              active={this.state.selected === 2}
                            >
                              Compte Epargne
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <br />
                        </Row>
                      </div>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Account Number
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Account Number"
                              value={this.state.number}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Password
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="CSC (Card Security Code)"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    {/* Compte */}
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              value={this.state.contact.address}
                              valid={
                                this.state.validate.addressState ===
                                "has-success"
                              }
                              invalid={
                                this.state.validate.addressState ===
                                "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { contact } = this.state;
                                contact.address = e.target.value;
                                this.setState({ contact });
                              }}
                            />
                            <FormFeedback>
                              Please input an Address.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="City"
                              type="text"
                              value={this.state.contact.city}
                              valid={
                                this.state.validate.cityState === "has-success"
                              }
                              invalid={
                                this.state.validate.cityState === "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { contact } = this.state;
                                contact.city = e.target.value;
                                this.setState({ contact });
                              }}
                            />
                            <FormFeedback>Please input a City.</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              value={this.state.contact.country}
                              valid={
                                this.state.validate.countryState ===
                                "has-success"
                              }
                              invalid={
                                this.state.validate.countryState ===
                                "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { contact } = this.state;
                                contact.country = e.target.value;
                                this.setState({ contact });
                              }}
                            />
                            <FormFeedback>Please input a Country.</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-postal-code"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                              value={this.state.contact.postalCode}
                              valid={
                                this.state.validate.postalState ===
                                "has-success"
                              }
                              invalid={
                                this.state.validate.postalState === "has-danger"
                              }
                              onChange={(e) => {
                                this.validateForm(e);
                                const { contact } = this.state;
                                contact.postalCode = e.target.value;
                                this.setState({ contact });
                              }}
                            />
                            <FormFeedback>
                              Please input a Postal Code.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <Button
                      block
                      size="lg"
                      className="btn btn-info outline "
                      type="submit"
                      disabled={!this.state.isValid}
                    >
                      Create
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AddClient;
