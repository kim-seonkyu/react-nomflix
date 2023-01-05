import { useQuery } from "@tanstack/react-query";
import { motion, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getUpComingMovies,
  IGetMoviesResult,
  IMovie,
} from "../api";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import useWindowDimensions from "../useWindowDimensions";

const Wrapper = styled.div`
  background: #000;
  padding-bottom: 200px;
  // 화면 x 좌표(좌우)가 늘어나면서 생기는 스크롤바를 숨겨줌
  /* overflow-x: hidden; */
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderArea = styled.div`
  position: relative;
  margin-top: 130px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 30px;
  position: relative;
  top: -55px;
`;

const BigOverview = styled.p`
  padding: 20px;
  top: -55px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<"movieId"> | null =
    useMatch("/movies/:movieId");
  const { scrollY } = useScroll();

  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );

  const { data: upComing } = useQuery<IGetMoviesResult>(
    ["movies", "upComing"],
    getUpComingMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // const increaseIndex = () => {
  //   if (data) {
  //     if (leaving) return;
  //     toggleLeaving();
  //     const totalMovies = data.results.length - 1;
  //     const maxIndex = Math.ceil(totalMovies / offset) - 1;
  //     setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  //   }
  // };
  // const toggleLeaving = () => setLeaving((prev) => !prev);
  // const width = useWindowDimensions();
  // const onBoxClicked = (movieId: number) => {
  //   navigate(`/movies/${movieId}`);
  // };
  // const onOverlayClick = () => navigate(-1);
  // const clickedMovie =
  //   bigMovieMatch?.params.movieId &&
  //   data?.results.find(
  //     (movie) => movie.id + "" === bigMovieMatch.params.movieId
  //   );
  // console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner banner={nowPlaying?.results[0] as IMovie} />
          <SliderArea>
            <Slider
              data={nowPlaying as IGetMoviesResult}
              title={"현재 상영 중인 영화"}
            ></Slider>

            <Slider
              data={upComing as IGetMoviesResult}
              title={"개봉 예정 영화"}
            ></Slider>
          </SliderArea>
          {/* <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: width - 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width + 10 }}
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      $bgPhoto={makeImagePath(
                        movie.backdrop_path || movie.poster_path
                      )}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider> */}

          {/*  <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent),url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie> */}
        </>
        /*   ) : null}
          </AnimatePresence> */
        /*     </> */
      )}
    </Wrapper>
  );
}

export default Home;
