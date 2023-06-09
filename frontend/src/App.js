import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register.js';
import Login from './pages/Auth/Login.js';

import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';

import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateCourse from './pages/Admin/CreateCourse';
import CreateInstructor from './pages/Admin/CreateInstructor';
import Users from './pages/Admin/Users';
import AdminOrders from './pages/Admin/AdminOrders';
import Courses from './pages/Admin/Courses';
import UpdateCourse from './pages/Admin/UpdateCourse';
import UpdatedInstructor from './pages/Admin/UpdatedInstructor';

import PrivateRoute from './components/routes/Private';
import AdminRoute from './components/routes/AdminRoute';

import { Toaster } from 'react-hot-toast';
import CartPage from './pages/CartPage';
import Search from './pages/Search';
import CourseDetails from './pages/CourseDetails';
import UnlockedCourse from './pages/UnlockedCourse';



function App() {
  return (
    
    <div >
      <Toaster />
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/search' element = {<Search/>}/>
      <Route path='/course/:slug' element = {<CourseDetails/>}/>
      <Route path='/dashboard' element = {<PrivateRoute/>}>
          <Route path='user' element = {<Dashboard/>}/>
          <Route path='user/profile' element={<Profile/>}/>
          <Route path='user/orders' element={<Orders/>}/>
          <Route path='user/UnlockedCourses/:slug' element={<UnlockedCourse/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element = {<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-course' element={<CreateCourse/>}/>
        <Route path='admin/courses/:slug' element={<UpdateCourse/>}/>
        <Route path='admin/instructor/:slug' element={<UpdatedInstructor/>}/>
        <Route path='admin/create-instructor' element={<CreateInstructor/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/orders' element={<AdminOrders/>}/>
        <Route path='admin/courses' element={<Courses/>}/>
      </Route>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/about' element = {<About/>}/>
      <Route path='/contact' element = {<Contact/>}/>
      <Route path='/policy' element = {<Policy/>}/>
      <Route path='/*' element = {<Pagenotfound/>}/>
      <Route path='/cart' element = {<CartPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
