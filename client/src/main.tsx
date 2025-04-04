import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TriviaProvider } from "./context/TriviaContext.tsx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnReconnect: true, // Refetch on network reconnect
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient} >
      <TriviaProvider>
        <App />
      </TriviaProvider>
    </QueryClientProvider>
  </Router>
);
