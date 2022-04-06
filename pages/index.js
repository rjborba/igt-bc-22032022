import Link from "next/link";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export async function getStaticProps() {
  const products = await fetch(
    "http://localhost:3000/products?_page=1&_limit=10"
  ).then((resp) => resp.json());

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

const Home = ({ products }) => {
  return (
    <div>
      <Title>Hardware Store</Title>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
};

export default Home;
