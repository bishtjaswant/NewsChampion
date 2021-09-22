import React, { Component } from 'react';
import loading from "./spinner.gif";


class Spinner extends Component {
    render() {
        return (
            <div className="text-center">
                   <img src={loading} alt="" width={45} height={45} />

            </div>
        );
    }
}

export default Spinner;