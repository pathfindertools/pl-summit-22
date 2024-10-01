import { Blocks } from "../components/blocks";
// import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";

export default function DynamicPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = props;
  return (
    <Layout data={data}>
      <Blocks {...data} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  // const client = ExperimentalGetTinaClient();
  // const tinaProps = await client.ContentQuery({
  //   relativePath: `${params.filename}.md`,
  // });
  return {
    props: {
      // data: tinaProps.data,
      // query: tinaProps.query,
      // variables: tinaProps.variables,
      data: [],
      query: '',
      variables: [],
    },
  };
};

export const getStaticPaths = async () => {
  // const client = ExperimentalGetTinaClient();
  // const pagesListData = await client.getPagesList();
  return {
    // paths: pagesListData.data.getPagesList.edges.map((page) => ({
    //   params: { filename: page.node.sys.filename },
    // })),
    paths: [],
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
