import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getToprateMovies,
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

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
  path {
    stroke-width: 6px;
    stroke: white;
  }
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

  const { data: popular } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const { data: topRate } = useQuery<IGetMoviesResult>(
    ["movies", "topRate"],
    getToprateMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          ></Logo>
          Loading...
        </Loader>
      ) : (
        <>
          <Banner
            banner={nowPlaying?.results[0] as IMovie}
            detailSearchUrl={"home/banner"}
            requestUrl={"movie"}
          />
          <SliderArea>
            <Slider
              data={nowPlaying as IGetMoviesResult}
              title={"현재 상영 중인 영화"}
              menuName={"home"}
              mediaType={"movie"}
              listType={"now_playing"}
            ></Slider>

            <Slider
              data={upComing as IGetMoviesResult}
              title={"개봉 예정 영화"}
              menuName={"home"}
              mediaType={"movie"}
              listType={"upcoming"}
            ></Slider>

            <Slider
              data={popular as IGetMoviesResult}
              title={"가장 인기있는 영화"}
              menuName={"home"}
              mediaType={"movie"}
              listType={"popular"}
            ></Slider>

            <Slider
              data={topRate as IGetMoviesResult}
              title={"별점이 높은 영화"}
              menuName={"home"}
              mediaType={"movie"}
              listType={"top_rate"}
            ></Slider>
          </SliderArea>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
