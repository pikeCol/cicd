import React from "react";
import styled from "styled-components";

const ToastContainer = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: ${(props) => (props.show ? "20px" : "-400px")};
  color: #2d004d;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: "Newake", sans-serif;
  z-index: 1100;
  max-width: 300px;
  text-align: center;
  line-height: 1.2;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return <ToastContainer show={show}>{message}</ToastContainer>;
};

export default Toast;
