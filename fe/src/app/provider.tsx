"use client";

import { Provider } from "react-redux";
import stores from "../services";
import { ToastContainer } from "react-toastify";

function InnerProvider({ main }: { main: React.ReactNode }) {
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
