import "./App.css";
// import AxiosApi from './data/components/AxiosApi';
import RQueryApi from "./data/components/RQueryApi";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    // <AxiosApi/>
    <QueryClientProvider client={queryClient}>
      <RQueryApi />
    </QueryClientProvider>
  );
}

export default App;
