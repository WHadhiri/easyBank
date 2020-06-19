import React, { Component, Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import { withRouter } from "react-router-dom";

import { Container } from "reactstrap";

class Pdf extends Component {
  constructor(props) {
    super(props);
    this.accountID = this.props.match.params.numacc;
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trans/${this.accountID}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      this.setState({ data: data.trans });
      console.log(this.state.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { data } = this.state;
    return (
      <>
      <div className="header bg-dark pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body"></div>
          </Container>
        </div>
        {data.length !== 0 && (
          <Container className=" ml-5 mt-3" fluid>
            <Fragment>
              <PDFViewer width="1000" height="600" className="app">
                <Invoice invoice={data} />
              </PDFViewer>
            </Fragment>
          </Container>
        )}
      </>
    );
  }
}

export default withRouter(Pdf);
