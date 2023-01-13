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

const SearchResults = styled.div`
  position: relative;
  width: 100%;
  padding: 100px 58px;
`;

/* 
  Movie Section 추가 - Search TV Shows API 
  Tv Section 추가 - Search Movies API
*/

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const bigMatch: PathMatch<string> | null = useMatch(`search/:menuName/:id`);

  return (
    <Wrapper>
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
