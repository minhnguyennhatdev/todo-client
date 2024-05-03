import { Layout } from "@/components/commons/Layout";
import { RootState } from "@/redux/store";
import { AddTodo, addTodo, deleteTodo, getTodos, ITodo, TodoStatus } from "@/services/todo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";

export default function Index() {
}


export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    redirect: {
      destination: '/todos',
      permanent: false
    }
  }
}