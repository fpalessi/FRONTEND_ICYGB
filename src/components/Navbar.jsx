import { ShoppingCartSharp } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";

const Container = styled.div`
  height: 60px;
  @media only screen and (max-width: 794px) {
    height: 50px;
  }
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 794px) {
    padding: 15px;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
  @media only screen and (max-width: 794px) {
    padding: 2px;
  }
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-size: 2.32rem;
  background: linear-gradient(rgb(181, 181, 181), rgb(137, 136, 136));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 3px;
  @media only screen and (max-width: 794px) {
    font-size: 20px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 794px) {
    flex: 2;
    justify-content: center;
  }
`;
const MenuItem = styled.div`
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0px 15px;
  @media only screen and (max-width: 794px) {
    display: none;
  }
  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

const MenuItemUser = styled.div`
  font-size: 0.88rem;
  cursor: pointer;
  margin: 0px 35px;
  @media only screen and (max-width: 794px) {
    font-size: 13px;
    margin-left: 10px;
  }
`;

const Navbar = () => {
  const qty = useSelector((state) => state.cart.qty);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (confirm("¿Estás seguro que quieres cerrar sesión?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={"/"} className="text-link">
            <MenuItem>Home</MenuItem>
          </Link>
          {userInfo ? (
            <Link to={"/"} className="text-link" onClick={handleLogOut}>
              <MenuItemUser>LOGOUT</MenuItemUser>
            </Link>
          ) : (
            <Link to={"/login"} className="text-link">
              <MenuItemUser>LOGIN</MenuItemUser>
            </Link>
          )}

          {userInfo ? null : (
            <Link to={"/register"} className="text-link">
              <MenuItemUser>REGISTRARSE</MenuItemUser>
            </Link>
          )}
        </Left>
        <Center>
          <Link to={"/"} className="text-link">
            <Logo>ICYGB.</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/about-us" className="text-link">
            <MenuItem> Sobre Nosotros</MenuItem>{" "}
          </Link>{" "}
          <MenuItemUser>
            <Link to="/cart" className="text-link">
              <Badge badgeContent={qty} color="primary">
                <ShoppingCartSharp />
              </Badge>
            </Link>
          </MenuItemUser>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
