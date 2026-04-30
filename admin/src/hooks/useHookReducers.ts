import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../services";
import Request from "../helpers/request";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const RequestMethod = new Request(
  process.env.NEXT_PUBLIC_APP_API_URL || "",
);
