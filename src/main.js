import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from './components/landingpage';
import GraphOne from "./components/graphone";
import GraphTwo from "./components/graphtwo";
import GraphThree from "./components/graphthree";
import GraphFour from "./components/graphfour";
import GraphFive from "./components/graphfive";

const Main = () => (
<Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/graphone" component={GraphOne}>
    <GraphOne/>
    </Route>
    <Route path="/graphtwo" component={GraphTwo} />
    <Route path="/graphthree" component={GraphThree}/>
    <Route path ="/graphfour" component={GraphFour}/>
    <Route path="/graphfive" component={GraphFive}/>

</Switch>

)

export default Main;