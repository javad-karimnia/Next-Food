import MenuPage from "../../components/templates/MenuPage";
import ErrorPage from "../../components/modules/errorPage";
import Spinner from "../../components/modules/Spinner";

export default function Menu({ data, Error }) {

    if (!data) {
      return <Spinner />;
    }else if(Error){
      return <ErrorPage />
    }

  return <MenuPage data={data} />  
}

export async function getStaticProps() {

  try {
    const res = await fetch(`${process.env.BASE_URL}/data`);
    const data = await res.json();

    return {
      props: { data },
      revalidate: +process.env.REVALIDATE, //seconds
    };
  } catch (error) {
    
    return {
      props: { Error: error.message },
    };

  }

}
