import { useRouter } from "next/router";
import DetailsPage from "../../components/templates/DetailsPage";
import ErrorPage from "../../components/modules/errorPage";
import Spinner from "../../components/modules/Spinner";


function Details({ data, Error }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }else if(Error){
    return <ErrorPage />
  }
  
  return <DetailsPage {...data} />
}

export default Details;

export async function getStaticPaths() {

  try {
    const res = await fetch(`${process.env.BASE_URL}/data`);
    const json = await res.json();
    const data = json.slice(0, 10);

    const paths = data.map((food) => ({
      params: { id: food.id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  try {
    
    const res = await fetch(`${process.env.BASE_URL}/data/${id}`);
    const data = await res.json();
  
    if (!data.id) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: { data },
      revalidate: +process.env.REVALIDATE,
    };
  } catch (error) {

    return {
      // redirect: { destination: "http://localhost:3000/menu" },
      props: { Error: error.message },
    };

  }
  
}
