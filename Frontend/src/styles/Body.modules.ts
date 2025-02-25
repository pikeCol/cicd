import styled from "styled-components";

export const BodyContainer = styled.div`
  padding: 2rem;
  position: relative;
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem 0rem 1rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  position: absolute;
  top: 0;
  left: 0%;
  right: 0%;
  //text-align: center;
`;

export const MainHeading = styled.h1`
  font-family: "Newake";
  font-size: 5rem;
  font-weight: bold;
  color: #10002b;
  margin: 3.5rem 0rem 0.1rem 0rem;
`;

export const SubHeading = styled.p`
  font-family: "Madeleina Sans";
  font-size: 2.5rem;
  color: #10002b;
  margin: -0.5rem 0;
`;

export const SignUpButton = styled.button`
  background-color: #ffb96a;
  color: #2d004d;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-family: "Newake";
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 10px 20px;
  margin-top: 0.7rem;
  &:hover {
    transform: scale(1.1);
  }
`;

export const TrendingSection = styled.div`
  margin-top: -6.5rem;
  text-align: center;
  font-family: "Newake";
`;

export const TrendingHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const CardContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const CardContainer2 = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const SongCard = styled.div`
  background-color: #8a56ac;
  border-radius: 15px;
  width: 350px;
  transition: transform 0.3s ease;
  cursor: pointer;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0 0 12px rgba(200, 150, 220, 0.6);
  text-align: center;
  height: 210px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1160px) {
  }
`;

export const SongCard2 = styled.div`
  background-color: #8a71ac;
  border-radius: 15px;
  width: 350px;
  transition: transform 0.3s ease;
  cursor: pointer;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0 0 12px rgba(200, 150, 220, 0.6);
  text-align: center;
  height: 210px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1160px) {
  }
`;
