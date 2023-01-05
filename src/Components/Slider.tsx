import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import useWindowDimensions from "../useWindowDimensions";

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
  &:blur {
    color: #fff;
    background-color: #000;
  }
  svg {
    width: 28px;
    height: 28px;
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
  margin-bottom: 3rem;
  clear: both;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
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
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const rowVariants = {
  initial: (right: number) => {
    return {
      x: right === 1 ? window.innerWidth + 10 : -window.innerWidth - 10,
    };
  },
  animate: {
    x: 0,
    y: 0,
  },
  exit: (right: number) => {
    return {
      x: right === 1 ? -window.innerWidth - 10 : window.innerWidth + 10,
    };
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -40,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

export default function Slider({
  data,
  title,
}: {
  data: IGetMoviesResult;
  title: string;
}) {
  const [isRight, setIsRight] = useState(1);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = (value: boolean) => {
    setLeaving(value);
  };

  const changeIndex = (right: number) => {
    if (leaving) return;

    if (data) {
      toggleLeaving(true);
      setIsRight(right);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      right === 1
        ? setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
        : setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const width = useWindowDimensions();
  const rowProps = {
    variants: rowVariants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: { type: "tween", duration: 1 },
    key: index,
  };

  const onClickArrow = (right: number) => {
    if (!leaving) {
      changeIndex(right);
    }
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <LeftArrow className="arrow" onClick={() => onClickArrow(-1)}>
        <AiOutlineLeft />
      </LeftArrow>

      <RigthArrow className="arrow" onClick={() => onClickArrow(1)}>
        <AiOutlineRight />
      </RigthArrow>

      <AnimatePresence
        initial={false}
        onExitComplete={() => toggleLeaving(false)}
        custom={isRight}
      >
        <Row
          {...rowProps}
          variants={rowVariants}
          initial={{ x: isRight === 1 ? width + 10 : -width - 10 }}
          animate={{ x: 0 }}
          exit={{ x: isRight === 1 ? -width - 10 : width + 10 }}
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
                layoutId={movie.id + ""}
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title ? movie.title : movie.original_title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
}
