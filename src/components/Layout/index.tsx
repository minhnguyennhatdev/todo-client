import { setUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { fetchUser, logout } from "@/services/user";
import { httpRequest } from "@/utils/axios";
import { buildLoginUrl } from "@/utils/sso";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
      <header className="w-full flex justify-between items-center h-14">
        <div className="font-semibold text-xl">
          TODO
        </div>
        <div>
          {user ?
            (<div>
              {user.name} (<span className="hover:underline hover:text-blue-300 cursor-pointer" onClick={() => logout()}>Logout</span>)
            </div>) :
            (<div className="hover:underline hover:text-green-300">
              <a href={buildLoginUrl()}>
                Login
              </a>
            </div>)
          }
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}