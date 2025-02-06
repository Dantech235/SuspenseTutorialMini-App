import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers/Routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
