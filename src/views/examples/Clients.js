import React from "react";
import { GuardSpinner } from "react-spinners-kit";
import "../../index.css";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CardBody,
} from "reactstrap";
// core components

import Modals from "./Modals.js";

import ClientList from "components/ClientList/ClientList.js";

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Clients: [],
      clientAccounts: [],
      visible: false,
      selectedClient: {
        firstname: "",
        lastname: "",
        cin: "",
        birthday: new Date(""),
        email: "",
        cptEp: false,
        cptCrt: false,
        contact: {
          address: "",
          city: "",
          country: "",
          postalCode: "",
        },
        account: {
          numacc: "",
          pin: "",
          typeofaccount: "",
        },
      },
      isLoading: false,
      filteredData: [],
      searchInput: "",
      currentPage: 0,
    };
    this.pageSize = 3;
    this.pagesCount = 0;
  }

  showModal = (client, type) => {
    const { selectedClient } = this.state;
    selectedClient.firstname = client.firstname;
    selectedClient.lastname = client.lastname;
    selectedClient.cin = client.cin;
    selectedClient.email = client.email;
    selectedClient.birthday = client.birthday;
    if (type.length === 2) {
      selectedClient.cptCrt = true;
      selectedClient.cptEp = true;
    } else {
      type.forEach((item) => {
        if (item === "Courant") {
          selectedClient.cptCrt = true;
          selectedClient.cptEp = false;
        }
        if (item === "Epargne") {
          selectedClient.cptEp = true;
          selectedClient.cptCrt = false;
        }
      });
    }
    selectedClient.contact = client.contact;
    this.setState({ selectedClient });
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchClients();
    await this.fetchClientAccounts();
    this.setState({ isLoading: false });
    this.pagesCount = Math.ceil(this.state.Clients.length / this.pageSize);
  }

  async fetchClients() {
    try {
      const response = await fetch("http://localhost:5000/api/clients");
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      this.setState({ Clients: data.clients });
    } catch (error) {
      console.log(error.message);
    }
  }
  async fetchClientAccounts() {
    this.state.Clients.forEach(async (client) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/accounts/${client.id}/accounts`
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        data.accounts.forEach((item) => {
          const { id, typeofaccount } = item;
          this.setState({
            clientAccounts: [
              ...this.state.clientAccounts,
              { owner: client.id, idaccount: id, type: typeofaccount },
            ],
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  }

  checkAccount = (id, type) => {
    return {
      isType:
        this.state.clientAccounts.filter(
          (item) => item.type === type && item.owner === id
        ).length > 0
          ? true
          : false,
      account: this.state.clientAccounts
        .filter((item) => item.type === type && item.owner === id)
        .pop(),
    };
  };

  filterClient = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.filterTable();
    });
  };

  filterTable = () => {
    let { Clients, searchInput } = this.state;
    let filteredData = Clients.filter((value) => {
      return value.cin.includes(searchInput);
    });
    this.setState({ filteredData: filteredData });
  };

  handlePagination(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index,
    });
  }

  showPagination = () => {
    let pages = [];
    for (let i = 0; i < this.pagesCount; i++) {
      pages.push(
        <PaginationItem active={i === this.state.currentPage} key={i}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => this.handlePagination(e, i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  render() {
    const {
      Clients,
      isLoading,
      clientAccounts,
      searchInput,
      filteredData,
      currentPage,
    } = this.state;
    return (
      <>
        <Modals
          show={this.state.visible}
          handleClose={this.closeModal}
          client={this.state.selectedClient}
        />
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body"></div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col className="my-3">
                      <h3 className="mb-0">Client List</h3>
                    </Col>
                    <Col className="mr--9">
                      <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-search text-teal" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              className="searchInput"
                              placeholder="Search By CIN"
                              type="text"
                              value={searchInput || ""}
                              onChange={this.filterClient}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </CardHeader>
                {isLoading && (
                  <CardBody>
                    <div className="w-100 d-flex justify-content-center">
                      <GuardSpinner
                        size={40}
                        frontColor="#5bc0de"
                        loading={isLoading}
                      />
                    </div>
                  </CardBody>
                )}
                {!isLoading && (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">CIN</th>
                        <th scope="col">Compte Epargne</th>
                        <th scope="col">Compte Courant</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {Clients && clientAccounts && (
                        <ClientList
                          clients={
                            (filteredData.length > 0 && filteredData) ||
                            searchInput
                              ? filteredData.slice(
                                  currentPage * this.pageSize,
                                  (currentPage + 1) * this.pageSize
                                )
                              : Clients.slice(
                                  currentPage * this.pageSize,
                                  (currentPage + 1) * this.pageSize
                                )
                          }
                          onShowModal={this.showModal}
                          checkAccount={this.checkAccount}
                        />
                      )}
                    </tbody>
                  </Table>
                )}
                {!isLoading && (
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem disabled={currentPage <= 0}>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) =>
                              this.handlePagination(e, currentPage - 1)
                            }
                            previous
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        {this.showPagination().map((item) => item)}
                        <PaginationItem
                          disabled={currentPage >= this.pagesCount - 1}
                        >
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) =>
                              this.handlePagination(e, currentPage + 1)
                            }
                            next
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </CardFooter>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Clients;
