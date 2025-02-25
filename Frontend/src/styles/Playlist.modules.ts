import { position } from "@chakra-ui/react";
import styled from "styled-components";

export const PlaylistWrapper = styled.div`
  position: relative;
  margin-top: 60px;
  color: #2d004d;
  background-color: #3c096c;
  height: 100%;

  .findChords {
    width: 200px;
    height: 65px;
    border-radius: 30px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    background-color: #ffb96a;
    color: #2d004d;
    font-family: "Newake", sans-serif;
    font-size: 1.6rem;
    margin: 0.7rem auto;
    display: block;
  }

  .findChords:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }

  .inputRow {
    margin-top: 1.5rem;
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 600px;
  }

  .text1 {
    font-family: "Newake";
    color: #2d004d;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem 0rem 1rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .Input1,
  .Input2 {
    display: flex;
    flex-direction: column;
    /* margin-bottom: 10px; */

    label {
      font-size: 1rem;
      color: #2d004d;
    }

    input[type="text"] {
      padding: 1;
      box-sizing: border-box;
      font-family: "Madeleina Sans";
      color: #2d004d;
      width: 100%;
      padding: 12px;
      /* margin-top: 5px; */
      border-radius: 100px !important;
      border: 1px solid #ccc;
      background-color: #f0f0f0;
      color: #333;

      outline: none;
      transition: background-color 0.3s ease;

      input[type="submit"] {
        opacity: 1;
      }

      &:focus {
        background-color: #e0e0e0;
        border-color: #333;
      }

      &:hover {
        background-color: #ffb96a;
      }
    }
  }

  .inputField {
    display: flex;
    flex-direction: column;
  }

  .inputField label {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #2d004d;
  }

  .inputField input[type="text"] {
    padding: 10px;
    border-radius: 30px;
    border: 1px solid #ccc;
    /* width: 100%; */
    font-size: 1.7rem;
    width: 300px;
    height: 65px;
    margin-bottom: 10px;
  }
`;

export const RectWrapper = styled.div`
  position: relative;
`;
export const InputWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 1rem 0rem 1rem;
  font-family: "Newake";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
`;

export const AddButton = styled.div`
  .submit {
    width: 200px;
    height: 65px;
    padding: 12px;
    border-radius: 100px !important;
    font-weight: bold;
    border: none;
    cursor: pointer;
    background-color: #ffb96a !important;
    color: #2d004d !important;
    border-radius: 30px;
    font-family: "Newake";
    font-size: 1.5rem;
    /* margin-top: 0.7rem; */
    &:hover {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
  }
`;

export const ListWrapper = `
font-family: 'Newake'
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Table = styled.table`
  width: 600px;

  .sBuck {
    font-family: "Newake";
    font-size: 45px;
    color: #fff;
  }

  .buttons {
    white-space: nowrap;
  }

  button {
    font-size: 1rem;
    background-color: #ffb96a;
    font-family: "Newake";
    color: #2d004d;
    border: none;
    border-radius: 20px;
    height: 40px;
    width: 120px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  button:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }

  .song {
    font-size: 1.5rem;
    font-family: "Newake";
    color: #fff;
  }
  .artist {
    font-size: 1.5rem;
    font-family: "Newake";
    color: #fff;
  }
  .index {
    font-size: 1.5rem;
    font-family: "Newake";
    width: 50px;
    color: #fff;
  }
  .row {
    td {
      text-align: left;
    }
  }
  .t-header {
    th {
      text-align: left;
    }
  }
`;
