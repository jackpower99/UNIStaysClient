import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from "./pages/loginPage"
import RegisterPage from './pages/registerPage';
import UserRolePage from './pages/userRolePage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route exact path = "/login" element = {<LoginPage/>}></Route>
      <Route exact path = "/register" element = {<RegisterPage/>}></Route>
      <Route exact path = "/select-role" element = {<UserRolePage/>}></Route>
    </Routes>
    </BrowserRouter>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
ReactDOM.render(<App />,document.getElementById('root'));

