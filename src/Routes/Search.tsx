import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { PathMatch, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getSearchKeyword, ISearchWords } from "../api";
import Modal from "../Components/Modal";
import SearchData from "../Components/SearchData";

const Wrapper = styled.div`
  background: #000;
  // 화면 x 좌표(좌우)가 늘어나면서 생기는 스크롤바를 숨겨줌
  /* overflow-x: hidden; */
`;

const SearchWord = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding: 100px;
  p {
    display: flex;
    padding-top: 30px;
    padding-bottom: 50px;
    align-content: center;
    justify-content: center;
    strong {
      font-weight: bold;
      font-size: 20px;
    }
  }
`;

const SearchResults = styled.div`
  position: relative;
  width: 100%;
  padding: 0px 58px;
`;

const KeywordInfo = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px;
`;

const KeywordLabel = styled.span`
  font-size: 26px;
  font-weight: 900;
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

/* 
  Search Keyword 추가 - Search Keywords API (추천하는 검색어)  
  Movie Section 추가 - Search TV Shows API 
  Tv Section 추가 - Search Movies API
*/

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchKeyword } = useQuery<ISearchWords>(
    ["searchKeyword", keyword],
    () => getSearchKeyword(keyword!),
    { enabled: !!keyword }
  );

  const bigMatch: PathMatch<string> | null = useMatch(`search/:menuName/:id`);

  return (
    <Wrapper>
      <SearchWord>
        <p>
          <strong>"{keyword}"</strong> 으로 검색한 결과입니다
        </p>

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
      <SearchResults>
        <SearchData keyword={keyword || ""} />
      </SearchResults>

      <AnimatePresence>
        {bigMatch ? (
          <Modal
            movieId={Number(bigMatch?.params.id)}
            listType={"search"}
            menuName={bigMatch.params.menuName || ""}
            requestUrl={bigMatch.params.menuName || ""}
            returnUrl={`/search?keyword=${keyword}`}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;
