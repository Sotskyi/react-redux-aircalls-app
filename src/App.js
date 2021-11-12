import { BrowserRouter } from "react-router-dom";
import CallsTab from "./components/CallsTab";
import AppRouter from "./routes/AppRouter";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <AppRouter />
        <CallsTab />
      </div>
    </BrowserRouter>
  );
}

export default App;
