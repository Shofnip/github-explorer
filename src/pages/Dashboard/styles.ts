import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  margin-top: 80px;
  max-width: 450px;

  font-size: 46px;
  color: #3a3a3a;
  line-height: 56px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border: 0;
    border-radius: 0 5px 5px 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.08, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  margin-top: 8px;
  display: block;
  color: #c53030;
`;

export const RepositoriesContainer = styled.div`
  margin-top: 80px;
  max-width: 700px;

  div + div {
    margin-top: 10px;
  }
`;

export const Repository = styled.div`
  display: flex;

  transition: transform 0.2s;

  &:hover {
    transform: translateX(10px);
  }

  button {
    width: 30px;

    color: #3d3d4d;
    background: #e5e5e5;
    border: 0;
    border-radius: 5px 0 0 5px;

    transition: background-color 0.4s, color 0.4s ease;

    &:hover {
      color: #e5e5e5;
      background: #ef5b5b;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  a {
    background: #fff;
    border-radius: 0 5px 5px 0;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    flex: 1;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        margin-top: 4px;
        font-size: 18px;
        color: #a8a8b3;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }

    & + a {
      margin-top: 10px;
    }
  }
`;
