import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Container = styled.div`
  margin: 3rem;
`;
const Divider = styled.hr`
  border-top: 1px solid #bbb;
  border-radius: 5px;
  margin-top: 3vh;
  width: 90%;
  margin: 0px auto;
`;
const TitleOne = styled.h2`
  font-size: 30px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleTwo = styled.h2`
  font-size: 25px;

  margin: 15px 0px;
`;

const Text = styled.p`
  font-size: 18px;
  margin: 30px 0px;
  color: #4b4b4b;
`;

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Container>
        <TitleOne>¿Quiénes somos?</TitleOne>
        <Divider />
        <TitleTwo>Nuestra identidad</TitleTwo>
        <Text>
          ICYGB se dirige a todo el mundo y comparte su pasión por las sneakers,
          mucho más que una tendencia, un verdadero estado de ánimo que
          trasciende las generaciones.
        </Text>
        <TitleTwo>Nuestra ubicación</TitleTwo>
        <Text>
          Con 3 tiendas en Khazakhstan, ICYGB ha sabido imponerse como líder de
          la moda de sneakers, en especial, entre las mujeres y los jóvenes de
          entre 15 y 25 años.
        </Text>
        <TitleTwo>Nuestras redes sociales</TitleTwo>
        <Text>
          Con más un total de 19 seguidores en Instagram, la comunidad de
          Sneaker crece a pasos agigantados cada día.
        </Text>
        <TitleTwo>Nuestro compromiso</TitleTwo>
        <Text>
          Nos tomamos muy en serio la igualdad entre mujeres y hombres, por ello
          el 93% del equipo está compuesto por mujeres.
        </Text>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;
