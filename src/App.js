
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import PrimarySearchAppBar from './components/header/Header';
import Footersection from './components/footer/footersection';
import MovieDetails from './components/detailPage/detail';
import TheatrePage from './components/Theatre/theatrePage';
import ScreenPage from './components/screen/screenPage';
import { useSelector } from 'react-redux';
import PaymentPage from './components/payment/paymentPage';

function App() {
 
  const {isScreenPageOpen} = useSelector(({screen}) => screen)

  // console.log(isScreenPageOpen);

  return (
    <div className="App">
      <BrowserRouter>
      {!isScreenPageOpen && <PrimarySearchAppBar/>}
         <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/detailed_page' element={<MovieDetails/>}></Route>
          <Route path='/theatre_page' element={<TheatrePage/>}></Route>
          <Route path='/screenPage' element={<ScreenPage/>}></Route>
          <Route path='/payment' element={<PaymentPage/>}></Route>
         </Routes>
        {!isScreenPageOpen && <Footersection/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
