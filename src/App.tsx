import React from "react";
import MyRouter from "routers/index";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <QueryClientProvider client={queryClient}>
        <MyRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;
