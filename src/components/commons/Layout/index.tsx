import { LANGUAGE, useLanguage } from "@/hooks.ts/useLanguage";
import { setUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { buildLoginUrl } from "@/utils/sso";
import { HttpStatusCode } from "axios";
import { useCallback, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { me } from "@/services/user";
import { useRouter } from "next/navigation";
import { axios } from "@/utils/axios";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { locale, changeLocale } = useLanguage()
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const { data, status } = await me();
          if (status === HttpStatusCode.Ok && data?.data) {
            dispatch(setUser(data?.data));
          } else {
            logout()
          }
        } catch (error) {
        }
      };
      fetchUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers['Authorization']
    dispatch(setUser(null));
    router.push('/unauthorized')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user])

  return (
    <div className="px-10">
      <ToastContainer hideProgressBar autoClose={2000} position="top-center" />
      <header className="w-full flex justify-between items-center h-14">
        <div className="font-semibold text-xl">
          TODO
        </div>
        <div className="flex items-center space-x-4">
          <div>
            {user ?
              (<div>
                {user.name}
                (<span className="hover:underline hover:text-blue-300 cursor-pointer" onClick={() => logout()}>
                  {t('common:logout')}
                </span>)
              </div>) :
              (<div className="hover:underline hover:text-green-300">
                <a href={buildLoginUrl()}>
                  {t('common:login')}
                </a>
              </div>)
            }
          </div>
          <div>
            <select defaultValue={locale} onChange={(e) => changeLocale(e?.target.value)}>
              <option value={LANGUAGE.VI}>VI</option>
              <option value={LANGUAGE.EN}>EN</option>
            </select>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}