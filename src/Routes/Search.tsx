import { AnimatePresence } from "framer-motion";
import { PathMatch, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import Modal from "../Components/Modal";
import SearchData from "../Components/SearchData";

const Wrapper = styled.div`
  background: #000;
  // 화면 x 좌표(좌우)가 늘어나면서 생기는 스크롤바를 숨겨줌
  /* overflow-x: hidden; */
`;

const SearchWord = styled.form`
  color: white;
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding: 100px;
  p {
    padding-top: 30px;
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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const bigMatch: PathMatch<string> | null = useMatch(`search/:menuName/:id`);

  return (
    <Wrapper>
      <SearchWord>
        <p>
          <strong>"{keyword}"</strong> 으로 검색한 결과입니다
        </p>
      </SearchWord>
      <SearchResults>
        {keyword && <SearchData keyword={keyword || ""} />}
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
