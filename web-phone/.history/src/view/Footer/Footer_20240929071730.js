import React from "react";
import './footer.css'
class Footer extends React.Component {
    render() {
        return (
        <div>
            <div id="alert">
                <span id="closebtn">&times;</span> 
            </div>

            <div className="copy-right"> 
                <p>
                    <a href="index.html">LDD Phone Store</a> - All rights reserved © 2021 - Designed by
                    <span style={{ color: '#eee', fontWeight: 'bold' }}> group 15th</span> 
                </p>
            </div>
        </div>
        );
    }
}

export default Footer;
