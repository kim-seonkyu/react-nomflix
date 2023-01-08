import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import styled, { createGlobalStyle } from "styled-components";
import { getDetailData, IGenre, IGetDetailData } from "../api";
import { makeImagePath } from "../utils";

const GlobalStyle = createGlobalStyle`
  html{overflow: hidden;}
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 99;
`;

const ModalBox = styled(motion.div)`
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  min-width: 900px;
  height: 75%;
  overflow: auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  z-index: 100;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-track {
    background-color: #4e4e4e;
    border-radius: 100px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const ModalCover = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const ModalCoverTitle = styled.div`
  position: absolute;
  left: calc(30% + 35px);
  bottom: 20px;
  float: right;
  font-weight: 700;
`;

const ModalTitle = styled.h3`
  font-size: 36px;
  padding-left: 5px;
  padding-bottom: 5px;
`;

const ModalSmallTitle = styled.h3`
  font-size: 18px;

  padding-left: 10px;
  font-weight: 400;
`;

const ModalContents = styled.div`
  position: relative;
  padding: 2rem 4rem 0 4rem;
  font-weight: 100;
`;

const ModalImage = styled.div`
  float: left;
  margin-left: -30px;
  width: 30%;
  margin-top: -170px;
  img {
    width: 100%;
  }
`;

const ModalInfoTitle = styled.div`
  display: none;
`;

const ModalTextCnt = styled.div`
  float: left;
  width: 70%;
  padding-left: 2rem;
`;

const ModalInfo = styled.ul`
  font-size: 16px;
  line-height: 10px;
  margin-left: -10px;

  li {
    padding: 5px;
    float: left;
    .rating {
      position: relative;
      display: inline-block;
      margin-top: -2px;
      height: 24px;
      overflow: hidden;
    }
    .ratingValue {
      display: inline-block;
      padding-left: 0.4rem;
      vertical-align: top;
    }
    span {
      height: 24px;
    }
  }
  li ~ li {
    position: relative;
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    padding: 5px;
  }
  li ~ li:before {
    content: "";
    position: absolute;
    justify-content: center;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #7e7e7e;
  }
  li:last-child:before {
    top: 5;
  }
`;

const ModalTagLine = styled.h3`
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-size: 14px;
  &:before {
    content: "";
    position: absolute;
    width: 0.3rem;
    height: 1.2rem;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ccc;
  }
`;

const ModalOverview = styled.p`
  margin-bottom: 5rem;
  font-size: 14px;
  line-height: 1.5rem;
`;

const ModalCategory = styled.ul`
  padding: 2rem 0;
  clear: both;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ModalItem = styled.li`
  display: block;
  margin-bottom: 2rem;
`;

interface IModal {
  movieId: number;
  menuName: string;
  listType: string;
  requestUrl: string;
  returnUrl?: string;
}

export default function Modal({
  movieId,
  menuName,
  listType,
  requestUrl,
  returnUrl,
}: IModal) {
  const navigate = useNavigate();
  const modalMatch: PathMatch<string> | null = useMatch(
    `/${menuName}/${listType}/:id`
  );
  const onOverlayClicked = () => {
    if (menuName === "home") menuName = "";

    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate(`/${menuName}`);
    }
  };

  const { data: detailMovie } = useQuery<IGetDetailData>(
    [listType + movieId, "detail" + movieId],
    () => getDetailData(requestUrl, movieId) || null
  );

  interface IModalItem {
    data: string | number;
  }

  function ModalInfoItem({ data }: IModalItem) {
    return <>{data ? <li>{data}</li> : null}</>;
  }

  const getYear = (data: string) => {
    if (data) {
      return data.split("-")[0];
    } else {
      return "";
    }
  };

  const getGenre = (arr: IGenre[]): string => {
    if (arr && arr.length > 0) {
      return (
        arr.map((g, idx) => {
          return idx + 1 === arr.length ? `${g.name}` : `${g.name}`;
        }) + ""
      );
    }
    return "";
  };

  return (
    <>
      <GlobalStyle />
      <Overlay
        onClick={onOverlayClicked}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <ModalBox layoutId={modalMatch?.params.id + listType}>
        {
          <>
            <ModalCover
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent),url(${makeImagePath(
                  detailMovie?.backdrop_path || "",
                  "w500"
                )})`,
              }}
            >
              <ModalCoverTitle>
                <ModalTitle>
                  {detailMovie?.title
                    ? detailMovie.title
                    : detailMovie?.original_title}
                </ModalTitle>
                <ModalSmallTitle>
                  {detailMovie?.original_title
                    ? detailMovie?.original_title
                    : ""}
                </ModalSmallTitle>
              </ModalCoverTitle>
            </ModalCover>
            <ModalContents>
              <ModalImage>
                <img
                  src={makeImagePath(detailMovie?.poster_path || "", "w500")}
                  alt="poster_image"
                />
              </ModalImage>
              <ModalTextCnt>
                <ModalInfoTitle>
                  <ModalTitle>
                    {detailMovie?.title
                      ? detailMovie.title
                      : detailMovie?.original_title}
                  </ModalTitle>
                  <ModalSmallTitle>
                    {detailMovie?.original_title
                      ? detailMovie?.original_title
                      : ""}
                  </ModalSmallTitle>
                </ModalInfoTitle>
                <ModalInfo>
                  <ModalInfoItem
                    data={getYear(
                      detailMovie?.release_date
                        ? detailMovie?.release_date
                        : detailMovie?.last_air_date || ""
                    )}
                  />

                  <ModalInfoItem
                    data={getYear(
                      detailMovie?.runtime ? `${detailMovie.runtime}분` : ""
                    )}
                  />
                  <ModalInfoItem data={getGenre(detailMovie?.genres || [])} />
                  <ModalInfoItem
                    data={`총 ${detailMovie?.number_of_seasons} 시즌` || ""}
                  />
                  {detailMovie?.vote_average ? (
                    <li>
                      <ReactStars
                        count={5}
                        value={
                          detailMovie?.vote_average
                            ? detailMovie?.vote_average / 2
                            : 0
                        }
                        color1="#E6E6E6"
                        color2="#FFCC33"
                        half
                        size={20}
                        edit={false}
                        className="rating"
                      />
                      <span className="ratingValue">
                        ({detailMovie?.vote_average.toFixed(1)})
                      </span>
                    </li>
                  ) : null}
                </ModalInfo>
                <ModalCategory>
                  <ModalItem>
                    {detailMovie?.tagline ? (
                      <ModalTagLine>{detailMovie.tagline}</ModalTagLine>
                    ) : null}
                    <ModalOverview title={detailMovie?.overview}>
                      {detailMovie && detailMovie.overview.length > 300
                        ? detailMovie.overview.slice(0, 390) + "..."
                        : detailMovie?.overview}
                    </ModalOverview>
                  </ModalItem>
                </ModalCategory>
              </ModalTextCnt>
            </ModalContents>
          </>
        }
      </ModalBox>
    </>
  );
}
