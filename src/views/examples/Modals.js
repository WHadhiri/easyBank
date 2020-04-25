import React from "react";
import ReactDOM from "react-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
  Modal,
} from "reactstrap";

const ModalOverlay = (props) => {
  const content = (
    <>
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
                          First Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-firstname"
                          placeholder="First Name"
                          type="text"
                          defaultValue={props.client.fullName}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Last name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-last-name"
                          placeholder="Last name"
                          type="text"
                          defaultValue={props.client.fullName}
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
                          CIN Number
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-cin"
                          placeholder="N° CIN"
                          type="text"
                          defaultValue={props.client.cin}
                        />
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
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
                <hr className="my-5" />
                <div className="form-group">
                  <Button
                    block
                    size="lg"
                    className="btn btn-info outline "
                    type="submit"
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
