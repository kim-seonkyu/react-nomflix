import { motion } from "framer-motion";
import styled from "styled-components";
import { AiFillCaretRight, AiOutlineInfoCircle } from "react-icons/ai";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 900;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 10px;
`;
interface IBanner {
  color: string;
  bgcolor: string;
  hovercolor: string;
}

const Bannerbtn = styled(motion.button)<IBanner>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  transition: all 0.5s ease-in-out;
  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
`;

const Playbtn = styled(Bannerbtn)`
  width: 140px;
`;

const Detailbtn = styled(Bannerbtn)`
  width: 140px;
`;

const Btnicon = styled.div`
  width: 28px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  svg {
    width: 50px;
    height: 50px;
  }
`;

const Btntext = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

function Banner({ banner }: { banner: IMovie }) {
  return (
    <Wrapper bgphoto={makeImagePath(banner.backdrop_path || "")}>
      <Title>{banner.title ? banner.title : banner.original_title}</Title>
      <Overview>{banner.overview}</Overview>
      <ButtonArea>
        <Playbtn
          color={"#141414"}
          bgcolor={"rgba(255, 255, 255, 1)"}
          hovercolor={"rgba(255, 255, 255, 0.7)"}
        >
          <Btnicon>
            <AiFillCaretRight />
          </Btnicon>
          <Btntext>재생</Btntext>
        </Playbtn>
        <Detailbtn
          color={"#FFFFFF"}
          bgcolor={"rgba(107, 107, 107, 0.7)"}
          hovercolor={"rgba(107, 107, 107, 0.3)"}
        >
          <Btnicon>
            <AiOutlineInfoCircle />
          </Btnicon>
          <Btntext>상세 정보</Btntext>
        </Detailbtn>
      </ButtonArea>
    </Wrapper>
  );
}

export default Banner;
