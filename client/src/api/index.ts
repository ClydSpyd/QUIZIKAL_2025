import axios from "axios";
import { sessionQueryHandlers } from "./session";

export const baseClient = axios.create({ baseURL: "/api" });


export const API = {
  session: sessionQueryHandlers,
};