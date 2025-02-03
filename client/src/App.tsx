import { Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import HostDash from "./views/HostDash/HostDash";
import { AnimatePresence } from "framer-motion";
import ProtectedLayout from "./components/utilityComps/ProtectedLayout";
import Landing from "./views/Landing/Landing";
import Signup from "./views/Landing/Signup";
import HostLogin from "./views/Landing/HostLogin";
import LogoLayout from "./layouts/LogoLayout";
import { AuthProvider } from "./context/authContext";
import CreateQuiz from "./views/CreateQuiz/CreateQuiz";
import SessionView from "./views/Session/SessionView";
import LandingLayout from "./components/utilityComps/LandingLayout";

function App() {
  return (
    <>
      <AuthProvider>
        <AnimatePresence mode={"wait"}>
          <Routes>
            <Route element={<LogoLayout />}>
              <Route index element={<Landing />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/login"} element={<HostLogin />} />
              <Route element={<ProtectedLayout />}>
                <Route path={"/dashboard"} element={<HostDash />} />
                <Route path={"/quiz/edit/:quizId?"} element={<CreateQuiz />} />
                <Route
                  path={"/host/:sessionSlug/:sidecar?"}
                  element={<SessionView isHost />}
                />
              </Route>
              <Route path={"/play/:multiCode"} element={<SessionView />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
}

export default App;
