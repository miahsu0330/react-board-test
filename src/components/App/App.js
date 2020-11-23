import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

const Page = styled.div`
  width: 500px;
  margin: 0 auto;
  border: 1px solid #f5f5f5;
`;

const Title = styled.h1``;
const MessageForm = styled.form``;
const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
  margin: 5px;
`;
const SubmitButton = styled.button``;
const MessageList = styled.div`
  border-top: 1px solid #333;
  margin-top: 20px;
`;
const MessageContainer = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #f5f5f5;
`;

const MessageHead = styled.div`
  display: flex;
  aligin-items: center;
`;

const MessageAuthor = styled.div``;
const MessageTime = styled.div``;
const MessageBody = styled.div``;

function Message({ author, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

const ErrorMassage = styled.div`
  color: red;
`;
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.string,
};

function App() {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState();
  const [postMessageError, setPostMessageError] = useState(null);
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) {
      return;
    }
    setIsLoadingPostMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "hello",
        body: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok === 0) {
          setPostMessageError(data.message);
        }
        fetchMessages();
        setValue("");
        setIsLoadingPostMessage(false);
      })
      .catch((err) => {
        setPostMessageError(err.message);
        setIsLoadingPostMessage(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Page>
      {isLoadingPostMessage && <Loading>Loading....</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea value={value} onChange={handleTextareaChange} />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && (
          <ErrorMassage>
            Somthing went wrong. {postMessageError.toString()}
          </ErrorMassage>
        )}
      </MessageForm>
      {messageApiError && (
        <ErrorMassage>
          Somthing went wrong. {messageApiError.toString()}
        </ErrorMassage>
      )}
      {messages && messages.length === 0 && <div>no message</div>}
      <MessageList>
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
            >
              {message.body}
            </Message>
          ))}
      </MessageList>
    </Page>
  );
}

export default App;

//https://student-json-api.lidemy.me
