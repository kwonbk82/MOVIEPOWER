import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  MainPage,
  LoginPage,
  SignupPage,
  MovieListPage,
  MovieDetailPage,
  ReviewWritePage,
  EventDetailPage,
  EventListPage,
  SearchActorListPage,
  ActorDetailPage,
  AdminPage,
  InquiryWritePage,
  SearchResultPage,
} from "./components/pages";
import { Header, Footer } from "./components/common";

import "./App.css";

const Layout = () => {
  return (
    <div id="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<MainPage />} index />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signup" />
            <Route element={<MovieListPage />} path="/movielist" />
            <Route element={<MovieDetailPage />} path="/moviedetail/:id" />
            <Route element={<ReviewWritePage />} path="/reviewwrite/:id" />
            <Route element={<EventListPage />} path="/eventlist" />
            <Route element={<EventListPage />} path="/events/premieres" />
            <Route element={<EventListPage />} path="/events/goods" />
            <Route element={<EventDetailPage />} path="/eventdetail/:id" />
            <Route element={<SearchActorListPage />} path="/actorlist" />
            <Route element={<ActorDetailPage />} path="/actordetail/:id" />
            <Route element={<AdminPage />} path="/admin" />
            <Route element={<InquiryWritePage />} path="/inguirywrite" />
            <Route element={<SearchResultPage />} path="/search" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
