import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Book from './pages/Book';
import CreateAccount from './pages/CreateAccount';
import { useState } from 'react';
import ShowTimes from './pages/ShowTimes';
import Payment from './pages/Payment';
import CheckOut from './pages/CheckOut';
import Confirmation from './pages/Confirmation';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Addpay from './pages/Addpay';
import Admin from './pages/Admin';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import Search from './pages/Search';
import User from './pages/User';
import Promotion from './pages/Promotion';
import EditPromo from './pages/EditPromo';
import './App.css';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
const fast = [
  {
    id: 'p1',
    title: 'Avocado Toast',
    description: 'A slice of sourdough bread topped with mashed avocado and an egg.',
    imageUrl:
      'https://www.thenomadicfitzpatricks.com/wp-content/uploads/2020/06/IMG_8023.jpg',
    facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },
  {
    id: 'p2',
    title: 'Breakfast Burrito',
    description: 'Scrambled eggs, cheddar cheese, avocado, pico de gallo, and your choice of protein.',
    imageUrl:
      'https://www.onceuponachef.com/images/2018/03/Breakfast-Burritos.jpg',
      facts: 'Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg',
  },

];

function App() {
  const [bfast, setBfast] = useState(fast);
  return (
    <div className="App">
     <BrowserRouter>
        <Header/>
        <div >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-tickets" element={<Book />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/ShowTimes" element={<ShowTimes />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/confirmationPage" element={<Confirmation />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/Addpay" element={<Addpay />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/Edit" element={<Edit />} />
            <Route path="/Delete" element={<Delete />} />
            <Route path="/User" element={<User />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Promotion" element={<Promotion />} />
            <Route path="/editPromo" element={<EditPromo />} />

        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
