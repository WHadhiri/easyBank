import React from "react";


class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-9 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" + require("assets/img/brand/test.png") + ")",
            backgroundSize: "contain",
            backgroundRepeat:"no-repeat",
            backgroundPosition: "top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          
        </div>
      </>
    );
  }
}

export default UserHeader;
