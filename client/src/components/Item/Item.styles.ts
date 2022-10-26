import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  // border-radius: 20px;
  height: 100%;
  box-shadow: 0 5px 25px rgba(97, 92, 92, 0.1);

  button {
    // border-radius: 0 0 20px 20px;
    width: 100%;
  }

  .productItem {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }

  h5, h1, h3, p {
    padding: 0;
    margin: 10px 0;
  }
`;

export const WrapperSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  // border-radius: 20px;
  height: 100%;
  box-shadow: 0 5px 25px rgba(97, 92, 92, 0.1);
`;
