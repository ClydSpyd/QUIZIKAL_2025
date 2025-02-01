import axios from "axios";
import { sessionAPIHandlers } from "./session";

export const baseClient = axios.create({ baseURL: "/api" });


export const API = {
  session: sessionAPIHandlers,
};