import axios from "axios";
import { sessionAPIHandlers } from "./session";
import { roundAPIHandlers } from "./round";

export const baseClient = axios.create({ baseURL: "/api" });


export const API = {
  session: sessionAPIHandlers,
  round: roundAPIHandlers 
};