import { Blocks } from "../components/blocks";
// import { ExperimentalGetTinaClient } from "../.tina/__generated__/types";
// import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";
import { eventDetail } from "../helpers/constants"

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  // const { data } = useTina({
  //   query: props.query,
  //   variables: props.variables,
  //   data: props.data,
  // });
  const eventData = props.events
  // console.log("data", data);
  return (
    <Layout data={eventData}>
      <Blocks {...eventData.getPagesDocument.data} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  // const client = ExperimentalGetTinaClient();
  // const tinaProps = await client.ContentQuery({
  //   relativePath: `index.md`,
  // });
  return {
    props: {
      // data: tinaProps.data,
      // query: tinaProps.query,
      // variables: tinaProps.variables,
      events: eventDetail,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
