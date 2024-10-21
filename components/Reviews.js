import React, { useEffect } from "react";
import styled from "styled-components";

// Create an array of positive reviews for car services and sales
const reviews = [
  {
    name: "Dylan Niemann",
    review:
      "I would highly recommend Blue Auto to anyone looking for a great deal on a used car. The staff are friendly and professional, and they truly go above and beyond to ensure that their customers are satisfied.",
  },
  {
    name: "Karla Bester",
    review:
      "I had a great experience with Blue Auto. They were very helpful and I couldn't believe how quickly my car was ready!",
  },
  {
    name: "Lerato Mokgatle",
    review:
      "Blue Auto showed me so much patience and respect through the process of buying my first car. I'll be contacting you guys again in a few years! Thank you!",
  },
  {
    name: "Cynthia Van Wyk",
    review:
      "Baie dankie Pedri vir jou vriendelike en vinnige diens. Vir uiters professionele en vriendelike diens skakel gerus vir Pedri by Blue Auto. ",
  },
];

// Create a component that shows customer reviews
const Reviews = () => {
  // create a state variable to keep track of the current review
  const [reviewIndex, setReviewIndex] = React.useState(0);

  // create a useeffect based on a timeout to change the reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((reviewIndex + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviewIndex]);

  return (
    <div>
      <Heading>Customer Feedback</Heading>
      <Container>
        <div>
          <p>&quot;{reviews[reviewIndex].review}&quot;</p>
          <span>- {reviews[reviewIndex].name}</span>
        </div>
        {/* {reviews.map((review, key) => {
          return (
            <div key={key}>
              <p>&quot;{review.review}&quot;</p>
              <span>- {review.name}</span>
            </div>
          );
        })} */}
      </Container>
    </div>
  );
};

const Container = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  p {
    margin-bottom: 10px;
    font-family: Roboto, sans-serif;
    font-style: italic;
    letter-spacing: 0.4px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const Heading = styled.div`
  margin-top: 150px;
  margin-bottom: 25px;
  align-items: flex-end;
  display: flex;
  font-weight: bold;
  font-size: 16px;
  color: ultramarine;
  @media (max-width: 900px) {
    display: none;
  }
`;

export default Reviews;
