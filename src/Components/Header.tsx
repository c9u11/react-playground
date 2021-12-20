import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import Icon from "./Icon"
import { useState } from "react";
import { useEffect } from "react";
const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 10px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li<{ active: boolean | undefined }>`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  cursor: pointer;
  a {
    color: ${(props) => !!props.active ? props.theme.white.lighter : props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    text-decoration: unset;
  }
  a:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
position: absolute;
width: 5px;
height: 5px;
border-radius: 5px;
bottom: -10px;
left: 0;
right: 0;
margin: 0 auto;
background-color: ${(props) => props.theme.blue};
`;

const Search = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  color: ${props => props.theme.white.darker};
  background-color: ${props => props.theme.black.darker};
  border: none;
  right: 0px;
  width: 0px;
  padding: 10px 0px;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)"
  },
  scroll: {
    backgroundColor: "rgba(4, 5, 8, 1)"
  }
}

function Header() {
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        width: 0,
        padding: "10px 0px",
        marginLeft: 0
      })
    }
    else {
      inputAnimation.start({
        width: 185,
        padding: "10px",
        marginLeft: 10
      })
    }
    setSearchOpen(prev => !prev)
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll")
      }
      else {
        navAnimation.start("top")
      }
    });
  }, [scrollY, navAnimation])
  return (
    <Nav
      variants={navVariants}
      initial="top"
      animate={navAnimation}
    >
      <Col>
        <Icon />
        <Items>
          <Item active={homeMatch?.isExact} >
            <Link to="/">Home {homeMatch?.isExact && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item active={tvMatch?.isExact} >
            <Link to="/tv">Tv Shows {tvMatch && <Circle layoutId="circle" />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            onClick={toggleSearch}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
          <Input transition={{ type: "linear" }} animate={inputAnimation} placeholder="Search by title or charater..."></Input>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;