import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import bgImg from "../images/bg.jpg";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    min-height: 100vh;
    font-family: 'Catamaran', sans-serif;
  }

  body {
    background-image: url(${bgImg});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .app__title {
    font-family: Fascinate Impact, Haettenschweiler, "Arial Narrow Bold",
      sans-serif;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 64px;
    text-align: center;
    margin: 16px;
  }

  .infoBar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    &__number,
    &__difficulty {
      color: darkblue;
    }

    &__score {
      color: gold;
      font-size: 1.5rem;
    }
  }

  .app__start,
  .app__next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 8px 0;
    padding: 0 40px;
  }

  .app__next:disabled {
    visibility: hidden;
  }

  @media screen and (max-width: 576px) {
    .app__title {
      font-size: 48px;
    }
  }
`;
