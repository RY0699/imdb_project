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
            <Link to="/graphone">Graph 1</Link>
            <Link to="/graphtwo">Graph 2</Link>
            <Link to="/graphthree">Graph 3</Link>
            <Link to="/graphfour">Graph 4</Link>
            <Link to="/graphfive">Graph 5</Link>
          </Navigation>
        </Header>
        <Drawer>
        <Navigation>
            <Link to="/graphone">Graph 1</Link>
            <Link to="/graphtwo">Graph 2</Link>
            <Link to="/graphthree">Graph 3</Link>
            <Link to="/graphfour">Graph 4</Link>
            <Link to="/graphfive">Graph 5</Link>
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
