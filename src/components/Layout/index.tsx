import { LANGUAGE, useLanguage } from "@/hooks.ts/useLanguage";
import { setUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { httpRequest } from "@/utils/axios";
import { buildLoginUrl } from "@/utils/sso";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { locale, changeLocale } = useLanguage()
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const { data } = await httpRequest({
            url: '/api/authenticated/me',
            method: 'GET',
          });
          if (data) {
            dispatch(setUser(data));
          }
        } catch (error) {
        }
      };
      fetchUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    if (user) {
      dispatch(setUser(null));
      localStorage.removeItem('accessToken');
      axios.defaults.headers.common["Authorization"] = null;
    }
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