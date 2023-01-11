import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { AiFillCaretRight, AiOutlineInfoCircle } from "react-icons/ai";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";
import Modal from "./Modal";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  @media screen and (max-width: 1000px) {
    height: 60%;
    min-height: 800px;
    padding: 30px;
  }
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 900;
  @media screen and (max-width: 1000px) {
    font-size: 30px;
  }
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  font-weight: 600;
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    font-size: 15px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 10px;
`;
interface IBannerBtn {
  color: string;
  bgcolor: string;
  hovercolor: string;
}

const BannerBtn = styled(motion.button)<IBannerBtn>`
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

const PlayBtn = styled(BannerBtn)`
  width: 140px;
`;

const DetailBtn = styled(BannerBtn)`
  width: 140px;
`;

const BtnIcon = styled.div`
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

const BtnText = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

interface IBanner {
  banner: IMovie;
  detailSearchUrl: string;
  requestUrl: string;
}

function Banner({ banner, detailSearchUrl, requestUrl }: IBanner) {
  const bigMatch: PathMatch<string> | null = useMatch(`/:mediaName/banner/:id`);
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/${detailSearchUrl}/${id}`);
  };

  return (
    <Wrapper bgphoto={makeImagePath(banner.backdrop_path || "")}>
      <Title>{banner.title ? banner.title : banner.name}</Title>
      <Overview>{banner.overview}</Overview>
      <ButtonArea>
        <PlayBtn
          color={"#141414"}
          bgcolor={"rgba(255, 255, 255, 1)"}
          hovercolor={"rgba(255, 255, 255, 0.7)"}
        >
          <BtnIcon>
            <AiFillCaretRight />
          </BtnIcon>
          <BtnText>재생</BtnText>
        </PlayBtn>
        <DetailBtn
          color={"#FFFFFF"}
          bgcolor={"rgba(107, 107, 107, 0.7)"}
          hovercolor={"rgba(107, 107, 107, 0.3)"}
          onClick={() => onBoxClicked(banner.id)}
        >
          <BtnIcon>
            <AiOutlineInfoCircle />
          </BtnIcon>
          <BtnText>상세 정보</BtnText>
        </DetailBtn>
      </ButtonArea>
      <AnimatePresence>
        {bigMatch ? (
          <Modal
            movieId={Number(bigMatch?.params.id)}
            listType={"bannerMovie"}
            menuName={bigMatch.params.menuName || ""}
            requestUrl={requestUrl}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Banner;
