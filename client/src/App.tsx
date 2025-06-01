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
import CreateQuestion from "./components/CreateQuestion";
import EditQuestion from "./views/EditQuestion";
import { NotificationProvider } from "./context/notification-context";
import ResetSessionView from "./views/ResetSession";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <>
      <AuthProvider>
        <AnimatePresence mode={"wait"}>
          <NotificationProvider>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route index element={<Landing />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/login"} element={<HostLogin />} />
              </Route>
              <Route element={<LogoLayout />}>
                <Route index element={<Landing />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/login"} element={<HostLogin />} />
                <Route element={<ProtectedLayout />}>
                  <Route path={"/dashboard"} element={<HostDash />} />
                  <Route
                    path={"/quiz/edit/:quizId/:roundIdx?"}
                    element={<CreateQuiz />}
                  />
                  <Route
                    path={"/question/create/:quizId/:roundIdx"}
                    element={<CreateQuestion />}
                  />
                  <Route
                    path={"/question/edit/:questionId"}
                    element={<EditQuestion />}
                  />
                  <Route
                    path={"/session/reset/:sessionCode"}
                    element={<ResetSessionView />}
                  />
                </Route>
                <Route
                  path={"/host/:sessionSlug"}
                  element={<SessionView isHost />}
                />
              </Route>
              <Route path={"/play/:multiCode/:sidecar?"} element={<SessionView />} />
            </Routes>
          </NotificationProvider>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
}

export default App;
