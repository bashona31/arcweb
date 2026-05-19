import { Web3Provider } from "@/providers/Web3Provider";
import { Dashboard } from "@/pages/Dashboard";

function App() {
  return (
    <Web3Provider>
      <Dashboard />
    </Web3Provider>
  );
}

export default App;
