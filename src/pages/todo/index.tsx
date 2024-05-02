import { Layout } from "@/components/Layout";
import { Todos } from "@/components/pages/todos";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Todo = () => {
  return (
    <Layout>
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