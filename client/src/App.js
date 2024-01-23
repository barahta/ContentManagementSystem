import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { DataProvider } from './context/DataContext';

import MainPage from "./pages/MainPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SyncPage from "./pages/SyncPage";
function App() {
  return (
      <DataProvider>
          <Router>
              <div className="App">
                  <Navbar/>
                  <div className='container'>
                      <Sidebar/>
                      <main className="content">
                          <Routes>
                              <Route path='/' element={<DashboardPage/>} />
                              <Route path='/main' element={<MainPage/>} />
                              <Route path='/sync' element={<SyncPage/>} />
                          </Routes>
                      </main>
                  </div>
              </div>
          </Router>
      </DataProvider>
  );
}

export default App;
