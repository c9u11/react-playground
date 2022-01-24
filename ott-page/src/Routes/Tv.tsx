import { useQuery } from "react-query";
import styled from "styled-components";
import { getTVAiringToday, getTVLastest, getTVPopular, getTVTopRated, IGetMoviesResult, IMovie } from "../api";
import Icon from "../Components/Icon";
import Slider from "../Components/TVSlider";
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


function Tv() {
  const { data: lastestTV, isLoading: lastestTVLoading } = useQuery<IMovie>(["tv", "lastest"], getTVLastest);
  const { data: airingTodayTV, isLoading: airingTodayTVLoading } = useQuery<IGetMoviesResult>(["tv", "airingToday"], getTVAiringToday);
  const { data: popularTV, isLoading: popularTVLoading } = useQuery<IGetMoviesResult>(["tv", "popular"], getTVPopular);
  const { data: topRatedTV, isLoading: topRatedTVLoading } = useQuery<IGetMoviesResult>(["tv", "topRated"], getTVTopRated);
  return (
    <Wrapper>
      {lastestTVLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Banner bgPhoto={makeImagePath(lastestTV?.backdrop_path || "")}>
            <Title>{lastestTV?.title}</Title>
            <Overview>{lastestTV?.overview}</Overview>
          </Banner>
        </>
      }
      {airingTodayTVLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Slider key="AiringToday" data={airingTodayTV} sliderTitle="Airing Today"></Slider>
        </>
      }
      {popularTVLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Slider key="Popular" data={popularTV} sliderTitle="Popular"></Slider>
        </>
      }
      {topRatedTVLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <Slider key="TopRated" data={topRatedTV} sliderTitle="Top Rated"></Slider>
        </>
      }
    </Wrapper>
  )
}
export default Tv;