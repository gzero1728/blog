import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import PostCardList from "./normalRoute/PostCardList"
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/CategoryResult";
import PostEdit from "./normalRoute/PostEdit";
import { EditProtectedRoute } from "./protectedRoute/ProtectedRoute";

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    {/*라우트 컨테이너*/}
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/post" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <EditProtectedRoute path="/post/:id/edit" exact component={{ PostEdit }} />
        <Route path="/post/category/:categoryName" exact component={CategoryResult} />
        <Route path="/search/:serachTerm" exact component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
)

export default MyRouter;