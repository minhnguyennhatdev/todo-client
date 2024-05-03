import { Layout } from "@/components/commons/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Unauthorized = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center mt-20">
        <div>
          <div className="font-semibold text-base">Unauthorized</div>
          <div>You are not authorized to view this page.</div>
        </div>
      </div>
    </Layout>
  );
}

export default Unauthorized

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}