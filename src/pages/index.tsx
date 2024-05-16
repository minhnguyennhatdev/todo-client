import { useState } from "react";

export default function Index() {
  return <div>Bonjour Mousier</div>
}


export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    redirect: {
      destination: '/todo',
      permanent: false
    }
  }
}