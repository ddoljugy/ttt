import React from "react";
import styled from "styled-components";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <Page>
      <Container>
        <PageHeading>How it works </PageHeading>
        <div>
          Buying and selling your vehicle through <b>Blue Auto</b> is simple,
          reliable and safe. We&apos;re here to help both Buyers and Sellers.
        </div>
        <Heading>Buying</Heading>
        <div>
          Once you find a vehicle on our website that you&apos;re interested in,
          complete the <b>check availability</b> form. A member of our team will
          contact you with more information on the car, and to answer and to
          answer all your questions. <br />
          <br />
          All vehicles sold by Blue Auto are quality approved. You will be
          provided with an AA certificate, as well as an AA 101 Multipoint Check
          certificate. Extended warranties are available on all vehicles.
          <br />
          Vehicle financing options are available through all major South
          African banks, so that we can find you the best deal possible.
        </div>
        <Heading>Selling</Heading>
        <div>
          To advertise your vehicle through BlueAuto, complete the{"  "}
          <b>&apos;Sell your vehicle&apos;</b> form. One of our team members
          will get in contact with you to ensure we have all the necessary
          details so we can get the right buyer for your vehicle.
          <br />
          <br />
          Blue Auto makes it possible for you to keep driving your vehicle while
          we&apos;re finding a buyer. Once we have a buyer we will arrange a
          suitable time for viewing the vehicle, keeping you updated every step
          of the way. All payments will be handled using the BlueAuto Secure
          Payment System.
        </div>
        <Heading>Got any questions?</Heading>
        <div>
          Our team would be more than happy to help out.{"  "}
          <span>
            <Link style={{ marginLeft: "10px" }} href="/contact" passHref>
              Contact us.
            </Link>
          </span>
        </div>
      </Container>
    </Page>
  );
};

export default HowItWorks;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  background: rgb(0, 0, 77); /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    rgb(0, 0, 77),
    rgb(0, 0, 50),
    rgb(0, 0, 77)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgb(0, 0, 77),
    rgb(0, 0, 50),
    rgb(0, 0, 77)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Container = styled.div`
  color: rgb(251, 251, 255);
  margin: 100px 0 200px 200px;
  width: 60%;
  @media (max-width: 568px) {
    margin: unset;
    margin: 20px auto 30px auto;
    height: fit-content;
    width: 90%;
  }
  a {
    text-decoration: underline;
    :hover {
      text-decoration: none;
    }
    cursor: pointer;
  }
`;

const Heading = styled.div`
  font-size: 22px;
  margin-top: 40px;
  font-weight: 600;
`;

const PageHeading = styled.div`
  font-size: 30px;
  margin-bottom: 25px;
  font-weight: 600;
`;
