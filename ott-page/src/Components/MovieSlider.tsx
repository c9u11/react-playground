import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";


const SliderWrapper = styled.div`
position: relative;
display:flex;
justify-content: center;
padding-top : 50px;
margin-bottom : 200px;
span {
  position: absolute;
  top:40px;
  left: 20px;
  transform: translate(0,-100%);
  font-size: 24px;
  font-weight: bold;
}
`;
const Row = styled(motion.div)`
display: grid;
gap: 20px;
grid-template-columns: repeat(6, 1fr);
position: absolute;
width: calc(100% - 100px);
`;

const RowIndexBtn = styled.button`
  position: absolute;
  width: 50px;
  height: 200px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 15px;
  color: white;
  border: none;
  z-index: 1;
  &.left{
    left:0px;
  }
  &.right{
    right:0px;
  }
`;

const Box = styled(motion.div) <{ bgPhoto: string }>`
overflow: hidden;
height: 200px;
background-image: linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0),rgba(0,0,0,1)), url(${props => props.bgPhoto});
background-size: cover;
background-position: center center;
cursor: pointer;
border-radius: 15px;
&:first-child {
  transform-origin: center left;
}
&:last-child {
  transform-origin: center right;
}
`;

const Info = styled(motion.div)`
padding: 10px;
background-color: rgba(0,0,0,0.5);
opacity: 0;
position: absolute;
width: 100%;
bottom: 0;
h4 {
  text-align: center;
  font-size: 18px;
}
`

const Overlay = styled(motion.div)`
position: fixed;
top: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.5);
opacity: 0;
z-index: 999;
`

const BigMovie = styled(motion.div)`
position: absolute;
width: 40vw;
left: 0;
right: 0;
margin: 0 auto;
border-radius: 15px;
overflow: hidden;
background-color: ${props => props.theme.black.lighter};
z-index: 999;
`;

const BigCover = styled.div`
width:100%;
background-size: cover;
background-position: center center;
height: 400px;
z-index: 999;
`;

const BigTitle = styled.h3`
color: ${props => props.theme.white.lighter};
padding: 20px;
font-size: 36px;
position: relative;
top: -100px;
z-index: 999;
`;

const BigOverview = styled.p`
position: relative;
padding: 20px;
top: -80px;
color: ${props => props.theme.white.lighter};
z-index: 999;
`

const rowVariants = {
  hidden: {
    x: window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth
  }
}

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    border: "white 5px solid",
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween"
    }
  }
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween"
    }
  }
}

interface ISlider {
  data: IGetMoviesResult | undefined;
  sliderTitle: string;
}
const offset = 6
function Slider({ data, sliderTitle }: ISlider) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string, category: string }>("/movies/:category/:movieId");
  const { scrollY } = useViewportScroll();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      rowVariants.hidden.x = Math.abs(rowVariants.hidden.x);
      rowVariants.exit.x = Math.abs(rowVariants.exit.x) * -1;
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex(prev => prev === maxIndex ? 0 : prev + 1);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      rowVariants.hidden.x = Math.abs(rowVariants.hidden.x) * -1;
      rowVariants.exit.x = Math.abs(rowVariants.exit.x);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex(prev => prev === 0 ? maxIndex : prev - 1);
    }
  };
  const toggleLeaving = () => setLeaving(prev => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${sliderTitle}/${movieId}`);
  }
  const onOverlayClick = () => history.push("/");
  const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => movie.id === +bigMovieMatch?.params.movieId)
  return (
    <>
      <SliderWrapper>
        <span>{sliderTitle}</span>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <RowIndexBtn key="left" className="left" onClick={decreaseIndex}>&larr;</RowIndexBtn>
          <RowIndexBtn key="right" className="right" onClick={increaseIndex}>&rarr;</RowIndexBtn>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={sliderTitle + index}
          >
            {data
              ?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map(movie =>
                <Box
                  layoutId={sliderTitle + movie.id}
                  key={sliderTitle + movie.id}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              )
            }
          </Row>
        </AnimatePresence>
      </SliderWrapper>
      <AnimatePresence>
        {bigMovieMatch && bigMovieMatch?.params.category === sliderTitle ?
          <>
            <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={sliderTitle + bigMovieMatch.params.movieId}
            >
              {clickedMovie &&
                <>
                  <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }}></BigCover>
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>
                    Release Date :{clickedMovie.release_date}
                    <br />
                    <br />
                    {clickedMovie.overview}
                  </BigOverview>
                </>
              }
            </BigMovie>
          </>
          : null}
      </AnimatePresence>
    </>
  )
}
export default Slider;