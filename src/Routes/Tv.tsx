import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRateTv,
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

function Tv() {
  const { data: tv_popular, isLoading } = useQuery<IGetMoviesResult>(
    ["tv", "popular"],
    getPopularTv
  );

  const { data: tv_topRate } = useQuery<IGetMoviesResult>(
    ["tv", "topRate"],
    getTopRateTv
  );

  const { data: onTheAir } = useQuery<IGetMoviesResult>(
    ["tv", "OnTheAir"],
    getOnTheAirTv
  );

  const { data: airingToday } = useQuery<IGetMoviesResult>(
    ["tv", "AiringToday"],
    getAiringTodayTv
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            banner={tv_popular?.results[0] as IMovie}
            detailSearchUrl={"tv/banner"}
            requestUrl={"tv"}
          />
          <SliderArea>
            <Slider
              data={tv_popular as IGetMoviesResult}
              title={"가장 인기있는 영화"}
              menuName={"tv"}
              mediaType={"tv"}
              listType={"popular"}
            ></Slider>

            <Slider
              data={tv_topRate as IGetMoviesResult}
              title={"별점이 높은 영화"}
              menuName={"tv"}
              mediaType={"tv"}
              listType={"top_rate"}
            ></Slider>

            <Slider
              data={onTheAir as IGetMoviesResult}
              title={"On The Air"}
              menuName={"tv"}
              mediaType={"tv"}
              listType={"on_the_air"}
            ></Slider>

            <Slider
              data={airingToday as IGetMoviesResult}
              title={"Airing Today"}
              menuName={"tv"}
              mediaType={"tv"}
              listType={"airing_today"}
            ></Slider>
          </SliderArea>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
