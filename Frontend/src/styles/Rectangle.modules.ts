import styled from 'styled-components';

export const RectangleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; 
  overflow: hidden; /* Prevent overflow */

  .custom-shape {
    width: 100%;
    height: auto; 
  }
`;
