import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchData,
  getSearchKeyword,
  ISearchResult,
  ISearchWords,
} from "../api";
import { makeImagePath } from "../utils";
import { MdSearchOff } from "react-icons/md";
import { CiImageOff } from "react-icons/ci";
import { useForm } from "react-hook-form";

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
    background-color: black;
    color: white;
    border: 1px solid white;
    width: 100%;
    height: 100%;
  }
`;

const SearchWord = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0px;
  p {
    display: flex;
    padding-top: 30px;
    padding-bottom: 10px;
    align-content: center;
    justify-content: center;
    strong {
      font-weight: bold;
      font-size: 20px;
    }
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  float: right;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const KeywordInfo = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px;
`;

const KeywordLabel = styled.span`
  font-size: 26px;
  font-weight: 900;
  margin: 20px 0px;
`;

const KeywordResult = styled.li`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-evenly;
  &:after {
    content: "|";
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
  margin-top: 50vh;
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

interface ISearchForm {
  keywordSearch: string;
}

function SearchData({ keyword }: { keyword: string }) {
  const { data: searchData } = useQuery<ISearchResult>(
    ["search", keyword],
    () => getSearchData(keyword || "")
  );

  const { data: searchKeyword } = useQuery<ISearchWords>(
    ["searchKeyword", keyword],
    () => getSearchKeyword(keyword!),
    { enabled: !!keyword }
  );

  const navigate = useNavigate();
  const onBoxClicked = (id: number, menuName: string) => {
    navigate(`/search/${menuName}/${id}?keyword=${keyword}`);
  };

  const { register, handleSubmit, setValue } = useForm<ISearchForm>();

  const onValid = (data: ISearchForm) => {
    navigate(`/search?keyword=${data.keywordSearch}`);
    setValue("keywordSearch", "");
  };

  return (
    <>
      {searchData && searchData?.results.length !== 0 ? (
        <>
          <SearchWord>
            <p>
              <strong>"{keyword}"</strong> 으로 검색한 결과입니다
            </p>
            <Form onSubmit={handleSubmit(onValid)}>
              <Input type="text" {...register("keywordSearch")} />
            </Form>
            {searchKeyword?.results.length !== 0 ? (
              <>
                <KeywordLabel>다음과 관련된 콘텐츠 : </KeywordLabel>
                <KeywordInfo>
                  {searchKeyword?.results.slice(1, 13).map((data) => (
                    <KeywordResult key={data.id}>{data.name}</KeywordResult>
                  ))}
                </KeywordInfo>
              </>
            ) : null}
          </SearchWord>
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
        </>
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
