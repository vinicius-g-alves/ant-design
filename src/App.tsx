
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Details from './components/pages/Details';
import Home from './components/pages/Home';
import Movies from './components/pages/Movies';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>

          <Route path='/details/:id' element={<Details />}></Route>

          <Route path='/movies' element={<Movies />}></Route>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </MainLayout>
    </Router>

  );
};

export default App;