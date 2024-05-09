import { Layout } from "@/components/commons/Layout";
import { Todos } from "@/components/pages/Todo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Todo = () => {
  return (
    <Layout>
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="Todo App" />
      </Head>
      <Todos />
    </Layout>
  )
}

export default Todo

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}