import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../components/Header/header"
import Footer from '../components/Footer/footer';
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import Profile from '../pages/Profile/profile';
import "../utils/styles/index.css"
import { Provider } from "react-redux";
import { store } from '../app/store';
import PrivateRoute from '../components/PrivateRoute/privateRoute';

const App = () => {

  return (
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />   
            <Route path="/login" element={<Login />} />  
            <Route element={<PrivateRoute />} >
              <Route path="/profile" element={<Profile />} /> 
            </Route>    
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
  );
};


export default App;
