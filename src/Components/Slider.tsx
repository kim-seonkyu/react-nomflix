import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Wrapper = styled.div`
  position: relative;
  top: -300px;
  min-height: 240px;
  margin-top: 30px;
  overflow: hidden;
  :hover .arrow {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 20px;
  padding-left: 20px;
  font-weight: 600;
  padding-bottom: 10px;
  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }
`;

const ArrowBtn = styled.div`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.3s;
  z-index: 99;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: #fff;
  }
  svg {
    width: 28px;
    height: 28px;
  }
  @media screen and (max-width: 1000px) {
    width: 40px;
    height: 40px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const LeftArrow = styled(ArrowBtn)`
  left: 0;
`;

const RigthArrow = styled(ArrowBtn)`
  right: 0;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  left: 0;
  margin-bottom: 30px;
  clear: both;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  display: block;
  float: left;
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 200px;
  font-size: 30px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: relative;
  top: 170px;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const rowVariants = {
  hidden: (isNext: boolean) => {
    return {
      x: isNext ? -window.innerWidth - 5 : window.innerWidth + 5,
    };
  },
  visible: {
    x: 0,
  },
  exit: (isNext: boolean) => {
    return {
      x: isNext ? window.innerWidth + 5 : -window.innerWidth - 5,
    };
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -40,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

interface ISlider {
  data: IGetMoviesResult;
  title: string;
  menuName: string;
  listType: string;
  mediaType: string;
}

export default function Slider({
  data,
  title,
  menuName,
  listType,
  mediaType,
}: ISlider) {
  const [isNext, setIsNext] = useState(true);
  const [index, setIndex] = useState(0);
  const [isleaving, setIsLeaving] = useState(false);

  const toggleLeaving = () => setIsLeaving((prev) => !prev);

  const prevIndex = () => {
    if (data) {
      if (isleaving) return;

      const movieLength = data.results.length - 1;
      const maxIndex = Math.ceil(movieLength / offset) - 1;

      toggleLeaving();
      setIsNext(false);

      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const nextIndex = () => {
    if (data) {
      if (isleaving) return;

      const movieLength = data.results.length - 1;
      const maxIndex = Math.ceil(movieLength / offset) - 1;

      toggleLeaving();
      setIsNext(true);

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const navigate = useNavigate();
  const onBoxClicked = (media: string, id: number, type: string) => {
    navigate(`/${media}/${type}/${id}`);
  };

  const bigMatch: PathMatch<string> | null = useMatch(
    `${menuName}/${listType}/:id`
  );

  return (
    <Wrapper>
      <Title>{title}</Title>
      <LeftArrow className="arrow" onClick={prevIndex}>
        <AiOutlineLeft />
      </LeftArrow>

      <RigthArrow className="arrow" onClick={nextIndex}>
        <AiOutlineRight />
      </RigthArrow>

      <AnimatePresence
        custom={isNext}
        initial={false}
        onExitComplete={toggleLeaving}
      >
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            type: "tween",
            duration: 1,
          }}
          key={index}
          custom={isNext}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                key={movie.id}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                layoutId={movie.id + "" + listType}
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
                onClick={() => {
                  onBoxClicked(menuName, movie.id, listType);
                }}
              >
                <Info variants={infoVariants}>
                  <h4>
                    {movie.title
                      ? movie.title
                      : movie.original_title || movie.name
                      ? movie.name
                      : movie.original_name}
                  </h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <AnimatePresence>
        {bigMatch ? (
          <Modal
            movieId={Number(bigMatch?.params.id)}
            listType={listType}
            menuName={menuName}
            requestUrl={mediaType}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
