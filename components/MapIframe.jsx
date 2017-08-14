import React from 'react';
export default class MapIframe extends React.Component {

    constructor(props) {
        super(props);
        this.scrollPos = {
            xcoord:0,
            ycoord:0
        };
    }

    render() {
        return (
            <iframe
                ref={(c)=>{this.frame = c}}
                src='http://ltcgis.mohw.gov.tw/Map/map_new.aspx'
                frameBorder='0'
                scrolling='no'
            />
        );
    }
    // webkitAllowFullScreen
    // mozallowfullscreen
    // allowFullScreen

    componentDidMount(){
        this.scrollPos = {
            xcoord: Math.min(this.scrollPos.xcoord, this.frame.contentWindow.document.body.offsetHeight),
            ycoord: Math.min(this.scrollPos.ycoord + 100, this.frame.contentWindow.document.body.offsetHeight)
        };
        this.frame.contentWindow.scrollTo(this.scrollPos.xcoord,this.scrollPos.ycoord);
    }

    componentDidUpdate(){
    }

    componentWillUnmount(){
    }
};