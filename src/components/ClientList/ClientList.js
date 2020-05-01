import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Button,
} from "reactstrap";

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.clients = this.props.clients;
  }

  selectedClient = (client) => {
    this.props.onShowModal(client);
  };

  render() {
    if (this.clients.length === 0) {
      return (
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <span className="mb-0 text-sm">No Clients Found.</span>
            </Media>
          </th>
        </tr>
      );
    }

    return this.clients.map((client) => {
      return (
        <tr key={client.cin}>
          <th scope="row">
            <Media className="align-items-center">
              <span className="mb-0 text-sm">{client.fullName}</span>
            </Media>
          </th>
          <td>{client.cin}</td>
          <td>
            {client.cptEp ? (
              <Button
                outline
                color="info"
                type="button"
                tag={Link}
                to={`/admin/accounts/${client.cin}/`}
              >
                Show Account
              </Button>
            ) : (
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                Not Available
              </Badge>
            )}
          </td>

          <td>
            {client.cptCrt ? (
              <Button
                outline
                color="info"
                type="button"
                tag={Link}
                to={`/admin/accounts/${client.cin}/`}
              >
                Show Account
              </Button>
            ) : (
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                Not Available
              </Badge>
            )}
          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem onClick={(e) => this.selectedClient(client)}>
                  <i className="ni ni-zoom-split-in" /> Update Informations
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-fat-remove text-red" /> Delete Client
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      );
    });
  }
}

export default ClientList;
