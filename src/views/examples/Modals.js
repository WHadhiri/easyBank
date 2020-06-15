import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import ReactDatetime from "react-datetime";
import moment from "moment";
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
  Modal,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
} from "reactstrap";

import StatusAlert, { StatusAlertService } from "react-status-alert";

import { AuthContext } from "../../components/Context/auth-context.js";

const randomize = require("randomatic");

const ModalOverlay = (props) => {
  const ctx = useContext(AuthContext);
  const [firstname, setFirstname] = useState(props.client.firstname);
  const [lastname, setlastname] = useState(props.client.lastname);
  const [cin, setCin] = useState(props.client.cin);
  const [email, setEmail] = useState(props.client.email);
  const [birthday, setBirthday] = useState(props.client.birthday);
  const [address, setAddress] = useState(props.client.contact.address);
  const [city, setCity] = useState(props.client.contact.city);
  const [country, setCountry] = useState(props.client.contact.country);
  const [postalCode, setPostalCode] = useState(props.client.contact.postalCode);
  const [cptCrt, setCptCrt] = useState(props.client.cptCrt);
  const [cptEp, setCptEp] = useState(props.client.cptEp);
  const [numacc, setNumacc] = useState("");
  const [typeofaccount, setTypeOfAccount] = useState("");
  const [pin, setPin] = useState("");
  const [selected, setSelected] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [alertId, setAlertId] = useState("");

  const [validate, setValidate] = useState({
    cinState: "has-success",
    firstnameState: "has-success",
    lastnameState: "has-success",
    emailState: "has-success",
    birthdayState: "has-success",
    addressState: "has-success",
    cityState: "has-success",
    countryState: "has-success",
    postalState: "has-success",
  });

  const validDates = function (current) {
    return current.isSameOrBefore(moment());
  };

  const generateAccountNumber = (type) => {
    var accNumber = "xxxx-xxxx-xxxx-xxxx".replace(/[x]/g, (c) => {
      return randomize("0", 1);
    });
    var accPin = "xxxx".replace(/[x]/g, (c) => {
      return randomize("0", 1);
    });
    setNumacc(accNumber);
    setPin(accPin);
    setTypeOfAccount(type);
  };

  const handleBirthDay = (date) => {
    setBirthday(date);
  };

  const handleaccount1 = () => {
    setSelected(1);
  };

  const handleaccount2 = () => {
    setSelected(2);
  };

  const validateForm = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const cinRex = /^[0-9]{8}$/;
    const nameRex = /^[a-zA-Z]{3,}$/;
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

    setValidate(validate);
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
      setIsValid(true);
    } else setIsValid(false);
  };

  const updateClient = async (e) => {
    e.preventDefault();
    if (
      cin.length !== 0 &&
      firstname.length !== 0 &&
      lastname.length !== 0 &&
      birthday.toString().length !== 0 &&
      email.length !== 0 &&
      address.length !== 0 &&
      city.length !== 0 &&
      country.length !== 0 &&
      postalCode.length !== 0
    ) {
      if (birthday.toString() === "Invalid Date") {
        const alertId = StatusAlertService.showError(
          "Please provide a valid birthday!"
        );
        setAlertId(alertId);
      } else if (
        new Date().getFullYear() - new Date(birthday).getFullYear() <
        18
      ) {
        const alertId = StatusAlertService.showError(
          "Client must be 18 or older!"
        );
        setAlertId(alertId);
      } else {
        try {
          let clientInfo;
          if (numacc || typeofaccount || pin) {
            clientInfo = {
              cin,
              firstname,
              lastname,
              email,
              birthday,
              address,
              city,
              country,
              postalCode,
              account: {
                numacc,
                typeofaccount,
                pin,
              },
            };
          } else {
            clientInfo = {
              cin,
              firstname,
              lastname,
              email,
              birthday,
              address,
              city,
              country,
              postalCode,
            };
          }
          await sendUpdatedClient(clientInfo);
        } catch (error) {
          console.log(error.message);
        }
      }
    } else {
      console.log("there is an error!");
    }
  };

  const sendUpdatedClient = async (client) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/${client.cin}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + ctx.token,
          },
          body: JSON.stringify({
            firstname: client.firstname,
            lastname: client.lastname,
            cin: client.cin,
            email: client.email,
            birthday: client.birthday,
            contact: {
              address: client.address,
              city: client.city,
              country: client.country,
              postalCode: client.postalCode,
            },
            account: client.account?.numacc ? client.account : null,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      props.updateState(data.updatedClient);
      const alertId = StatusAlertService.showSuccess(
        "Client Updated Succefully!"
      );
      setAlertId(alertId);
      setTimeout(() => props.handleClose(), 1000);
    } catch (error) {
      console.log(error.message);
      const alertId = StatusAlertService.showError(error.message);
      setAlertId(alertId);
    }
  };

  const content = (
    <>
      <StatusAlert />
      <Modal className="modal-dialog-centered" size="md" isOpen={props.show}>
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Update Client</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={updateClient}>
                <h6 className="heading-small text-muted mb-4">
                  Client information
                </h6>
                <div className="pl-lg-4">
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
                          value={firstname}
                          valid={validate.firstnameState === "has-success"}
                          invalid={validate.firstnameState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ firstname: e.target.value });
                            setFirstname(e.target.value);
                          }}
                        />
                        <FormFeedback>Please input a Firstname.</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-lastname"
                        >
                          Last name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-lastname"
                          placeholder="Last name"
                          type="text"
                          //defaultValue={props.client.lastname}
                          value={lastname}
                          valid={validate.lastnameState === "has-success"}
                          invalid={validate.lastnameState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ lastname: e.target.value });
                            setlastname(e.target.value);
                          }}
                        />
                        <FormFeedback>Please input a Lastname.</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
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
                          placeholder="N° CIN"
                          type="text"
                          //defaultValue={props.client.cin}
                          value={cin}
                          valid={validate.cinState === "has-success"}
                          invalid={validate.cinState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ cin: e.target.value });
                            setCin(e.target.value);
                          }}
                        />
                        <FormFeedback>Please input a correct CIN.</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email address
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Email Adress"
                          type="email"
                          //defaultValue={props.client.email}
                          value={email}
                          valid={validate.emailState === "has-success"}
                          invalid={validate.emailState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ email: e.target.value });
                            setEmail(e.target.value);
                          }}
                        />
                        <FormFeedback>
                          Please input a valid E-mail.
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
                            value={moment(birthday)}
                            onChange={(e) => {
                              handleBirthDay(new Date(e.format("DD-MM-YYYY")));
                            }}
                            isValidDate={validDates}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {cptCrt && cptEp ? (
                  <Row>
                    <br />
                  </Row>
                ) : (
                  <React.Fragment>
                    <h6 className="heading-small text-muted mb-4">
                      Account Information
                    </h6>
                    <div className="pl-lg-4">
                      <hr className="my-4" />
                      {/* Account Type */}
                      <h6 className="heading-small text-muted mb-4">
                        Account Type
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          {cptEp && !cptCrt && (
                            <Col lg="6" className="text-center mb-3">
                              <Button
                                id="btn-crt"
                                outline
                                color="default"
                                onClick={() => {
                                  handleaccount1();
                                  generateAccountNumber("Courant");
                                }}
                                active={selected === 1}
                              >
                                Compte Courant
                              </Button>
                            </Col>
                          )}
                          {cptCrt && !cptEp && (
                            <Col lg="6" className="text-center mb-3">
                              <Button
                                id="btn-ept"
                                outline
                                color="default"
                                onClick={() => {
                                  handleaccount2();
                                  generateAccountNumber("Epargne");
                                }}
                                active={selected === 2}
                              >
                                Compte Epargne
                              </Button>
                            </Col>
                          )}
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
                              htmlFor="input-accountNumber"
                            >
                              Account Number
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              id="input-accountNumber"
                              placeholder="Account Number"
                              value={numacc}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-pin"
                            >
                              PIN
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              id="input-pin"
                              placeholder="PIN (Personal Identification Number)"
                              type="text"
                              value={pin}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </React.Fragment>
                )}
                <hr className="my-4" />
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
                          //defaultValue={props.client.contact.address}
                          value={address}
                          valid={validate.addressState === "has-success"}
                          invalid={validate.addressState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ address: e.target.value });
                            setAddress(e.target.value);
                          }}
                        />
                        <FormFeedback>Please input an Address.</FormFeedback>
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
                          //defaultValue={props.client.contact.city}
                          value={city}
                          valid={validate.cityState === "has-success"}
                          invalid={validate.cityState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ city: e.target.value });
                            setCity(e.target.value);
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
                          //defaultValue={props.client.contact.country}
                          value={country}
                          valid={validate.countryState === "has-success"}
                          invalid={validate.countryState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ country: e.target.value });
                            setCountry(e.target.value);
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
                          //defaultValue={props.client.contact.postalCode}
                          value={postalCode}
                          valid={validate.postalState === "has-success"}
                          invalid={validate.postalState === "has-danger"}
                          onChange={(e) => {
                            validateForm(e);
                            //setClientInfo({ postalCode: e.target.value });
                            setPostalCode(e.target.value);
                          }}
                        />
                        <FormFeedback>Please input a Postal Code.</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-5" />
                <div className="form-group">
                  <Button
                    block
                    size="lg"
                    className="btn btn-info outline "
                    type="submit"
                    disabled={!isValid}
                  >
                    Update
                  </Button>
                </div>
                <div className="form-group">
                  <Button
                    block
                    size="lg"
                    className="btn btn-info outline "
                    type="button"
                    onClick={props.handleClose}
                  >
                    Close
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("modals"));
};

class Modals extends React.Component {
  render() {
    return <>{this.props.show && <ModalOverlay {...this.props} />}</>;
  }
}

export default Modals;
