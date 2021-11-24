import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';

class Landing extends Component {
    render() {
        return (
            <div style={{width: '100%', margin: 'auto'}}>
            <Grid className="landing-grid">
                <Cell col={12}>
                    <img
                    src="https://www.logolynx.com/images/logolynx/79/790212aec0ad18517f1414bda617b435.png"
                    alt="logo"
                    className="logo-img"
                    />

                    <div className="banner-text">
                        <h1>Visual Media Trend Analysis</h1>
                    </div>

                </Cell>

            </Grid>
            </div>
        )
    }
}

export default Landing;