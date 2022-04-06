import useSWR from "swr";

export async function getStaticPaths() {
  const products = await fetch(
    "http://localhost:3000/products?_page=1&_limit=10"
  ).then((resp) => resp.json());

  const paths = products.map((product) => {
    return {
      params: { id: String(product.id) },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await fetch(
    `http://localhost:3000/products/${params.id}`
  ).then((resp) => resp.json());

  return {
    props: {
      product,
    },
  };
}

const Product = ({ product }) => {
  const { data, error } = useSWR(
    `http://localhost:3000/products/${product.id}`,
    (...args) =>
      fetch(`http://localhost:3000/products/${product.id}`).then((resp) =>
        resp.json()
      ),
    { fallbackData: product }
  );

  //   if (error) {
  //     return <div>Error</div>;
  //   }

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
      <h2>Price: R$ {data.price}</h2>
    </div>
  );
};

export default Product;
