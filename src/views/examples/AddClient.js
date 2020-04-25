import React from "react";
import ReactDatetime from "react-datetime";
 


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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

class AddClient extends React.Component {
<<<<<<< HEAD
  
  state = {
    startDate: new Date(),
    number : 0 ,
    selected : 0
  };
 
  generateRandomNumber = () => {
    const randomNumber = Math.trunc(Math.random()*100000000000)
    this.setState({number : randomNumber}) 
  };
  onChangeHandler=event=>{

    console.log(event.target.files[0])

}

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleaccount1= () =>{
    this.setState({selected:1})
  }

  handleaccount2= () =>{
    this.setState({selected:2})
  }

=======
>>>>>>> 3333f0bf12c1ffee33582f5f9bc35fb7aba9195d
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
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
                  <Form>
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
                             CIN Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-firstname"
                              placeholder="CIN Number"
                              type="text"
                            />
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
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-cin"
                              placeholder="First Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Last Name"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          
                        <FormGroup>
                        <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              date of birthday
                            </label>
                        <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                    inputProps={{
                      placeholder: "Date Picker Here"
                    }}
                    timeFormat={false}
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
                              placeholder="Email Adress"
                              type="email"
                            />
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
                <h6 className="heading-small text-muted mb-4">Account Type</h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" className="text-center">
                      <Button
                        outline
                        color="default"
                        onClick={this.handleaccount1}
                        active={this.state.selected === 1}
                      >
                        Compte Courant
                      </Button>
                    </Col>
                    <Col lg="6">
                      <Button
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
                    <br/>
                  </Row>
                </div>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              N°compte
                            </label>
                            <Input
                            readOnly="true"
                              className="form-control-alternative"
                              id="input-address"
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
                              password
                            </label>
                            <Input
                            readOnly="true"
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      <input type="file" name="file" onChange={this.onChangeHandler}/>

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
                            />
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
                            />
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
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>


                    <hr className="my-4" />
                    <Button block size="lg" className="btn btn-info outline " type="submit">
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
