import express                   from 'express';
import React                     from 'react';
import { renderToString, renderToStaticMarkup }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from 'routes';
import { Provider }              from 'react-redux';
import fetchComponentData        from 'lib/fetchComponentData';
import path                      from 'path';
import configureStore from 'store';
import {sendmail} from 'lib/EmailUtil';
import querystring from 'querystring';
import session from 'express-session';
import redis from 'redis';
import api from 'api/HappinessAPI';

var http = require('http'),
  request = require('request'),
  app = express(),
  bodyParser = require('body-parser'),
  querysring = require('querystring'),
  moment = require('moment-timezone'),
  config = require('config.js'),
  redisStore = require('connect-redis')(session),
  server;

  let redisClient = undefined;
  if(!config.isLocalEnv){
    redisClient = redis.createClient(config.redis.port, config.redis.host);
  }

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // config
  var seniorWebUrl = config.seniorWebUrl;
  /** EVN Setting END **/

  var app_token = '8e387797-da95-4366-9578-74714b61effc';

  var appDir = path.dirname(require.main.filename);

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

function careu(req, res, next){
  if(!req.url.startsWith('/__webpack_hmr') && !req.url.startsWith('/health')) console.log('req.url > ' + req.url);
  /** 假的登入資訊，待會員帳號機制開始實作後置換掉它 */
  if(config.isLocalEnv){
    req.session.auth =
    {
      "returnCode": "000",
      "returnMsg": "success",
      "id": "4",
      "accessToken": "9311e858f8bd744cdbcb7220f442c0ba",
      "expiresIn": 23082896,
      "refreshToken": "8796b3337e8c17c4352513e474cb",
      "RJSSKey": "0010011100105DB5379801117014482448243222332270140999999906666FFFFFFF66660FFF8FFF70000999F9990000RJSS",
      "memberId": "1",
      "pid": "0000001",
      "familyName": "本地",
      "firstName": "開發者",
      "sex": "1",
      "cellphone": "0900104104",
      "photo": "http://file.104.com.tw/DocumentManagementTomcatAccess/imgs/104plus/6f1/965/68e/7db7da211d07438e9d9ebb2663c6c11a11_circleHeadXL.jpg?3d264fedc5da37477564e4dae6b6f2a6&v=i25v6icffq6viuci54",
      "profile" : {
          "familyName" : "測試3",
          "firstName" : "member3",
          "name" : "測試member3",
          "enName" : "enName3",
          "email" : {
            "address": "gasjhghal",
            "verifyCode": "",
            "isVerified":false
          },
          "isEmailVerified" : false,
          "tel" : "02000000000",
          "cellphone" : "0912345555",
          "sex" : "1",
          "address" : {
            "cityId":"6001001000",
            "cityName":"",
            "zipId":"",
            "zipName":"",
            "address":"測試3address"
          }, 
          "residenceAddress":{    
            "cityId":"6001001000",
            "cityName":"",
            "zipId":"",
            "zipName":"",
            "address":"測試3address"
          }
      },
      "employee":{
          "id":"testEmploy01",
          "insuranceId":"",
          "onBoardDate":"2012-12-31", 
          "leaveDate":"", 
          "companyId":"1",    
          "companyTel":"0222222222",    
          "companyTelExt":"01"
      }
    }
  }
  next();
}

  server = http.createServer(app);  

  //app.use(express.static(path.join(__dirname, 'dist')));
  app.use('/bundle', express.static(appDir + '/dist'));
  app.use('/resource', express.static(appDir + '/resource'));
  app.use('/common', express.static(appDir + '/common'));
  app.use(nocache);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require('body-parser').urlencoded({extended: false}));
  app.use(require('cookie-parser')());
  app.use(session({
    secret: '104 senior secret',
    // use redis as store only in production mode.
    store: config.isLocalEnv ? undefined : new redisStore({client: redisClient}),
    resave: false,
    saveUninitialized: false
  }));
  //app.use(careu);

  /** for health checking **/
  app.get('/health', function(req, res) {
    res.send('ok!');
  });

  app.get('/fail', function(req, res) {
    res.send('request fail!');
    }
  );

  app.get('/login', function(req, res){
    console.log('login redirect to / ..');
    res.redirect('/');
  });

  app.post('/doLogin', function(req, res){
    console.log('doLogin ..');

    return new api(app_token).login(req.body.email, req.body.password).then((member)=> {
      req.session.auth = member;
      if(req.body.keepLogin == 'on') {
        req.session.cookie.maxAge = 60 * 1000 * 60 * 24 * 7;
        res.redirect('/login');  
      } else {
        res.redirect('/login');        
      }
    }).catch((msg) => {
      res.redirect('/loginPage?error_msg=' + msg + '&email=' + req.body.email);
    });
  });

  app.get('/logout', function(req, res){
    console.log('logout redirect to / ..');
      return new api(req.session.auth).logout().then(()=>{
        req.session.destroy();
         // res.clearCookie('CS');
         // res.redirect('/');
        res.redirect('/login');
      }).catch((msg) => {
        //res.redirect('/loginPage?error_msg=' + msg + '&email=' + req.body.email);
      });
      
  });

  app.get('/member', function(req, res) {
    console.log('get member by token: ' + req.session.auth.accessToken);
    return new api(req.session.auth).getMemberByToken().then((member)=> {
      ///console.log(member);
      req.session.auth = member;
      ///console.log(req.session.auth) ;
      //return req.session.auth;
      res.json( member );
    }).catch((msg) => {
      console.log('getMemberByToken failed, message: ' + msg);
    });
  });


  // ======================== for react ========================

  if (process.env.NODE_ENV !== 'production') {
    require('webpack.dev').default(app);
  }

  app.get('*', (req, res) => {
    const location = createLocation(req.url);

    let store = configureStore();

    console.log('react session > ' + JSON.stringify(req.session.auth));
    if(req.session.auth){
      console.log('setting auth ..');
      store.getState().auth = req.session.auth;
    }

    match({ routes:routes(store), location }, (err, redirectLocation, renderProps) => {
      if(err) {
        console.error(err);
        return res.status(500).end('Internal server error');
      } else if(redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      } else if(!renderProps) {
        return res.status(404).end('Not found');
      }


      function renderView() {
        console.log('[render view] =============');
        const InitialView = (
          <Provider store={store}>
            <RoutingContext  {...renderProps} />
          </Provider>
        );

        const COMPONENT_HTML = renderToString(InitialView);
        const __INITIAL_STATE__ = store.getState();
        const WEB_CONTEXT = config.webContext;

        console.log('react session > ' + JSON.stringify(req.session.auth));
        if(req.session.auth){   // if(false){
          console.log('setting auth > ' + JSON.stringify(__INITIAL_STATE__.auth));
          __INITIAL_STATE__.auth = req.session.auth;
          res.render('index', {__INITIAL_STATE__:JSON.stringify(__INITIAL_STATE__), COMPONENT_HTML, WEB_CONTEXT});
        }
        else{
          // 未登入者，導向臨時首頁. (目前停用)
          // res.render('temp_home', {});
          res.render('index', {__INITIAL_STATE__:JSON.stringify(__INITIAL_STATE__), COMPONENT_HTML, WEB_CONTEXT});
        }
      }

      if(renderProps !== undefined){
        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
          // .then(renderView)
          // .then(html => res.end(html))
          .then(renderView)
          .catch(err => res.end(err.message));
      }
      else {
        return res.status(404).end('Not found');
      }
    });
  });
//});
export default server;
