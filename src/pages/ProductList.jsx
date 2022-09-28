import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import styled from "styled-components";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  @media only screen and (max-width: 794px) {
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  @media only screen and (max-width: 794px) {
    margin-right: 0px;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  @media only screen and (max-width: 794px) {
    margin: 10px 0px;
  }
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const brand = location.pathname.split("/")[2];

  const [filter, setFilter] = useState({});

  const [sort, setSort] = useState("Newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Banner />
      <Title>{brand} 😎</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar por: </FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option defaultValue>Color</Option>
            <Option>Blanco</Option>
            <Option>Negro</Option>
            <Option>Azul</Option>
            <Option>Verde</Option>
            <Option>Amarillo</Option>
            <Option>Rojo</Option>
            <Option>Gris</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option defaultValue>Talla</Option>
            <Option>37</Option>
            <Option>38</Option>
            <Option>39</Option>
            <Option>40</Option>
            <Option>41</Option>
            <Option>42</Option>
            <Option>43</Option>
            <Option>44</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Ordenar por:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="Newest">Más nuevo</Option>
            <Option value="Asc">Precio: de menor a mayor</Option>
            <Option value="Desc">Precio: de mayor a menor</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products brand={brand} filter={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
