import { httpRequest } from "@/utils/axios"
import { GetServerSidePropsContext } from "next"
import { ContextType } from "react"

const Authenticated = (props: any) => {
  return <div>
    Hello world
  </div>
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { token } = context?.query

  const response = await httpRequest({
    url: `authenticated?token=${token}`,
    method: "GET"
  })

  console.log(response)

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/unauthorized',
  //       permanent: false
  //     }
  //   }
  // }

  return {

  }
}
export default Authenticated