"use client";

import { Provider } from "react-redux";
import stores from "../services";
import { ToastContainer } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LocalStorage from "../helpers/local-storage";
import { useAppDispatch } from "../hooks/useHookReducers";
import { getCurrentUser } from "../services/auth";
import useNotification from "../hooks/useNotification";

function InnerProvider({ main }: { main: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const token = LocalStorage.getLocalStorage<string | null>(
    "access-token",
    null,
  );
  useEffect(() => {
    if (pathname === "/") return;

    if (!token && pathname !== "/auth") {
      router.push("/auth");
    }

    if (token && pathname === "/auth") {
      router.push("/");
    }
  }, [pathname, router]);

  const loaderCurrentUser = async () => {
    try {
      await dispatch(getCurrentUser({})).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      loaderCurrentUser();
    }
  }, [token]);
  return (
    <>
      <ToastContainer />
      {main}
    </>
  );
}

function ProviderComponent({ main }: { main: React.ReactNode }) {
  return (
    <Provider store={stores}>
      <InnerProvider main={main} />
    </Provider>
  );
}

export default ProviderComponent;
