import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoginPage from "./pages/loginPage"
import RegisterPage from './pages/registerPage';
import UserRolePage from './pages/userRolePage';
import ProfilePage from './pages/profilePage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/homePage';
import NavBar from './components/navBar';
import RequireAuth from "./components/requireAuth";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});



const App = () => {

//   const [user, setUser] = useLocalStorage("user", localStorage.getItem("user"));

//   const checkLoggedIn = async () => {

//   let userLS = localStorage.getItem("user")

//   const email = userLS?.email;
//   const password = userLS?.password;
//   const role = userLS?.role;

//   const token = localStorage.getItem("token");

//   if(userLS && token){
//     setUser({email, password, token, role});
//     console.log(user.email)
//   }
//   else{
//     console.log("No logged in user")
//   }
  
// };

//   useEffect(() => {
//     console.log('useEffect called');
//     checkLoggedIn()
//   }, []);


  return (

    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route exact path = "/login" element = {<LoginPage/>}></Route>
      <Route exact path = "/register" element = {<RegisterPage/>}></Route>
      <Route exact path = "/select-role" element = {<UserRolePage/>}></Route>
      <Route exact path = "/" element = {<HomePage/>}></Route>

      <Route element={<RequireAuth />}>
      <Route exact path = "/profile" element = {<ProfilePage/>}></Route>
      </Route>
 
      <Route exact path = "*" element = {<HomePage/>}></Route>
    </Routes>
    </BrowserRouter>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  

  )
}
ReactDOM.render(<App />,document.getElementById('root'));

