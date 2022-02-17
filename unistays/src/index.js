import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoginPage from "./pages/loginPage"
import RegisterPage from './pages/registerPage';
import UserRolePage from './pages/userRolePage';
import ProfilePage from './pages/profilePage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { RequireAuth } from './components/requireAuth';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './utils/auth';
import HomePage from './pages/homePage';

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

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route exact path = "/login" element = {<LoginPage/>}></Route>
      <Route exact path = "/register" element = {<RegisterPage/>}></Route>
      <Route exact path = "/select-role" element = {<UserRolePage/>}></Route>
      <Route exact path = "/" element = {<HomePage/>}></Route>

      <Route exact path = "/profile" element = {<RequireAuth><ProfilePage/></RequireAuth>}></Route>
     
      <Route exact path = "*" element = {<HomePage/>}></Route>
    </Routes>
    </BrowserRouter>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </AuthProvider>
  )
}
ReactDOM.render(<App />,document.getElementById('root'));

