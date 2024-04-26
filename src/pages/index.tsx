import { Layout } from "@/components/Layout";
import { RootState } from "@/redux/store";
import { AddTodo, addTodo, deleteTodo, getTodos, ITodo } from "@/services/todo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import axios from "axios";

export default function Todo() {
  const { t } = useTranslation()

  const [todos, setTodos] = useState<ITodo[]>([]);

  const [input, setInput] = useState<AddTodo>({
    title: '',
    description: '',
  })

  useEffect(() => {
    const fetch = async () => {

      const { data } = await axios.post('https://uwpmleglag.execute-api.ap-southeast-1.amazonaws.com/general/adauthentication_v2', {
        "id_token":
          "eyJ0eXAiOiJKV1QiLCJub25jZSI6Il9VTG1hUXBZOVBZZzBmWnV1Z2xrTUVyUl9EVENWMEM3Qzh0Zl9rWm5XcE0iLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84YjI0NTUxZC03YzJjLTRiZWItOGI2MS05NWYzMmQ5OTI5ZWYvIiwiaWF0IjoxNzEyMTEyMTc2LCJuYmYiOjE3MTIxMTIxNzYsImV4cCI6MTcxMjExNzQzNSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQW9XVnNCWENFSFNlUFdHRW9ZTTBwbDdBZUdXR2Raa3BtemNIOHBJd1ZFQWRLbGYzM1BMbjJoS0h5WnQzU0RXZW8iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IlNXSVRDSDIuMCIsImFwcGlkIjoiOWUxMDM3MjItNTFmMy00NjY5LWE2MWMtN2YyMDY4ODBhNmYyIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJOYSIsImdpdmVuX25hbWUiOiJOZ3V5ZW4gVGhpIExlIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiNTguMTg2LjUuNjAiLCJuYW1lIjoiTmEsIE5ndXllbiBUaGkgTGUiLCJvaWQiOiI5MjZmNzc1Yy1mM2U0LTQ0ZWItOTliZC1lMjY3YWQyMzc1YTQiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjYyMTQ4NDE2MS0yNDM5NzM2MDM5LTI4NTQyNDQ0NjUtMjgxNzcyIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAzNEM3MkQ2NkEiLCJyaCI6IjAuQVQwQUhWVWtpeXg4NjB1TFlaWHpMWmtwN3dNQUFBQUFBQUFBd0FBQUFBQUFBQUE5QUxjLiIsInNjcCI6IlVzZXIuUmVhZCBwcm9maWxlIG9wZW5pZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJpbmtub3dubnR3ayJdLCJzdWIiOiJ4dVNGZ3BvMXV1cHY2RjhNeDlCbDFUUG5jdFFZUDlwYmJrYmF5NnBWREFRIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiOGIyNDU1MWQtN2MyYy00YmViLThiNjEtOTVmMzJkOTkyOWVmIiwidW5pcXVlX25hbWUiOiJuYS5uZ3V5ZW50aGlsZUBwZXRobGFiLmNvbSIsInVwbiI6Im5hLm5ndXllbnRoaWxlQHBldGhsYWIuY29tIiwidXRpIjoiRFM2NE1IOC1rVUtwQ3gtcEh4TGpBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJSUEZ3Umlwbm8zcUtyejNaVTJURWV0Q1VMX1ZhLXFrUWlTUEtJWV9EU1QwIn0sInhtc190Y2R0IjoxNTYwOTk5MjA5fQ.jJNNdkqH3MaHExj_1nAz1KzwvTu6KEbKetiPjT_qP4HaFesOrBr9NreB5HZjl-6OmuZeCqzS7sHjLyStEd_yON4qeidV_bktu8UutZgGt2NGqyqVxrPzSE2-YeD-1LyPBvFMc5i2Mfn3A99t4HAQitjCtgKuqbnvSPJ_2ANkLpVR6xujQzgYQ8QtmGTWG9VQVeZ7u7mDMW8fhLRNYz1VReQVnjQsiJ0muVHSvT2sW5R-4FwLk3rU990XfOSK8eadydfEEeUuhYUaEfLrxTGFgCZ-FEWGwlm-c6W4TnRWuwpMYl9EXvUJjNFdgUwRgdx6UiQNjbrXahRpIGUyE3-xMQ"
      },
        {
          headers: {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjkwNTMwLCJidW5kbGVpZCI6MX0.L4JdlfafqZ8locrkaWUPIScz7TJeGBE8ZhHt_VenoAM'
          },
          validateStatus: () => true
        })
      console.log('data', data)
    }
    fetch()
  }, [])


  const user = useSelector((state: RootState) => state.auth.user);

  const fetchTodoList = useCallback(async () => {
    try {
      const data = await getTodos()
      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchTodoList()
    }
  }, [fetchTodoList, user])

  const handleAddTodo = useCallback(async (input: AddTodo) => {
    try {
      const data = await addTodo(input)
      console.log(data)
      if (data?.data) {
        setInput({ title: '', description: '' });
        fetchTodoList()
      }
      if (data?.message) {
        toast.error(data?.message)
      } else {
        toast.info('Task added')
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }, [fetchTodoList])

  const handleDeleteTodo = useCallback(async (id: number) => {
    try {
      const data = await deleteTodo(id)
      if (data?.data) {
        toast.warn('Task removed')
      }
      fetchTodoList()
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, [fetchTodoList])

  const renderLayout = useCallback((first: any, second: any) => {
    return (
      <div className="max-w-[600px] flex space-x-2">
        <div className="w-1/3">
          {first}
        </div>
        <div className="w-2/3">
          {second}
        </div>
      </div>
    )
  }, [])

  const renderTodos = useMemo(() => {
    return <div>
      <div className="font-semibold">
        TODO LIST
      </div>
      {todos?.map((todo: ITodo, index: number) => {
        return (
          <div key={index}>
            {renderLayout(
              todo.title,
              <div className="w-full flex justify-between">
                <span>{todo.description}</span>
                <span className="text-red-600 cursor-pointer" onClick={() => handleDeleteTodo(todo.id)}>X</span>
              </div>)}
          </div>
        )
      })}
    </div>
  }, [handleDeleteTodo, renderLayout, todos])

  const renderInput = useCallback((title: string, value: string, setValue: any) => {
    return (
      <div className="w-full">
        <div className="h-6">
          {title}
        </div>
        <div className="h-8">
          <div className=" border-red-200 border rounded-sm px-2 py-1 ">
            <input className="h-full w-full border-none focus:outline-none" value={value} onChange={(e) => setValue(e?.target?.value)} />
          </div>
        </div>
      </div>
    )
  }, [])

  return (
    <Layout>
      {user ? <div className="py-20 flex justify-center">
        <div>
          {renderLayout(
            renderInput(t('common:title'), input.title, (value: string) => setInput({ ...input, title: value })),
            renderInput(t('common:description'), input.description, (value: string) => setInput({ ...input, description: value }))
          )}
          <div
            className="hover:text-red-500 cursor-pointer mt-2 text-green-700"
            onClick={() => handleAddTodo(input)}
          >
            {t('common:add')}
          </div>

          <div className="mt-8">
            {renderTodos}
          </div>
        </div>
      </div> : <div className="w-full flex justify-center">{t('common:login_first')}
      </div>}
    </Layout>
  );
}


export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}