import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { addProduct } from "../features/cart/cartSlice";

import { useDispatch } from "react-redux";

import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  @media only screen and (max-width: 794px) {
    padding: 10px;
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 50%;
  height: 50vh;
  margin-left: 25vh;
  object-fit: cover;
  @media only screen and (max-width: 794px) {
    height: 40vh;
    width: 80%;
    margin-left: 0px;
    margin: 10px;
  }
  @media only screen and (max-width: 1615px) {
    height: 50vh;
    width: 100%;
    margin-left: 0px;
    margin: 10px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  @media only screen and (max-width: 794px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 400;
`;

const Description = styled.p`
  margin: 20px 0px;
  font-size: 1.1rem;
  line-height: 2rem;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

const FilterContainer = styled.div`
  width: 60%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 794px) {
    width: 90%;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;
const ButtonsContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1300px) {
    width: 90%;
  }
`;
const Button = styled.button`
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 1rem;
  background-color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: whitesmoke;
    transform: scale(1.01);
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});

  const [qty, setQty] = useState(1);

  const [size, setSize] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/find/${id}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id]);

  const handleQty = () => {
    setQuantity(quantity + 1);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, qty, size }));
  };

  return (
    <Container>
      <Navbar />
      <Banner />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>{product.price} €</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Tallas disponibles:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <ButtonsContainer>
            <Button onClick={handleClick}>AÑADIR AL CARRITO</Button>{" "}
            <Button>
              {" "}
              <Link to={"/sneakers"} className="text-link">
                SEGUIR COMPRANDO{" "}
              </Link>
            </Button>
          </ButtonsContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
