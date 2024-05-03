import { Layout } from "@/components/commons/Layout";

const Unauthorized = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div>
          <div className="font-semibold text-base">Unauthorized</div>
          <div>You are not authorized to view this page.</div>
        </div>
      </div>
    </Layout>
  );
}

export default Unauthorized