import styled from "styled-components";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";

import StripeCheckOut from "react-stripe-checkout";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axiosRequest from "../config/axiosRequest";

import { Link } from "react-router-dom";

import { clearCart } from "../features/cart/cartSlice";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51LT2gbDNLvjW3Rg902HPuobPN31cSXBZqEfbhJrBHouEV52eWoFuqotcUi2JFWL9DZYoDUcpurijXhjx3y980r3c00qyrHC3PG";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  @media only screen and (max-width: 794px) {
    padding: 10px;
  }
`;
const Title = styled.h1`
  font-weight: 400;
  text-align: center;
  margin-bottom: 1rem;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  @media only screen and (max-width: 794px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;
const TopButton = styled.button`
  margin: 30px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 300;
  padding: 13px 31px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);

  @media only screen and (max-width: 794px) {
    margin: 20px;
  }

  &:after {
    content: "";
    background-color: #bfbfbf;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 7px;
    left: 7px;
    transition: 0.2s;
  }
  &:hover::after {
    top: 0px;
    left: 0px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 794px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 794px) {
    flex-direction: column;
  }
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductID = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;
const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Hr = styled.hr`
  background-color: #bab9b9;
  border: none;
  height: 0.5px;
`;

const Summary = styled.div`
  flex: 1;
  height: 45vh;
  border: 0.5px solid lightgray;
  border-radius: 2rem;
  padding: 20px;
  margin: 10px;
`;

const SummaryTitle = styled.h1`
  font-weight: 400;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${TOKEN}` } };
        const response = await axiosRequest.post(
          "/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          },
          config
        );
        navigate("/success", { data: response.data });
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Banner />
      <Wrapper>
        <Title>🛒</Title>
        <Top>
          <Link to={"/sneakers"} className="text-link">
            <TopButton>SEGUIR COMPRANDO</TopButton>{" "}
          </Link>
          <TopButton
            onClick={() => {
              dispatch(clearCart(cart));
            }}
          >
            VACIAR CARRITO
          </TopButton>
          <StripeCheckOut
            name="ICYGB"
            image="https://images.pexels.com/photos/12611630/pexels-photo-12611630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            billingAddress
            shippingAddress
            description={`Tu total a pagar son ${cart.total}€`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={STRIPE_PUBLISHABLE_KEY}
          >
            <TopButton>TRAMITAR PEDIDO</TopButton>
          </StripeCheckOut>
        </Top>

        <Bottom>
          <Info>
            <Hr />
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Producto: </b> {product.title}
                    </ProductName>
                    <ProductID>
                      <b>ID: </b> {product._id}
                    </ProductID>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>{product.price * product.qty} €</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>Resumen del Pedido</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total} €</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Costes de Envío</SummaryItemText>
              <SummaryItemPrice>Gratis</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total} €</SummaryItemPrice>
            </SummaryItem>
            {stripeToken ? (
              <span>Processing... please wait.</span>
            ) : (
              <StripeCheckOut
                name="ICYGB"
                image="https://images.pexels.com/photos/12611630/pexels-photo-12611630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                billingAddress
                shippingAddress
                description={`Tu total es de ${cart.total}€`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={STRIPE_PUBLISHABLE_KEY}
              >
                <TopButton>CHECKOUT</TopButton>
              </StripeCheckOut>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
