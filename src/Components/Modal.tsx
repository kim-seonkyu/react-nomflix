import { motion } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalBox = styled(motion.div)`
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

const ModalCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 30px;
  position: relative;
  top: -55px;
`;

const ModalOverview = styled.p`
  padding: 20px;
  top: -55px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

interface IModal {
  movieId: number;
  mediaName: string;
}

export default function Modal({ movieId, mediaName }: IModal) {
  const navigate = useNavigate();
  const modalMatch: PathMatch<string> | null = useMatch(`/${mediaName}/:id`);

  return null;
}
