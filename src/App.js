import React from "react";
import './App.css';
import { Layout, Header, Drawer, Content, Navigation} from "react-mdl";
import { Link } from "react-router-dom";
import Main from "./main";
function App() {
  return (
    <div className = "heading">
      <Layout>
        <Header title="IMDB Project" scroll>
          <Navigation>
            <a href="/">Graph 1</a>
            <a href="/">Graph 2</a>
            <a href="/">Graph 3</a>
          </Navigation>
        </Header>
        <Drawer>
        <Navigation>
            <a href="/">Graph 1</a>
            <a href="/">Graph 2</a>
            <a href="/">Graph 3</a>
          </Navigation>
        </Drawer>
        <Content>
          <div className='page-content' />
          <Main/>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
