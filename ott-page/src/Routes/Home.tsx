import { useQuery } from "react-query";
import styled from "styled-components";
import { getMoviesNowPlaying, getMoviesTopRated, getMoviesUpcoming, IGetMoviesResult } from "../api";
import Icon from "../Components/Icon";
import Slider from "../Components/MovieSlider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  overflow-x: hidden;
  background-color: ${props => props.theme.black.darker};
`;

const Loader = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Banner = styled.div<{ bgPhoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-image: linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0),rgba(0,0,0,1)), url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center;
  text-shadow: 3px 2px 7px rgb(0 0 0 / 80%), 1px 1px 8px rgb(20 20 20 / 80%);
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 23px;
  width: 50%;
`;


function Home() {
  const { data: nowPlayingMovie, isLoading: nowPlayingMovieLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMoviesNowPlaying);
  const { data: topRatedMovie, isLoading: topRatedMovieLoading } = useQuery<IGetMoviesResult>(["movies", "topRated"], getMoviesTopRated);
  const { data: upComingMovie, isLoading: upComingMovieLoading } = useQuery<IGetMoviesResult>(["movies", "upComing"], getMoviesUpcoming);
  return (
    <Wrapper>
      {nowPlayingMovieLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Banner bgPhoto={makeImagePath(nowPlayingMovie?.results[0].backdrop_path || "")}>
            <Title>{nowPlayingMovie?.results[0].title}</Title>
            <Overview>{nowPlayingMovie?.results[0].overview}</Overview>
          </Banner>
          <Slider key="NowPlaying" data={nowPlayingMovie} sliderTitle="Now Playing"></Slider>
        </>
      }
      {topRatedMovieLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Slider key="TopRated" data={topRatedMovie} sliderTitle="Top Rated"></Slider>
        </>
      }
      {upComingMovieLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Slider key="Upcoming" data={upComingMovie} sliderTitle="Upcoming"></Slider>
        </>
      }
    </Wrapper>
  )
}
export default Home;