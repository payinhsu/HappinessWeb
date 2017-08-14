import React from 'react';
import cn from 'classnames';
import { render } from 'react-dom';

import localizer from 'react-big-calendar/localizers/globalize';
import globalize from 'globalize';
import Current from './demos/basic';

localizer(globalize);

console.log('enter app.js ==========================');

let demoRoot = 'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'

//const Example = React.createClass({
export default React.createClass({
  getInitialState(){
    return {
      selected: 'basic'
    };
  },

  render() {
	
	let selected = 'basic';
	/*
    // let selected = this.state.selected;
	let selected = 'basic';
    let Current = {
      basic: require('./demos/basic')
    }[selected];
	*/
	
	//const Current = require('./demos/basic');

    return (
      <div className='app'>
        <div className="jumbotron">
          <div className="container">
            <h1>Big Calendar <i className='fa fa-calendar'/></h1>
            <p>such enterprise, very business.</p>
            <p>
              <a href="#intro">
                <i className='fa fa-play'/> Getting started
              </a>
              {' | '}
              <a href="#api">
                <i className='fa fa-book'/> API documentation
              </a>
              {' | '}
              <a target='_blank' href="https://github.com/intljusticemission/react-big-calendar">
                <i className='fa fa-github'/> github
              </a>
            </p>
          </div>
        </div>
        <div className='examples contain'>
          <aside>
            <ul className='nav nav-pills'>
              <li className={cn({active: selected === 'basic' })}>
                <a href='#' onClick={this.select.bind(null, 'basic')}>Basic</a>
              </li>
              <li className={cn({active: selected === 'selectable' })}>
                <a href='#' onClick={this.select.bind(null, 'selectable')}>Selectable</a>
              </li>
              <li className={cn({active: selected === 'cultures' })}>
                <a href='#' onClick={this.select.bind(null, 'cultures')}>I18n and Locales</a>
              </li>
              <li className={cn({active: selected === 'popup' })}>
                <a href='#' onClick={this.select.bind(null, 'popup')}>Popup</a>
              </li>
              <li className={cn({active: selected === 'timeslots' })}>
                <a href='#' onClick={this.select.bind(null, 'timeslots')}>Timeslots</a>
              </li>
              <li className={cn({active: selected === 'rendering' })}>
                <a href='#' onClick={this.select.bind(null, 'rendering')}>Custom rendering</a>
              </li>
              {/* temporary hide link to documentation
              <li className={cn({active: selected === 'customView' })}>
                <a href='#' onClick={this.select.bind(null, 'customView')}>Custom View</a>
              </li>
              */}
            </ul>
          </aside>
          <div className='example'>
            <div className='view-source'>
              <a target='_blank' href={demoRoot + '/' + selected + '.js' }>
                <strong><i className='fa fa-code'/>{' View example source code'}</strong>
              </a>
            </div>
            <Current className='demo' />
          </div>
        </div>
      </div>
    );
  },

  select(selected, e){
    e.preventDefault();
    this.setState({ selected })
  }
});

//render(<Example/>, document.getElementById('root'));
