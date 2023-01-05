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

function Home() {
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );

  const { data: upComing } = useQuery<IGetMoviesResult>(
    ["movies", "upComing"],
    getUpComingMovies
  );

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
              mediaName={"home"}
            ></Slider>

            <Slider
              data={upComing as IGetMoviesResult}
              title={"개봉 예정 영화"}
              mediaName={"home"}
            ></Slider>
          </SliderArea>

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
