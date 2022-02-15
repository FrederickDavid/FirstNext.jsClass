import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [getData, setGetData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3001/api/photo");
    if (res) {
      setGetData(res.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper>
        {getData?.map(({ _id, userName, course, image }) => (
          <Card key={_id}>
            <ImageTag src={image} alt="image" />
            <Name>{userName}</Name>
            <Stack>{course}</Stack>
            <Holder>
              <Delete>Delete</Delete>
              <Delete>Enter</Delete>
            </Holder>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: calc(90vh - 70px);
  background-color: whitesmoke;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;
const Card = styled.div`
  width: 300px;
  height: 150px;
  border: 1px crimson solid;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  position: relative;
  margin: 60px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImageTag = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: crimson;
  position: absolute;
  top: -100px;
  left: 70px;
  object-fit: cover;
`;
const Name = styled.div`
  display: flex;
  margin-top: 30px;
`;
const Stack = styled.div`
  margin-bottom: 10px;
`;
const Holder = styled.div`
  display: flex;
  width: 130px;
  align-items: center;
  justify-content: space-between;
`;

const Delete = styled.button`
  padding: 5px 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 5px;
  transition: all 350ms;
  transform: scale(1);
  :hover {
    transform: scale(1.045);
    cursor: pointer;
  }
`;
