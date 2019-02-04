import React, { Component } from 'react';
import ListePeriodes from './components/ListePeriodes'
import { Col,Row} from 'reactstrap';
import './App.css';
import {DetailPeriode} from "./components/DetailPeriode";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lastListUpdate: new Date()
        }

    }




    onPeriodeCreeEvent = () => {
        console.log("creeeee")
        console.log(this.state)
        this.setState(
            { lastListUpdate:new Date() }
        )
    }

    render() {
        return (
            <div className="App">
                <Row>
                  <Col sm="6">
                      <ListePeriodes lastUpdate={this.state.lastListUpdate}/>
                  </Col>

                  <Col sm="6">
                      <DetailPeriode onCreeEvent={this.onPeriodeCreeEvent}/>
                </Col>
            </Row>
        </div>
    );
  }
}

export default App;
