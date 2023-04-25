import { useRouter } from "next/router";
import CategoriesPage from "../../components/templates/CategoriesPage";
import ErrorPage from "../../components/modules/errorPage";
import Spinner from "../../components/modules/Spinner";

function Categories({ data, Error }) {


  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }else if(Error){
    return <ErrorPage />
  }

  return <CategoriesPage data={data} />;
}

export default Categories;

export async function getServerSideProps(context) {


  try {
    const {
      query: { difficulty, time },
    } = context;

    const res = await fetch(`${process.env.BASE_URL}/data`);
    const data = await res.json();

    const filteredData = data.filter((item) => {
      const difficultyResult = item.details.filter(
        (detail) => detail.Difficulty && detail.Difficulty === difficulty
      );

      const timeResult = item.details.filter((detail) => {
        const cookingTime = detail["Cooking Time"] || "";
        const [timeDetail] = cookingTime.split(" ");
        if (time === "less" && timeDetail && +timeDetail <= 30) {
          return detail;
        } else if (time === "more" && +timeDetail > 30) {
          return detail;
        }
      });
      if (time && difficulty && timeResult.length && difficultyResult.length) {
        return item;
      } else if (!time && difficulty && difficultyResult.length) {
        return item;
      } else if (time && !difficulty && timeResult.length) {
        return item;
      }
    });
    return {
      props: { data: filteredData },
    };
  } catch (error) {
    return {
      props: { Error: error.message },
    };
  }

}
