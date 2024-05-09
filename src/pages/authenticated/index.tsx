import { axios, httpRequest } from "@/utils/axios"
import { GetServerSidePropsContext } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import ClipLoader from "react-spinners/ClipLoader";
import { authenticated } from "@/services/user";

const Authenticated = ({ accessToken }: { accessToken: string }) => {
  const router = useRouter()
  useEffect(() => {
    localStorage.setItem("accessToken", accessToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    router.push("/")
  })
  return <ClipLoader />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { token } = context?.query
  if (!token) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false
      }
    }
  }
  const { data } = await authenticated(token as string)
  const accessToken = data?.data?.token
  if (!accessToken) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false
      }
    }
  }
  return {
    props: {
      accessToken
    }
  }
}
export default Authenticated