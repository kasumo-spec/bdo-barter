import styled from "styled-components";

export const Container = styled.div`
  background: #96c3ec;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  h1 {
    padding: 10px;
    margin-bottom: 10px;
  }
  @media (min-width: 800px) {
    height: calc(100vh - 65px);
    flex-direction: column;
    align-items: center;
    position: relative;
  }
`;

export const ImageContent = styled.div`
  display: none;
  @media (min-width: 800px) {
    position: absolute;
    display: inline-block;
    bottom: 50px;
    right: 50px;
    width: 40%;
    height: 45%;
    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
`;

export const HabitsContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
  width: 100%;
  overflow-y: auto;
  z-index: 1;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
