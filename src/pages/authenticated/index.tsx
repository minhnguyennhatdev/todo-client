import { httpRequest } from "@/utils/axios"
import { GetServerSidePropsContext } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const Authenticated = ({ accessToken }: { accessToken: string }) => {
  const router = useRouter()
  useEffect(() => {
    localStorage.setItem("accessToken", accessToken)
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
  const { data } = await httpRequest({
    url: `/api/authenticated?token=${token}`,
    method: "GET"
  })
  const accessToken = data?.token
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