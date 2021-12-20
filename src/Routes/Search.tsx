import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMoviesSearch, getTVSearch, IGetMoviesResult } from "../api";
import Icon from "../Components/Icon";
import MovieSlider from "../Components/MovieSlider";
import TVSlider from "../Components/TVSlider";

const Wrapper = styled.div`
  overflow-x: hidden;
  background-color: ${props => props.theme.black.darker};
  padding-top : 100px;
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


function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: searchMovie, isLoading: searchMovieLoading } = useQuery<IGetMoviesResult>(["movies", "search"], () => getMoviesSearch(keyword || ""));

  const { data: searchTV, isLoading: searchTVLoading } = useQuery<IGetMoviesResult>(["tv", "search"], () => getTVSearch(keyword || ""));

  return (
    <Wrapper>
      {searchMovieLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <MovieSlider key="searchMovies" data={searchMovie} sliderTitle="search Movies"></MovieSlider>
        </>
      }
      {searchTVLoading ? <Loader><Icon type="animate"></Icon>Loading...</Loader> :
        <>
          <TVSlider key="searchTV" data={searchTV} sliderTitle="search TV"></TVSlider>
        </>
      }
    </Wrapper>
  )
}
export default Search;