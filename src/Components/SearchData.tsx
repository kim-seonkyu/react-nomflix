import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSearchData, ISearchResult } from "../api";
import { makeImagePath } from "../utils";
import { MdSearchOff } from "react-icons/md";
import { CiImageOff } from "react-icons/ci";

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
  .noImg {
    background-color: white;
    color: black;
    width: 100%;
    height: 100%;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  display: block;
  float: left;
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

const NoData = styled.div`
  position: absolute;
  top: 39%;
  transform: translateY(-50%);
  padding-top: 80px;
  width: 100%;
  text-align: center;
  font-size: 60px;
  font-weight: 500;
`;

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

function SearchData({ keyword }: { keyword: string }) {
  const { data: searchData } = useQuery<ISearchResult>(
    ["search", keyword],
    () => getSearchData(keyword || "")
  );

  const navigate = useNavigate();
  const onBoxClicked = (id: number, menuName: string) => {
    navigate(`/search/${menuName}/${id}?keyword=${keyword}`);
  };

  return (
    <>
      {searchData && searchData?.results.length !== 0 ? (
        <Row>
          {searchData?.results.map((movie) => (
            <Box
              key={movie.id}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              transition={{ type: "tween" }}
              layoutId={movie.id + "" + movie.media_type}
              bgphoto={makeImagePath(
                movie.backdrop_path || movie.poster_path || "",
                "w500"
              )}
              onClick={() => {
                onBoxClicked(movie.id, movie.media_type);
              }}
            >
              {movie.backdrop_path || movie.poster_path ? (
                <Info variants={infoVariants}>
                  <h4>
                    {movie.title
                      ? movie.title
                      : movie.original_title || movie.name
                      ? movie.name
                      : movie.original_name}
                  </h4>
                </Info>
              ) : (
                <CiImageOff className="noImg" />
              )}
            </Box>
          ))}
        </Row>
      ) : (
        <NoData>
          <MdSearchOff />
          <p>
            <strong>"{keyword}" 검색 결과가 없습니다</strong>
          </p>
        </NoData>
      )}
    </>
  );
}

export default SearchData;
