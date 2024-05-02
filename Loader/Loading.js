import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Card from "../components/Card";
import "./Loading.css";

function Loading(props) {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="col-md-6 offset-3">
            <Card className="card">
              <div className="text-center">
                <div className="title_result loading"></div>
                <div className="qr_result loading mt-2"></div>
              </div>

              <ul className="list-group mt-3" style={{ fontSize: "small" }}>
                <li className="list-group-item-load loading"></li>
                {/* <li className="list-group-item-load loading"></li> */}
                <li className="list-group-item-load loading"></li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Loading;
