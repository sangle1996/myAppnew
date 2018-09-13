angular.module('starter.controllers', ['ngCordova.plugins.file', 'ngCordova.plugins.device']).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // Form data for the login modal
    /* $scope.loginData = {};

     // Create the login modal that we will use later
     $ionicModal.fromTemplateUrl('templates/login.html', {
       scope: $scope
     }).then(function(modal) {
       $scope.modal = modal;
     });

     // Triggered in the login modal to close it
     $scope.closeLogin = function() {
       $scope.modal.hide();
     };

     // Open the login modal
     $scope.login = function() {
       $scope.modal.show();
     };

     // Perform the login action when the user submits the login form
     $scope.doLogin = function() {
       console.log('Doing login', $scope.loginData);

       // Simulate a login delay. Remove this and replace with your login
       // code if using a login system
       $timeout(function() {
         $scope.closeLogin();
       }, 1000);
     };*/
  }).controller('LoginCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $http, $state) {
    $scope.loginData = {};
    $scope.login = function() {
      $scope.usernamenull = "b";
      $scope.passwordnull = "b";
      $scope.themduoc = true;
      // console.log($scope.loginData.username);
      if (!$scope.loginData.username) {
        $scope.usernamenull = "a";
        $scope.message = "Please enter your username and password.";
        $scope.themduoc = false;
      }
      if (!$scope.loginData.password) {
        $scope.passwordnull = "a";
        $scope.message = "Please enter your username and password.";
        $scope.themduoc = false;
      } else if ($scope.themduoc == true) {
        $ionicLoading.show();
        var _condigHeader = {
          headers: {
            'Authorization': 'Basic 23423432',
            'Access-Control-Allow-Headers': 'Origin; X-Requested-With; Content-Type; Accept',
            'Access-Control-Allow-Methods': 'GET; POST',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          }
        };
        var dataPost = {
          "username": $scope.loginData.username,
          "password": $scope.loginData.password
        };
        $http({
          url: 'http://api-dev.gdesk.io/v3/auth/login',
          _condigHeader,
          method: 'POST',
          data: dataPost
        }).then(function(response) {
          $scope.ListData = response;
          if (response.data.success == true) {
            $ionicLoading.hide();
            $scope.message = "success";
            $state.go("draw");
          } else {
            $scope.message = $scope.ListData.data.message;
            $ionicLoading.hide();
          }
        });
      }
    }
    $scope.create = function() {
      $state.go("signup", {}, {
        reload: true
      })
    }
  }).controller('SignupCtrl', function($scope, $ionicLoading, $ionicModal, $timeout, $state, $http) {
    $scope.data = {};
    $scope.continue = function() {
      $scope.themduoc = true;
      $scope.firstnamenull = "b";
      $scope.lastnamenull = "b";
      $scope.emailnull = "b";
      $scope.usernamenull = "b";
      $scope.passwordnull = "b";
      $scope.companynull = "b";
      if ($scope.data.firstname) {
        window.localStorage.setItem("firstname", $scope.data.firstname);
      } else {
        $scope.firstnamenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.lastname) {
        window.localStorage.setItem("lastname", $scope.data.lastname);
      } else {
        $scope.lastnamenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.email) {
        window.localStorage.setItem("email", $scope.data.email);
      } else {
        $scope.emailnull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.username) {
        window.localStorage.setItem("username", $scope.data.username);
        if ($scope.data.username.trim().split('').length <= 6) {
          $scope.message = "Oops! Username is too short.";
          $scope.usernamenull = "a"
          $scope.themduoc = false;
        }
      } else {
        $scope.usernamenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.password) {
        window.localStorage.setItem("password", $scope.data.password);
        if ($scope.data.password.trim().split('').length <= 6) {
          $scope.message = "Oops! Password is too short.";
          $scope.passwordnull = "a"
          $scope.themduoc = false;
        }
      } else {
        $scope.passwordnull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.company) {
        window.localStorage.setItem("company", $scope.data.company);
      } else {
        $scope.companynull = "a";
        $scope.themduoc = false;
      }
      if ($scope.themduoc == true) {
        $ionicLoading.show();
        var _condigHeader = {
          headers: {
            'Authorization': 'Basic 23423432',
            'Access-Control-Allow-Headers': 'Origin; X-Requested-With; Content-Type; Accept',
            'Access-Control-Allow-Methods': 'GET; POST',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          }
        };
        var dataPost = {
          "username": $scope.data.username,
          "email": $scope.data.email
        };
        $http({
          url: 'http://api-stage.gdesk.io/v2/auth/profileexist',
          _condigHeader,
          method: 'POST',
          data: dataPost
        }).then(function(response) {
          $scope.ListData = response;
          if ($scope.ListData.data.success == true) {
            $ionicLoading.hide();
            $state.go("signupdetail");
          } else {
            $scope.message = $scope.ListData.data.message;
            $ionicLoading.hide();
          }
        });
      }
    }
    $scope.haveaccount = function() {
      $state.go("login")
    }
  }).controller('SignupdetailCtrl', function($scope, $http, $ionicLoading, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
    $scope.data = {};
    document.addEventListener("deviceready", function() {
      var device = $cordovaDevice.getDevice();
      var cordova = $cordovaDevice.getCordova();
      $scope.model = $cordovaDevice.getModel();
      var platform = $cordovaDevice.getPlatform();
      $scope.uuid = $cordovaDevice.getUUID();
      var version = $cordovaDevice.getVersion();
    }, false);
    $scope.themduoc = true;
    $scope.save = function() {
      $scope.themduoc = true;
      $scope.companyphonenull = "b";
      $scope.streetaddressnull = "b";
      $scope.aptnull = "b";
      $scope.citynull = "b";
      $scope.stanull = "b";
      $scope.zipcodenull = "b";
      if (!$scope.data.companyphone) {
        $scope.companyphonenull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.streetaddress) {
        $scope.streetaddressnull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.apt) {
        $scope.aptnull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.city) {
        $scope.citynull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.sta) {
        $scope.stanull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.zipcode) {
        $scope.zipcodenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.themduoc == true) {
        var _condigHeader = {
          headers: {
            'Authorization': 'Basic 23423432',
            'Access-Control-Allow-Headers': 'Origin; X-Requested-With; Content-Type; Accept',
            'Access-Control-Allow-Methods': 'GET; POST',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          }
        };
        var dataPost = {
          "company": {
            "address": $scope.data.streetaddress,
            "apt": $scope.data.apt,
            "city": $scope.data.city,
            "phone": $scope.data.companyphone,
            "state": $scope.data.sta,
            "zipcode": $scope.data.zipcode
          },
          "device": (!angular.isUndefined($scope.model)) ? $scope.model : ionic.Platform.platform() + ionic.Platform.version(),
          "profile": {
            "company_name": window.localStorage.getItem("company"),
            "email": window.localStorage.getItem("email"),
            "first_name": window.localStorage.getItem("firstname"),
            "last_name": window.localStorage.getItem("lastname"),
            "password": window.localStorage.getItem("password"),
            "username": window.localStorage.getItem("username")
          }
        };
        $http({
          url: 'http://api-stage.gdesk.io/v2/auth/signup',
          _condigHeader,
          method: 'POST',
          data: dataPost
        }).then(function(response) {
          $scope.ListData = response;
          if ($scope.ListData.data.success == true) {
            window.localStorage.setItem("message", $scope.ListData.data.message);
            $state.go("chucmung");
          } else {
            $scope.message = $scope.ListData.data.message;
          }
        });
      }
    }
  }).controller('ChucmungCtrl', function($scope, $http, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
    $scope.message = window.localStorage.getItem("message");
    $scope.login = function() {
      window.localStorage.removeItem("company");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("firstname");
      window.localStorage.removeItem("lastname");
      window.localStorage.removeItem("password");
      window.localStorage.removeItem("username");
      $state.go("login", {}, {
        reload: true
      });
    }
  }).controller('DrawCtrl', function($cordovaFile, $ionicPopup, $ionicLoading, $rootScope, $scope, $http, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
      
        $scope.data = {}
        
      $scope.sizes=[{'img':'haft','name':'1/2 page','size':'310x370'},
      {'img':'full','name':'Full page','size':'620x370'},
      {'img':'square','name':'Square','size':'370x370'}
      ];
      $scope.width=360;
      $scope.height=370;
      /* begin: choose size of vanvas */
        
  

/*
interact(gestureArea)
  .gesturable({
    onstart: function (event) {
      clearTimeout(resetTimeout);
      scaleElement.classList.remove('reset');
    },
    onmove: function (event) {
      scale = scale * (1 + event.ds);

      scaleElement.style.webkitTransform =
      scaleElement.style.transform =
        'scale(' + scale + ')';

      dragMoveListener(event);
    },
    onend: function (event) {
      resetTimeout = setTimeout(reset, 1000);
      scaleElement.classList.add('reset');
    }
  })
  .draggable({ onmove: dragMoveListener });

function reset () {
  scale = 1;
  scaleElement.style.webkitTransform =
  scaleElement.style.transform =
    'scale(1)';
}
*/

  var init = function() {
  
      return $ionicModal.fromTemplateUrl('modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        })
      .then(function(modal) {
        $scope.modal = modal;
      })
    
  };

  
  $scope.showPopup = function() {
    init().then(function() {
      $scope.modal.show();
        });
  };

 $scope.showPopup();
   $scope.data.height;
    $scope.default_style= document.getElementById("flex").style;
    var portrait=0
     $scope.isportrait=function(value){
      portrait=value;
     };
    
   $scope.sizepage = function(ok) {
    if(portrait==0){
  
        $scope.data.topcanvas=ok=='haft'?'-10px':ok=='square'?'18px':'145px';

 }else {
    $scope.data.topcanvas=ok=='haft'?'100px':ok=='square'?'150px':'250px';
           }
    
    document.getElementById("flex").style.removeProperty('transform');
    document.getElementById("flex").removeAttribute("data-x");
     document.getElementById("flex").removeAttribute("data-y");
 // document.getElementById("flex").style = $scope.default_style;
      //  document.getElementById("flex").reset();
          $scope.move(false);
      $scope.statepage(ok);
      $scope.pospage(true);
        //   document.getElementById("flex").reload(true);
            $scope.delete();
            $scope.modal.remove();
             canvas.setWidth(370);
              $scope.widthheight={'width':370,'height':ok=='haft'?310:ok=='square'?370:620}
            canvas.setHeight(ok=='haft'?310:ok=='square'?370:620);
            $scope.data.height=ok=='haft'?310:ok=='square'?370:620;
            canvas.renderAll();
                  $scope.data.ruler=true; 
            $scope.ruler($scope.data.zoom);
        
               } 
               
 /*end: choose size of vanvas*/
 $scope.state=true;
   /*   $scope.full=function(state){

        $scope.state=state==true?false:true;
        canvas.setHeight(state==true?620:370);
        $scope.ionheader=state==true? {'display': 'none'}:'';
        $scope.ioncontent=state==true?{'top':'0px'}:'';
        canvas.renderAll();
      }*/

    var canvas = new fabric.Canvas('c', {
      selection: false,
      backgroundColor: "white",
      height: $scope.height,
      with: $scope.width,
    //  allowTouchScrolling: true,
    }); ////  CREATE NEW CANVAS.
    $scope.reset = false;
    $scope.data = {};
    $scope.data.drawline = false;
    $scope.data.draw = false;
    $scope.data.valueo = 1;
    var a = function() {
      document.addEventListener('deviceready', function() {
        if (ionic.Platform.isAndroid()) {
          window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
        }

        function successFunction() {}

        function errorFunction(error) {}
      });
    }

   // document.addEventListener('deviceready', function() {
      window.addEventListener("orientationchange", function() {
        $scope.isportrait(window.orientation);
        if (ionic.Platform.isAndroid()) {
          window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);

        }

        function successFunction() {}

        function errorFunction(error) {}
      }, false);
   // });
    a();
    /* document.getElementById("c").setAttribute('width', screen.width-40+'!important');*/
    // document.getElementById("c").width=screen.width-40;
    function changeObjectSelection(value) { 
      canvas.forEachObject(function(obj) {
        obj.selectable = value;
      });
      var objects = canvas.getObjects('image');
      for (let i in objects) {
        if (objects[i].get('id') == 'background') {
          objects[i].selectable = false;
        }
      }
      canvas.renderAll();
    }

    function removeEvents() {
      canvas.isDrawingMode = false; //// can't draw the line
      canvas.selection = false; /// can't select any thing
      canvas.off('mouse:down'); /// turn off this event
      canvas.off('mouse:up');
      canvas.off('mouse:move');
    }
    $scope.data.value = 1; // default size off brush
    $scope.min = 1; // min size off brush
    $scope.max = 20; // max size off brush
 
    ///////// MIN MAX DRAW BRUSH
    $scope.setlevel = function(value) {
    $scope.lineweight={'height': value+'px'}
      //$scope.stylecolor= {'background-size':'99% 2px'};
      $scope.data.value = value;
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("strokeWidth", Math.abs(value));
        canvas.requestRenderAll();
          if(canvas.getActiveObject().get("type") == "group"){
        for(let i in canvas.getActiveObject()._objects){
            canvas.getActiveObject()._objects[i].set("strokeWidth",Math.abs(value)  );
        }
        }
      }

      canvas.freeDrawingBrush.width = Math.abs($scope.data.value); // the value on change and remake the size of brush
    }
    //////// MIN MAX DRAW BRUSH
    ////////// MOUSE DOWN
    var mousedown = function() {
      
   
      canvas.on('mouse:down', function(e) {
        if(!$scope.data.scroll){
        
        $scope.showitext = false;
        $scope.$evalAsync();
        if (e.target) {
          if (e.target.get('type') === "text") {
           $scope.data.colorbrush = canvas.getActiveObject().get('stroke')==null?'rgb(0, 0, 0)':canvas.getActiveObject().get('stroke');
             $scope.data.colorfill = canvas.getActiveObject().get('fill')==null?'rgb(0, 0, 0)':canvas.getActiveObject().get('fill');
             $scope.data.valueo = e.target.get('opacity');
            $scope.showitext = true;
            $scope.data.text = e.target.get('text')=='Text'?'':e.target.get('text');
            $scope.bold=e.target.fontWeight=='bold'?true:false;
            $scope.italic=e.target.fontStyle=='italic'?true:false;
            $scope.underline=e.target.underline=='underline'?true:false;
            $scope.linethrough=e.target.linethrough=='linethrough'?true:false;
            $scope.abc.item=canvas.getActiveObject().get("fontFamily");
            console.log(e.target.get('fill'));
            $scope.$evalAsync();
            } else {
            if (e.target.get('id') != "img"&&e.target.get('type') !== "group" ) {
            $scope.showitext = false;
            if (window.angular.isString(e.target.get('fill'))) {
              $scope.data.fill = true;
              $scope.data.colorfill = e.target.get('fill');

            } else {
              $scope.data.fill = false;

            }
            
             
              $scope.data.valueo = e.target.get('opacity');
              $scope.isdashed = e.target.strokeDashArray;
              $scope.data.value = e.target.strokeWidth;
            
              $scope.data.colorbrush = e.target.get('stroke');
              e.target.set('padding', 20);
              e.target.set('cornerSize', 20);
              e.target.set('borderColor', '#E8E8E8');
              e.target.set('cornerColor', '#44444487');
              e.target.set('transparentCorners', true);
              e.target.set('cornerStyle', 'circle'); //or rect
            }
              else if(canvas.getActiveObject().get('type') === "group"){
            if(canvas.getActiveObject().get("type") == "group"){
        for(let i in canvas.getActiveObject()._objects){
             $scope.data.colorbrush=e.target._objects[i].get("stroke");
               $scope.data.valueo = e.target._objects[i].get("opacity");
               $scope.data.value = e.target._objects[i].strokeWidth;
                $scope.isdashed = e.target._objects[i].strokeDashArray;
        }
        }
            } 
            console.log($scope.data.colorbrush);
            $scope.$evalAsync();
          }
        } else {
          changeObjectSelection(true);
        }
      }
      });
  

}


    /*   canvas.on({
 'touch:gesture': function(event) {
  // Handle zoom only if 2 fingers are touching the screen
  if (event.e.touches && event.e.touches.length == 2) {
    // Get event point
    var point = new fabric.Point(event.self.x, event.self.y);
    // Remember canvas scale at gesture start
    if (event.self.state == "start") {
      zoomStartScale = self.canvas.getZoom();
    }
    // Calculate delta from start scale
    var delta = zoomStartScale * event.self.scale;
    // Zoom to pinch point
    self.canvas.zoomToPoint(point, delta);
  }

  }})*/
        

    
    
   
    //////////MOUSE MOVE
    /*    var blue = new fabric.Rect({
       id:1,top: 60, left: 240, width: 10, height: 10, fill: 'blue',opacity :false,selectable:false });
        canvas.add(blue);
        canvas.renderAll();
       var mousemove = function() {
       canvas.on('mouse:move', function(e) {
       var pointer = canvas.getPointer(event.e);

       if(pointer.x>230){
          
           for(let i in canvas.getObjects()){
             if(canvas.getObjects()[i].id==1)
             {
               canvas.getObjects()[i].set('opacity',true);
             }
           }
           canvas.renderAll();  
       }
      


       });
     }*/

    //////////MOUSE MOVE
    var isevented=function(value){
         for(let i in canvas.getObjects()){
    canvas.getObjects()[i].set('evented',value);

      canvas.renderAll();

    }
    }
 
$scope.move=function(ismove){
  if(ismove){
   
    $scope.data.scroll=ismove;
 
    isevented(false)

  $scope.mode(0,0);
  $scope.data.draw=false;
  canvas.discardActiveObject();
   gesture();

    //canvas.set('allowTouchScrolling', true) ;

   canvas.renderAll();
}
else{

  $scope.data.scroll=ismove;
  isevented(true)
  hammertime.get('pan').set({
        enable: false
    });
   hammertime.get('pinch').set({
        enable: false
    });
   hammertime.get('press').set({
        enable: false,
    });

    //interact(document.getElementById('flex'))
  //.draggable(false) // disable dragging
  //.gesturable(false)
 /* $scope.mode(false,0);
  $scope.data.draw=false;
  mousedown();*/
  // canvas.set('allowTouchScrolling', false) ;
 
  
}
}

$scope.data.stylecanvas='grey';
var hammertime = new Hammer(document.getElementById("flex"));
   var  posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
          transform = "",
          el = document.getElementById("flex");
$scope.pospage=function(){
     posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
          transform = "",
          el = document.getElementById("flex");
}
 $scope.islogzoom=false;
var gesture=function(){
         
       
  

   hammertime.get('pan').set({
        enable: true
    });
    hammertime.get('pinch').set({
        enable: true
    });
    hammertime.get('press').set({
        enable: true,
        time: 250,
        pointers: 1,
        threshold: 5
    });

    hammertime.on(' pan pinch panend pinchend press pressup', function(ev) {
      $scope.islogzoom=true;
      $scope.data.logzoom=ev.type=="pinch"?"Zoom":ev.type=="pan"?"Move":"Reset";
      $scope.$evalAsync();
      var ispanend=ev.type=="panend"?true:false;
        //pan   
         console.log(ev);
        if(ev.type=="press"){
         
          $scope.pospage();
        };

        if (scale != 1 &&  !ispanend || ev.type=="pan") {
           
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
       /*     if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
            */
        }


        //pinch

        if (ev.type == "pinch") {
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
            $scope.shadowstyle=scale==4?{'box-shadow':'0px 0px 50px  red'}:scale==.999?{'box-shadow':'0px 0px 50px  red'}:{'box-shadow':'0px 0px 50px  green'};
             $scope.$evalAsync();
        }
        if(ev.type == "pinchend"){
        last_scale = scale;
        $scope.shadowstyle={'box-shadow':'0px 0px 50px  grey'};
          $scope.islogzoom=false;
         $scope.$evalAsync(); }

        //panend
        if(ev.type == "panend" ){
            last_posX = posX ;//< max_pos_x ? posX : max_pos_x;
            last_posY = posY ;//< max_pos_y ? posY : max_pos_y;
             $scope.islogzoom=false;
             $scope.$evalAsync();

        }
        if(ev.type == "pressup" ){
             $scope.islogzoom=false;
             $scope.$evalAsync();

        }
       
        if (scale != 1||ev.type == "pan"||ev.type=="press") {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 1)";
        }

        if (transform) {
            el.style.webkitTransform =  el.style.transform  = transform;
        }
    });


/*canvas.on('mouse:wheel', function(opt) {

  var scale = opt.e.deltaY;
         if(scale<=1){
          if(canvas.width>=min||canvas.height>=min){
           $scope.Zoominfinger(scale); 
             
          }else{$scope.canvas='red';}
         }else if(scale>1){ 

        if(canvas.width<=max&&canvas.height<=max){
           $scope.Zoominfinger(scale); 
             
          }else{$scope.canvas='red';} 

         }     
})*/ 
/* var gestureArea = document.getElementById('flex'),
    resetTimeout;
interact(gestureArea)
  .gesturable({
    onstart: function (event) {
   
      $scope.shadowstyle={'box-shadow':'0px 0px 50px  green'};

       $scope.$evalAsync();
       
    },
    onmove: function (event) {
    //  if($scope.canvas){canvas._offset= $scope.canvas}
      
     $scope.shadowstyle={'box-shadow':'0px 0px 50px  green'};
      $scope.$evalAsync();
       
      scale = scale * (1 + event.ds);
       
        if(scale>=0&&scale<=6){
         if(scale<=1){
          if(canvas.width>=min||canvas.height>=min){
           $scope.Zoominfinger(scale); 
             
          }else{ $scope.shadowstyle={'box-shadow':'0px 0px 50px  red'};
         $scope.$evalAsync();}
         }else if(scale>=1){ 

        if(canvas.width<=max&&canvas.height<=max){
           $scope.Zoominfinger(scale); 
             
          }else{ 
          $scope.shadowstyle={'box-shadow':'0px 0px 50px  red'};
         $scope.$evalAsync();} 

         }
            

       
          }
             
         
         
     
    },
    onend: function (event) {
      $scope.shadowstyle={'box-shadow':'0px 0px 50px  gray'};
        $scope.$evalAsync();
      scale=1;
     
    }
  })
  .draggable({ onmove:  function (event) {dragMoveListener(event);
   $scope.shadowstyle={'box-shadow':'0px 0px 50px  green'};
        $scope.$evalAsync();},
  onend: function (event) {
      $scope.shadowstyle={'box-shadow':'0px 0px 50px  gray'};
        $scope.$evalAsync();
      scale=1;
     
    } });

*/
 /* canvas.on({ 
     
        'touch:gesture': function(e) {
               
             
            changeObjectSelection(false);

            
          
            if (e.e.touches && e.e.touches.length == 2) {
               
                var point = new fabric.Point(e.self.x, e.self.y);
                if (e.self.state == "start") {
                    zoomStartScale = canvas.getZoom();
                }
                var delta = zoomStartScale * e.self.scale;
                console.log(delta);
            if(canvas.getWidth()<=1200&&canvas.getHeight()<=1000){
                $scope.Zoominfinger(delta);
            }
              else if(delta<=1){

                $scope.Zoominfinger(delta);
            }
             
                
                
            }

          
        },
      
          
       
    });*/

}


    ////LIST SHAPE
    $scope.listshape = ["square", "circle", "multi"];
    $scope.liststraight = ["arrow", "arrows", "straight"];
    ////LIST SHAPE
    //  MODE DRAW LINE, DRAW CIRCLE,...

    $scope.mode = function(isdraw, shape) {
      if (!isdraw) {
         
       //  canvas.set('allowTouchScrolling', false) 
        removeEvents();
        changeObjectSelection(true);
        mousedown(true);
        $scope.showshape=false;
        $scope.showstraight=false;
      } else if (isdraw==1) {
        // canvas.set('allowTouchScrolling', false) 
        $scope.move(0);
        $scope.data.draw = true;
        $scope.showitext = false;
        $scope.shapes = shape;
        if (shape == "square") {
          drawSquare();
        } else if (shape == "circle") {
          drawCircle();
        } else if (shape == "multi") {
          drawArrow();
        } else if (shape == "straight") {
          drawStraight();
        } else if (shape == "arrow") {
          drawLinearrow();
        } else if (shape == "arrows") {
          drawArrows();
        } else {
          drawingLine();
        }
      }
    }
    //  MODE DRAW LINE, DRAW CIRCLE,...
     $scope.data.colorbrush='#000000';
    /////  CHANGE COLOR BRUSH
  /* var someSvgElement = document.getElementById('someSvgElementId');
var rulez = new Rulez({
    element: someSvgElement,
    alignment: 'left'

});

rulez.render();*/
$scope.statepage=function(value){

  $scope.ruleroutside=[];
$scope.ruleroutsidex=[];
var top=0;
var style={};
var index=0;
var sizeruler= value=='haft'?62:value=='square'?74:125; 
var sizerulerx= 74;
for(var i=0;i<sizeruler;i++){
  index=index+1;
  if(index==5||top==0){ 
       style={'style':'top:'+top+'px','number':i};
       index=0;
     }
    else{
     style={'style':'top:'+top+'px','width':'0.5 !important'}
   }

  $scope.ruleroutside.push(style);
  top=top+5;
}
var top=0;
var style={};
var index=0;
var topnumber=value=="square"?-13.9:-13.9;
var leftnumber=value=="square"?-2:-2;
for(var i=0;i<sizerulerx;i++){
  index=index+1;
  if(index==5||top==0){ 
       style={'style':'left:'+top+'px','number':i,'text':'top:'+topnumber+'px;left:'+leftnumber+'px'};
       index=0;
     }  
    else{
     style={'style':'left:'+top+'px','text':'top:'+topnumber+'px;left:'+leftnumber+'px'}
   }
   $scope.ruleroutsidex.push(style);
  top=top+5;

}
}


    $scope.changecolor = function() {
   
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("stroke", $scope.data.colorbrush);
        if (canvas.getActiveObject().get("type") == "polyline") {
          canvas.getActiveObject().set("fill", $scope.data.colorbrush);
        }
        if(canvas.getActiveObject().get("type") == "group"){
        for(let i in canvas.getActiveObject()._objects){
            canvas.getActiveObject()._objects[i].set("stroke", $scope.data.colorbrush);
        }
        }
      }
      canvas.freeDrawingBrush.color =$scope.data.colorbrush  ;
      canvas.requestRenderAll();
    };
  
    /////  CHANGE COLOR BRUSH
    //////// BEGIN: CLEAN-BACKGROUND

    /////// END: CLEAN-BACKGROUND
    /////// BEGIN: SET BACKGROUND

    var copbg = $rootScope.$on("uploadbg", function(event, opt) {
      
       if($scope.data.height==620)
            {
               fabric.Image.fromURL(opt.a, function(img) {
        // add background image
     
        var center = canvas.getCenter(); ///get center value
        var scaleWidth = canvas.getWidth() / img.width;
                var scaleHeight = canvas.getHeight() / img.height;
                var scale = Math.min(scaleWidth, scaleHeight);
                   
          img1 = img.set({
            scaleX: scale,
            scaleY: scale,
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
          });

       canvas.setBackgroundImage(img1);
       canvas.renderAll();
      });
            }
            else if($scope.data.height==370){
               fabric.Image.fromURL(opt.a, function(img) {
        // add background image
     
        var center = canvas.getCenter(); ///get center value
        var scaleWidth = canvas.getWidth() / img.width;
                var scaleHeight = canvas.getHeight() / img.height;
                var scale = Math.min(scaleWidth, scaleHeight);
                   
          img1 = img.set({
            scaleX: scale,
            scaleY: scale,
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
          });
          
        

       canvas.setBackgroundImage(img1);
       canvas.renderAll();
      });}else if($scope.data.height==310){
              
               fabric.Image.fromURL(opt.a, function(img) {
                var center = canvas.getCenter(); ///get center value
                var scaleWidth = canvas.getWidth() / img.width;
                var scaleHeight = canvas.getHeight() / img.height;
                var scale = Math.min(scaleWidth, scaleHeight);
                   
          img1 = img.set({
            scaleX: scale,
            scaleY: scale,
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
          });
          
        
       canvas.setBackgroundImage(img1);
       canvas.renderAll();
      });}
     

    });
    $scope.$on('$destroy', function() {
      copbg();
    });
    /////// END: SET BACKGROUND
    /////// BEGIN: IMPORT IMAGE
    var copimage = $rootScope.$on("images", function(event, opt) {
      $scope.mode(false, "");
      $scope.data.draw = false;

      fabric.Image.fromURL(opt.a, function(img) {
        var center = canvas.getCenter(); ///get center value
        if (img.width <= img.height) { //////// check size to fit image
          console.log("??");
          img1 = img.set({
            id: 'img',
            scaleX: canvas.width / (img.width*2),
            scaleY: canvas.width / (img.width*2),
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
            padding: 20,
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
          });
          canvas.add(img1);
        }
        if (img.width >= img.height) {
          img1 = img.set({
            id: 'img',
            scaleX: canvas.height / (img.height*2),
            scaleY: canvas.height / (img.height*2),
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
            padding: 20,
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
          });
          canvas.add(img1);
        }
        canvas.renderAll();
      });
    });
    $scope.$on('$destroy', function() {
      copimage();
    });
    /////// END: IMPORT IMAGE
    ////// BEGIN: SET LEVEL OPANCITY
    $scope.setlevelo = function(value) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set('opacity', value);
        canvas.renderAll();
      }
      
       console.log(canvas.freeDrawingBrush);
      canvas.requestRenderAll();

      $scope.opanlevel = {    /* CSS */
        'opacity': value
      };
    }
    ////// END: SET LEVEL OPANCITY
    /// BEGIN: BACKGROUND COLOR
    $scope.changecolorbg = function() {
      canvas.backgroundColor = $scope.data.colorbg;
      canvas.renderAll();
      $scope.backgroundimage=false;
    };
    //// END: BACKGROUND COLOR
    ///////BEGIN:COPY
    $scope.Pass = function() {
      _clipboard = "";
      // clone again, so you can do multiple copies.
      canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
      });
      _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas;
          clonedObj.forEachObject(function(obj) {
            obj.set('id', 'square');
            canvas.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          clonedObj.set('id', 'square');
          canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
      });
    };
    ///////END:COPY
    ///// BEGIN: HAVE DASHED
    $scope.isdashed = false;
    $scope.Dashed = function() {
      console.log($scope.isdashed)
      if ($scope.isdashed == false) {
        $scope.isdashed = [10, 10];
        canvas.freeDrawingBrush.strokeDashArray = $scope.isdashed;
      } else if ($scope.isdashed != false) {
        $scope.isdashed = false;
        canvas.freeDrawingBrush.strokeDashArray = false;
      }
      if (canvas.getActiveObject()) {
        if (canvas.getActiveObject().get('id') != 'img' && canvas.getActiveObject().get('type') != 'text') {
           if(canvas.getActiveObject().get("type") == "group"){
        for(let i in canvas.getActiveObject()._objects){
          canvas.getActiveObject()._objects[i].set('strokeDashArray', $scope.isdashed);
            }
        }else{
          canvas.getActiveObject().set('strokeDashArray', $scope.isdashed);
        }
          canvas.renderAll();
        }
      }
    }
    ////// END : HAVE DASHED
    //// BEGIN: EVENT CLICK TO EDIT COLOR
    canvas.on('before:transform', function() {
      if (canvas.getActiveObject().get('id') != 'img' &&canvas.getActiveObject().get('type') != 'group' ) { $scope.data.colorbrush = canvas.getActiveObject().stroke;}
      if (canvas.getActiveObject().get('type') == 'text') {
        $scope.data.colorbrush  = canvas.getActiveObject().fill;
      }
    });
    //// END: EVENT CLICK TO EDIT COLOR
    // BEGIN: CONSOLE OBJECT
    var resetobjects = function(){ 
      $scope.data.paraobjects = [];
      for (let i in canvas.getObjects()) {
       if(canvas.getObjects()[i]){
           
           if(canvas.getObjects()[i].get('dirty'))
        {
          canvas.remove(canvas.getObjects()[i]);
          canvas.renderAll();
            resetobjects();
            break;

        }
          else{

        var obj = {};
        obj["image"] = canvas.getObjects()[i].toDataURL('png');
        obj["type"] = canvas.getObjects()[i].get('type');
        $scope.data.paraobjects.push(obj);
        }
        }
       
      }} 

    $scope.data.show = false;
    $scope.objects = function() {
      $scope.data.show = !$scope.data.show;
      resetobjects();

    }
    

    $scope.filloption=function(){
       
        $scope.showitext = false;
        $scope.$evalAsync();
        if (canvas.getActiveObject()) {
          if (canvas.getActiveObject().get('type') === "text") {
            $scope.data.colorbrush = canvas.getActiveObject().get('stroke')==null?'rgb(0, 0, 0)':canvas.getActiveObject().get('stroke');
            $scope.data.colorfill = canvas.getActiveObject().get('fill')==null?'rgb(0, 0, 0)':canvas.getActiveObject().get('fill');
            $scope.data.valueo = e.target.get('opacity');
            $scope.showitext = true;
            $scope.data.text = canvas.getActiveObject().get('text')=='Text'?'':canvas.getActiveObject().get('text');
            $scope.bold=canvas.getActiveObject().fontWeight=='bold'?true:false;
            $scope.italic=canvas.getActiveObject().fontStyle=='italic'?true:false;
            $scope.underline=canvas.getActiveObject().underline=='underline'?true:false;
            $scope.linethrough=canvas.getActiveObject().linethrough=='linethrough'?true:false;
            $scope.abc.item=canvas.getActiveObject().get("fontFamily");
            console.log(canvas.getActiveObject().get('fill'));
            $scope.$evalAsync();
            } else {
            if (canvas.getActiveObject().get('id') != "img"&&canvas.getActiveObject().get('type') !== "group" ) {
            $scope.showitext = false;
            if (window.angular.isString(canvas.getActiveObject().get('fill'))) {
              $scope.data.fill = true;
              $scope.data.colorfill = canvas.getActiveObject().get('fill');

            } else {
              $scope.data.fill = false;

            }
            
             
              $scope.data.valueo = canvas.getActiveObject().get('opacity');
              $scope.isdashed = canvas.getActiveObject().strokeDashArray;
              $scope.data.value = canvas.getActiveObject().strokeWidth;
            
              $scope.data.colorbrush = canvas.getActiveObject().get('stroke');
              canvas.getActiveObject().set('padding', 20);
              canvas.getActiveObject().set('cornerSize', 20);
              canvas.getActiveObject().set('borderColor', '#E8E8E8');
              canvas.getActiveObject().set('cornerColor', '#44444487');
              canvas.getActiveObject().set('transparentCorners', true);
              canvas.getActiveObject().set('cornerStyle', 'circle'); //or rect
            }
            else if(canvas.getActiveObject().get('type') === "group"){
            if(canvas.getActiveObject().get("type") == "group"){
        for(let i in canvas.getActiveObject()._objects){
             $scope.data.colorbrush=canvas.getActiveObject()._objects[i].get("stroke");
               $scope.data.valueo = canvas.getActiveObject()._objects[i].get("opacity");
                 $scope.data.value = canvas.getActiveObject()._objects[i].strokeWidth;
                $scope.isdashed = canvas.getActiveObject()._objects[i].strokeDashArray;
        }
        }
            }
            
            $scope.$evalAsync();
          }
        } else {
          changeObjectSelection(true);
        }
      

    }

    $scope.selectobject = function(index, istext) {
       $scope.move(0);
      if (canvas.item(index).get('id') != 'background') {
        canvas.setActiveObject(canvas.getObjects()[index]);
        canvas.item(index).bringToFront();
        resetobjects();

        if (istext == 'text') {
          $scope.showitext = true;
        } else if(istext!='group') {
          $scope.showitext = false;
          $scope.data.colorbrush = canvas.item(index).stroke;
        }
        
        removeEvents();
        changeObjectSelection(false);
        $scope.mode(false,0);
      }
      $scope.filloption();
    }
    //END : CONSOLE OBJECT
    $scope.size = function() {
      return ($scope.data.value > 5) ? $scope.data.value : 5;
    }

    /* Hexto RBG 
   function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+$scope.data.valueo+')';
    }
    throw new Error('Bad Hex');
}
}

     Hexto RBG */
    /// BEGIN: DRAWING LINE
    var drawingLine = function() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.selection = false;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = $scope.data.colorbrush;

      console.log(canvas.freeDrawingBrush);
    
      canvas.on('mouse:down', function(o) {
        canvas.freeDrawingBrush.color = $scope.data.colorbrush;
      });
      canvas.on('mouse:move', function(o) {
        canvas.freeDrawingBrush.color = $scope.data.colorbrush;
      });
    }
    /// END: DRAWING LINE\
    ////// BEGIN: DRAW ARROWSSSSSSSSSS
    var drawArrows = function() {
      removeEvents();
      changeObjectSelection(false);

    let selectedShape;
    let pointer, startX, startY, origX, origY;
    let rect, ellipse, line, triangle, arrow;

    let stroke = 'black';
    let fill = 'transparent';
    let isDown;

      canvas.on('mouse:down', (option) => {
        isDown = true;
                 grouparrows = new fabric.Group([],{
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
        });
                  if(option.e.isTrusted){
          canvas.add(grouparrows);
        }
     

              pointer = canvas.getPointer(option.e);                         
              let arrowLinePoints = [pointer.x, pointer.y, pointer.x, pointer.y];

              startX = pointer.x;
              startY = pointer.y;

              line = new fabric.Line(arrowLinePoints, {
                id:'linearrows',
                fill: fill,
                stroke: stroke,
                selectable:false,
                 originX: 'center',
                originY: 'center',
                  strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,
  strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,   
              });

              // reference points for arrowhead
              origX = line.x2;
              origY = line.y2;

              let dx = line.x2 - line.x1,
                  dy = line.y2 - line.y1;

              /* calculate angle of arrow */
              let angle = Math.atan2(dy, dx);
              angle *= 180 / Math.PI;
              angle += 90;

              arrow = new fabric.Triangle({
                id:'linearrows',
                angle: angle,
                fill: 'black',
                top: line.y2,
                left: line.x2,
                width: 15,
                height: 15,
                originX: 'center',
                originY: 'center',
                stroke: stroke,
                selectable:false,
                  strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,

          opacity: $scope.data.valueo,   
              });
              let angle1 = Math.atan2(dy, dx);
              angle1 *= 360 / Math.PI;
              angle1 += 360;


              arrow1 = new fabric.Triangle({
                id:'linearrows',
                angle: angle1,
                fill: 'black',
                top: line.y2,
                left:line.x2,
                width: 15,
                height: 15,
                originX: 'center',
                originY: 'center',
                stroke: stroke,
                selectable:false,
                  strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,

          opacity: $scope.data.valueo,   
              });

         
          if(option.e.isTrusted){
        canvas.add(line);
        canvas.add(arrow);
         canvas.add(arrow1);
      }
        canvas.renderAll();


      });
      canvas.on('mouse:move', (option) => {
        if (!isDown) return;
   
                pointer = canvas.getPointer(option.e);     

                line.set({
                  x2: pointer.x, 
                  y2: pointer.y,
                });

                let dx = line.x2 - line.x1,
                    dy = line.y2 - line.y1;

                let angle = Math.atan2(dy, dx);
                angle *= 180 / Math.PI;
                angle += 90;
                 let angle1 = Math.atan2(dy, dx);
              angle1 *= 180 / Math.PI;
              angle1 += 270;

                arrow.set({top: line.y2, left: line.x2, angle: angle
                         });
               arrow1.set({top: line.y1, left: line.x1, angle: angle1});

                canvas.renderAll();

              
      });
      canvas.on('mouse:up', () => {
        isDown = false;
          canvas.remove(line)
          canvas.remove(arrow)
          canvas.remove(arrow1)
          grouparrows.addWithUpdate(line);
           grouparrows.addWithUpdate(arrow);
            grouparrows.addWithUpdate(arrow1);
        grouparrows.set('selectable',false);
        canvas.renderAll();
      });
    }
    ////// END: DRAW AROWSSSSSSSSSSSSSSS



    /////BEGIN: DRAW LINE ARROW
    var drawLinearrow = function() {

      removeEvents();
      changeObjectSelection(false);

    let selectedShape;
    let pointer, startX, startY, origX, origY;
    let rect, ellipse, line, triangle, arrow;

    let stroke = 'black';
    let fill = 'transparent';
    let isDown;

      canvas.on('mouse:down', (option) => {
        isDown = true;
                 grouparrows = new fabric.Group([],{
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
        });
                  if(option.e.isTrusted){
          canvas.add(grouparrows);
        }
     

              pointer = canvas.getPointer(option.e);                         
              let arrowLinePoints = [pointer.x, pointer.y, pointer.x, pointer.y];

              startX = pointer.x;
              startY = pointer.y;

              line = new fabric.Line(arrowLinePoints, {
                id:'linearrows',
                fill: fill,
                stroke: stroke,
                selectable:false,
                 originX: 'center',
                originY: 'center',
                  strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,
  strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,   
              });

              // reference points for arrowhead
              origX = line.x2;
              origY = line.y2;

              let dx = line.x2 - line.x1,
                  dy = line.y2 - line.y1;

              /* calculate angle of arrow */
              let angle = Math.atan2(dy, dx);
              angle *= 180 / Math.PI;
              angle += 90;

              arrow = new fabric.Triangle({
                id:'linearrows',
                angle: angle,
                fill: 'black',
                top: line.y2,
                left: line.x2,
                width: 15,
                height: 15,
                originX: 'center',
                originY: 'center',
                stroke: stroke,
                selectable:false,
                  strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,

          opacity: $scope.data.valueo,   
              });
            

          

         
          if(option.e.isTrusted){
        canvas.add(line);
        canvas.add(arrow);
      
      }
        canvas.renderAll();


      });
      canvas.on('mouse:move', (option) => {
        if (!isDown) return;
   
                pointer = canvas.getPointer(option.e);     

                line.set({
                  x2: pointer.x, 
                  y2: pointer.y,
                });

                let dx = line.x2 - line.x1,
                    dy = line.y2 - line.y1;

                let angle = Math.atan2(dy, dx);
                angle *= 180 / Math.PI;
                angle += 90;
               
                arrow.set({top: line.y2, left: line.x2, angle: angle
                         });
              

                canvas.renderAll();

              
      });
      canvas.on('mouse:up', () => {
        isDown = false;
          canvas.remove(line)
          canvas.remove(arrow)
          grouparrows.addWithUpdate(line);
           grouparrows.addWithUpdate(arrow);
           
        grouparrows.set('selectable',false);
        canvas.renderAll();
      });
    }
    ///// END: DRAW LINE ARROW
    //// BEGIN:DRAW STRAIGHT
    var drawStraight = function() {
      removeEvents();
      changeObjectSelection(false);
        var line, isDown;
    var arr = new Array();
    var startx = new Array();
    var endx = new Array();
    var starty = new Array();
    var endy = new Array();
    var temp = 0;

         
          
    fabric.Object.prototype.transparentCorners = false;         
          
    canvas.on('mouse:down', function(o){      
   
         isDown = true;
         var pointer = canvas.getPointer(o.e);

         var points = [$scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')];
         startx[temp] =$scope.standard(pointer.x, 'x');
         starty[temp] = $scope.standard(pointer.y, 'y');
         line = new fabric.Line(points, {
            strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,
          originX: 'left',
          originY: 'top',
          selectable: false,
          padding: 20,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,       
         });
          if(o.e.isTrusted){
         canvas.add(line);}
         
    });

    canvas.on('mouse:move', function(o){
           
            canvas.renderAll();
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      line.set({ x2: $scope.standard(pointer.x, 'x'), y2: $scope.standard(pointer.y, 'y') });
      
      endx[temp] =$scope.standard(pointer.x, 'x');
      endy[temp] = $scope.standard(pointer.y, 'y');   
            
      canvas.renderAll();
    }); 
    canvas.on('mouse:up', function(o){
       var pointer = canvas.getPointer(o.e);      
       isDown = false;      
        
    });
    


      /*
      canvas.on('mouse:down', function(o) {
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        var points = [$scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')];
        line = new fabric.Line(points, {
          strokeWidth: Math.abs($scope.data.value),
          fill: document.getElementById("myColor").value,
          stroke: document.getElementById("myColor").value,
          originX: 'left',
          originY: 'top',
          selectable: false,
          padding: 20,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,
        });
        canvas.add(line);
      });
      canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        line.set({
          x2: $scope.standard(pointer.x, 'x'),
          y2: $scope.standard(pointer.y, 'y'),
        });
        canvas.renderAll();
        line.setCoords();
      });
      canvas.on('mouse:up', function(o) {});*/
    }
    /// END: DRAW STRAIGHT
    //// BEGIN: DRAWING TEXT
    $scope.Addtext = function() {
      removeEvents();
      changeObjectSelection(false);
      $scope.data.draw = false;
      var itext = new fabric.Text('Text', {

        originX: 'left',
        originY: 'top',
        left: 100,
        top: 150,
        fill: $scope.data.colorbrush,
        strokeWidth: 1,
        fontSize: 30,
        fontFamily: 'Helvetica',
        padding: 20,
        cornerSize: 20,
        borderColor: '#E8E8E8',
        cornerColor: '#44444487',
        transparentCorners: true,
        cornerStyle: 'circle', //or rect
      });
      canvas.add(itext).setActiveObject(itext);
      $scope.showitext=true;
      $scope.data.text="";

      /*canvas.on('text:editing:entered', function(e) {

        $scope.showitext = true;
        $scope.data.text=canvas.getActiveObject().text;
        $scope.$evalAsync();
      });
       canvas.on('text:changed', function(e) {
        $scope.data.text=canvas.getActiveObject().text;
        $scope.$evalAsync();
      }); 
     
       
      canvas.on('text:editing:exited', function(e) {
        $scope.showitext = false;
        $scope.$evalAsync();
      });*/
      $scope.data.draw = false;
      $scope.mode();
    };
    ///// END: DRAWING TEXT
    /////BEGIN: OPTION ITEXT
    $scope.font = ["Helvetica", "Times New Roman"];
      $scope.abc={item : $scope.font[0]}
    $scope.update = function(item) {  

      canvas.getActiveObject().set("fontFamily", item);
      canvas.requestRenderAll();
    }
    $scope.dtEditText = function(action) {
      var a = action;
      var o = canvas.getActiveObject();
      var t;
      console.log(o);
      // If object selected, what type?
      if (o) {
        t = o.get('type');
      }
      if (o && t === 'text') {
        switch (a) {
          case 'bold':
            
            var isBold = dtGetStyle(o, 'fontWeight') === 'bold';
             $scope.bold=!isBold;
            dtSetStyle(o, 'fontWeight', isBold ? '' : 'bold');
            break;
          case 'italic':
            var isItalic = dtGetStyle(o, 'fontStyle') === 'italic';
             $scope.italic=!isItalic;
            dtSetStyle(o, 'fontStyle', isItalic ? '' : 'italic');
            break;
          case 'underline':
            var isUnderline = dtGetStyle(o, 'underline') === 'underline';
             $scope.underline=!isUnderline;
            dtSetStyle(o, 'underline', isUnderline ? '' : 'underline');
            break;
            case 'linethrough':
            var isUnderline = dtGetStyle(o, 'linethrough') === 'linethrough';
             $scope.linethrough=!isUnderline;
            dtSetStyle(o, 'linethrough', isUnderline ? '' : 'linethrough');
            break;

            canvas.renderAll();
        }
      }
    }
    // Get the style
    function dtGetStyle(object, styleName) {
      return object[styleName];
    }
    // Set the style
    function dtSetStyle(object, styleName, value) {
      object[styleName] = value;
      object.set({
        dirty: true
      });
      canvas.renderAll();
    }
    $scope.input = function() {
      canvas.renderAll();
    }
    /*   $scope.blurr=function(){
        if(canvas.getActiveObject()){
            canvas.getActiveObject().isEditing=true;
             canvas.renderAll();
           }


      }*/
    $scope.textedit = function(text) {
      canvas.getActiveObject().set("text", text);
      canvas.renderAll();
    }
    /////END: OPTION ITEXT
    ////// BEGIN: ADD THE RULER
    canvas.renderAll(); //reset
    $scope.data.zoom = 15; // default zoom
    $scope.zoomless = 15; // min zoom
    $scope.zoommax = 60; // max zoom
    $scope.data.ruler=true;  

    $scope.setzoom = function(intzoom) {$scope.ruler(intzoom)}

    $scope.ruler = function(intzoom) {
     
        /////// ALL CHANGE ZOOM WITH FUNCTION:"setzoom" 

        if ($scope.data.ruler) {
          var xobj = {};
         // var xtext = {};
          var yobj = {};
        //  var ytext = {};
          var ytext = {};
          var xs = [];
          var ys = [];
          $scope.standardx = [];
          $scope.standardy = [];
          var number=0;

          for (var i = parseInt(intzoom); i <= 1300; i += parseInt(intzoom)) {
            ///////////// stripe  AND RULER X
         
         
       /* var text = new fabric.Text(number.toString(), { ///rulerx
              fontFamily: 'Comic Sans',
              fontSize: 1 + $scope.data.zoom / 2,
              width: 1,
              height: 1000,
              left: i ,
              top: 0,
            });
            xtext = text;
            xs.push(xtext);
            var texty = new fabric.Text(number.toString(), { ///rulery
              fontFamily: 'Comic Sans',
              fontSize: 1 + $scope.data.zoom / 2,
              width: 1300,
              height: 1,
              left: 0,
              top: i-7,
            });
            ytext = texty;
            xs.push(ytext);
              number=number+1
              */
            x = new fabric.Rect({ //// caro line
              width: 0.5,
              height: 1300,
              left: i,
              top: 0 ,
              fill: 'rgba(0, 0, 0, 0.29)',
            });
            $scope.standardx.push(x.left)
            xobj = x;
            xs.push(xobj);
            y = new fabric.Rect({
              width: 1300,
              height: 0.5,
              left: 0,
              top: i,
              fill: 'rgba(0, 0, 0, 0.29)',
            });
            $scope.standardy.push(y.top)
            yobj = y;
            xs.push(yobj);
          }
          var alltogetherObj = new fabric.Group(xs);
          canvas.setOverlayImage(alltogetherObj);
          canvas.renderAll();
        } else {
          $scope.standardx = [];
          $scope.standardy = [];
          canvas.overlayImage = false;
          $scope.data.rangeruler=false;
          canvas.renderAll();
        }
      
    }
    ////// END: ADD THE RULER
    var objects = canvas.getObjects();
    ///BEGIN: UPLOAD object 
    var cop = $rootScope.$on("upload", function(event, opt) {
      $scope.loadJson(opt.a);
    });
    $scope.$on('$destroy', function() {
      cop();
    });
    ///END: UPLOAD object 
     






    $scope.ruler( $scope.data.zoom);
    //////BEGIN: DRAWING arrow
    var drawArrow = function() {
      removeEvents();
      changeObjectSelection(false);
        group = new fabric.Group([],{
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
        });
          canvas.add(group);
       
        var line, isDown;
    var arr = new Array();
    var startx = new Array();
    var endx = new Array();
    var starty = new Array();
    var endy = new Array();
    var temp = 0;
         var x2="",y2="";
         
          
     
     
    canvas.on('mouse:down', function(o){      

         isDown = true;
         var pointer = canvas.getPointer(o.e);
          x2=x2==""?$scope.standard(pointer.x, 'x'):x2;
          y2=y2==""?$scope.standard(pointer.y, 'y'):y2;
         var points = [x2, y2,$scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')];
         startx[temp] = $scope.standard(pointer.x, 'x');
         starty[temp] = $scope.standard(pointer.y, 'y');
         line = new fabric.Line(points, {
          id:'linezero',
          strokeWidth: Math.abs($scope.data.value),
          fill: $scope.data.colorbrush,
          stroke: $scope.data.colorbrush,
          originX: 'left',
          originY: 'top',
          selectable: false,
          padding: 20,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
        
         });
          if(o.e.isTrusted){
         canvas.add(line);}
         
    });

    canvas.on('mouse:move', function(o){
           
            canvas.renderAll();
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      line.set({ x2: $scope.standard(pointer.x, 'x'), y2: $scope.standard(pointer.y, 'y') });
        
      endx[temp] = $scope.standard(pointer.x, 'x');
      endy[temp] = $scope.standard(pointer.y, 'y');   
            
      canvas.renderAll();
    }); 
    canvas.on('mouse:up', function(o){
       var pointer = canvas.getPointer(o.e);   
      x2=line.get('x2');
      y2=line.get('y2');   
       line.set('strokeDashArray',$scope.isdashed);
         line.set('opacity', $scope.data.valueo);   
         for(let i in canvas.getObjects())
         {
          if(canvas.getObjects()[i].get('id')=='linezero'){
            canvas.remove(canvas.getObjects()[i])
          }

          
         
        } 
         
        group.addWithUpdate(line);
        group.set('selectable',false);
       isDown = false;      
        
    });
    

      /*
      var point1;
      var line = null;
      var lines = [];
      var aline={};
      var groupline=[]
      var x2,y2;    
      group = new fabric.Group();
          canvas.add(group);
      canvas.on('mouse:down', function(o) {
        var pointer =  canvas.getPointer(o.e);
      
        if (line) {
              
          line = new fabric.Line([line.get('x2'), line.get('y2'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')], {
            stroke: document.getElementById("myColor").value,

            strokeWidth: Math.abs($scope.data.value),
            selectable: false,
            hoverCursor: 'default',
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
            strokeDashArray: $scope.isdashed,
            opacity: $scope.data.valueo,
          });
        
           canvas.add(line);
            canvas.renderAll();
        } else {
           
          line = new fabric.Line([$scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')], {
            stroke: document.getElementById("myColor").value,
            lockMovementX: true,
            strokeWidth: Math.abs($scope.data.value),
            lockMovementY: true,
            selectable: false,
            hoverCursor: 'default',
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
            strokeDashArray: [5,5],
            opacity: $scope.data.valueo,

          });

          canvas.add(line);
          canvas.renderAll();
        
           

        }
      });
      canvas.on('mouse:move', function(o) {
        var pointer = canvas.getPointer(o.e);
        line.set({
          x2: $scope.standard(pointer.x, 'x'),
          y2: $scope.standard(pointer.y, 'y')
        });
       
        canvas.renderAll();
      });
      canvas.on('mouse:up', function(o) {
        canvas.remove(line);
        group.addWithUpdate(line);
        group.set('selectable',false);
        canvas.renderAll();
      
      

      });
      */
    };
    /////END: DRAWING arrow
    /////BEGIN FILL
    $scope.data.colorfill='#000';
    $scope.fill = function() {
      console.log(canvas.getActiveObject());
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fill", $scope.data.colorfill)
        canvas.renderAll();
        if(canvas.getActiveObject().get('type')!='text'){
            $scope.data.fill = true;
             $scope.$evalAsync()

        }
        
              }
    }
    //////END FILL
    ///////BEGIN: SET FILL
    $scope.sf = false;
    $scope.data.fill = false
    $scope.setfill = function(values) {
      var value = !values
      $scope.sf = value;
      if (canvas.getActiveObject()) {
        if (canvas.getActiveObject().id == 'square' || canvas.getActiveObject().id == 'circle') {
          if (value) {
            canvas.getActiveObject().set('fill', $scope.data.colorfill);
          } else if (!value) {
            canvas.getActiveObject().set('fill', false);
          }
          canvas.renderAll();
        }
      }
    }
    $scope.colorfill = function(value) {
      if (value) {
        return document.getElementById("myColorfill").value;
      } else {
        return false;
      }
    }
    ///////END:SET FILL
    //////BEGIN: FUNTION() GET STANDARD XY
    var moving=function(){
      canvas.on('object:moving', function(event) {
     

      for (let i in $scope.standardx) {
        if (event.target.left >= $scope.standardx[i] - $scope.data.zoom / 2 && event.target.left < $scope.standardx[i] + $scope.data.zoom / 2) {
          event.target.left = $scope.standardx[i];
          canvas.renderAll();
        }
      }
      for (let i in $scope.standardy) {
        if (event.target.top >= $scope.standardy[i] - $scope.data.zoom / 2 && event.target.top < $scope.standardy[i] + $scope.data.zoom / 2) {
          event.target.top = $scope.standardy[i];
          canvas.renderAll();
        }
      }
    });
    }
     var unmoving=function(){
      canvas.off('object:moving');
    }
    $scope.autosnap=function(issnap){
     $scope.data.autosnap=!issnap;
        if($scope.data.autosnap){

        
    moving();
    $scope.standard = function(value, xy) {
      if (xy == 'x') {
        for (let i in $scope.standardx) {
          if (value >= $scope.standardx[i] - $scope.data.zoom / 2 && value < $scope.standardx[i] + $scope.data.zoom / 2) {
            value = $scope.standardx[i];
          }
        }
        return value;
      }
      if (xy == 'y') {
        for (let i in $scope.standardy) {
          if (value >= $scope.standardy[i] - $scope.data.zoom / 2 && value < $scope.standardy[i] + $scope.data.zoom / 2) {
            value = $scope.standardy[i];
          }
        }
        return value;
      }
    }
        } else {

          unmoving();
          $scope.standard = function(value, xy) {
      if (xy == 'x') {
       
        return value;
      }
      if (xy == 'y') {
      
        return value;
      }
    }
        

    
    }
    }
    $scope.standard = function(value, xy) {
      if (xy == 'x') {
       
        return value;
      }
      if (xy == 'y') {
      
        return value;
      }
    }
   
  
    //////END: FUNTION() GET STANDARD XY
  
    //////BEGIN: DRAW SQUARE
    function drawSquare() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.selection = false;
      var square, isDown, origX, origY;
      
      canvas.on('mouse:down', function(o) {

        $scope.reset = true;
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = $scope.standard(pointer.x, 'x');
        origY = $scope.standard(pointer.y, 'y');
        square = new fabric.Rect({
          id: 'square',
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          padding: 20,
          strokeWidth: Math.abs($scope.data.value),
          fill: $scope.colorfill($scope.sf),
          stroke: $scope.data.colorbrush,
          selectable: false,
          hasRotatingPoint: false,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          opacity: $scope.data.valueo,
          strokeDashArray: $scope.isdashed,
          noScaleCache: false,
        });
        if(o.e.isTrusted){
        canvas.add(square);}

         console.log(canvas.getObjects());
      });
      canvas.on('mouse:move', function(o) { //// THIS IS ALREADY CHANGE PER MOVE
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        if (origX > pointer.x) {
          square.set({
            left: $scope.standard(pointer.x, 'x')
          });
        }
        if (origY > pointer.y) {
          square.set({
            top: $scope.standard(pointer.y, 'y')
          });
        }
        square.set({
          width: Math.abs(origX - $scope.standard(pointer.x, 'x'))
        });
        square.set({
          height: Math.abs(origY - $scope.standard(pointer.y, 'y'))
        });
        canvas.renderAll();
      });
      canvas.on('mouse:up', function(o) {
        isDown = false;

        square.setCoords();
           
        // WHEN CLICK OFF  'circle.setCoords()'  with set the location correct when the current RECT just make
      });
    }
    //////END: DRAW SQUARE
    //////BEGIN: DRAW SIRCLE
    function drawCircle() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.on('mouse:down', function(o) {
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = $scope.standard(pointer.x, 'x')
        origY = $scope.standard(pointer.y, 'y')
        ellipse = new fabric.Ellipse({
          id: 'circle',
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          padding: 20,
          rx: $scope.standard(pointer.x, 'x') - origX,
          ry: $scope.standard(pointer.y, 'y') - origY,
          angle: 0,
          stroke: $scope.data.colorbrush,
          strokeWidth: Math.abs($scope.data.value),
          fill: $scope.colorfill($scope.sf),
          selectable: false,
          hasRotatingPoint: false,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,
        });
         if(o.e.isTrusted){
        
        canvas.add(ellipse);
      }
      });
      canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        var rx = Math.abs(origX - $scope.standard(pointer.x, 'x')) / 2;
        var ry = Math.abs(origY - $scope.standard(pointer.y, 'y')) / 2;
        if (rx > ellipse.strokeWidth) {
          rx -= ellipse.strokeWidth / 2;
        }
        if (ry > ellipse.strokeWidth) {
          ry -= ellipse.strokeWidth / 2;
        }
        ellipse.set({
          rx: rx,
          ry: ry
        });
        if (origX > pointer.x) {
          ellipse.set({
            originX: 'right'
          });
        } else {
          ellipse.set({
            originX: 'left'
          });
        }
        if (origY > pointer.y) {
          ellipse.set({
            originY: 'bottom'
          });
        } else {
          ellipse.set({
            originY: 'top'
          });
        }
        canvas.renderAll();
      });
      canvas.on('mouse:up', function() {
        ellipse.setCoords();
        isDown = false;
      });
    }
    //////END: DRAW SIRCLE
    ////// BEGIN: BACKWARD
    var isRedoing = false;
    var h = [];
    $scope.Undo = function() {
      if (canvas._objects.length > 0) {
        h.push(canvas._objects.pop());
        canvas.renderAll();
      }
    };
    $scope.Redo = function() {
      if (h.length > 0) {
        // console.log(h);
        isRedoing = true;
        canvas.add(h.pop());
      }
    };
    ////END: BACKWARD
    /////BEGIN: DELETE BG
    $scope.deletebg = function() {
     console.log(canvas.backgroundImage);
     canvas.backgroundImage=false;
     canvas.renderAll();
           }
    /////END: DELETE BG
    var canvasScale = 1;
 
    $scope.Zoominfinger = function(xx) {
    SCALE_FACTOR=xx>=1?1.03:(1/1.03);
     canvasScale = canvasScale * SCALE_FACTOR;
    canvas.setDimensions({'width':canvas.getWidth() * SCALE_FACTOR,'height':canvas.getHeight() * SCALE_FACTOR})
     //canvas.setZoom(canvasScale);
      /* 
      canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
      canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
      */
      if(canvas.backgroundImage){
        canvas.backgroundImage.scaleX = canvas.backgroundImage.scaleX * SCALE_FACTOR;
        canvas.backgroundImage.scaleY =  canvas.backgroundImage.scaleY * SCALE_FACTOR;
        canvas.backgroundImage.left = canvas.backgroundImage.left* SCALE_FACTOR;
        canvas.backgroundImage.top =  canvas.backgroundImage.top* SCALE_FACTOR;
      }
        
           

      var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      
     canvas.calcOffset();
      canvas.renderAll();
      
    };
    //// BEGIN: ZOOM CANVAS
  
    var SCALE_FACTOR = 1.2;
    $scope.Zoomin = function() {
      canvasScale = canvasScale * SCALE_FACTOR;
      canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
      canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
      if(canvas.backgroundImage){
        canvas.backgroundImage.scaleX = canvas.backgroundImage.scaleX * SCALE_FACTOR;
        canvas.backgroundImage.scaleY =  canvas.backgroundImage.scaleY * SCALE_FACTOR;
        canvas.backgroundImage.left = canvas.backgroundImage.left* SCALE_FACTOR;
        canvas.backgroundImage.top =  canvas.backgroundImage.top* SCALE_FACTOR;
      }  
      if(canvas.overlayImage){
        canvas.overlayImage.scaleX = canvas.overlayImage.scaleX * SCALE_FACTOR;
        canvas.overlayImage.scaleY =  canvas.overlayImage.scaleY * SCALE_FACTOR;
        canvas.overlayImage.left = canvas.overlayImage.left* SCALE_FACTOR;
        canvas.overlayImage.top =  canvas.overlayImage.top* SCALE_FACTOR;
      }
        
           

      var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      canvas.renderAll();
    };
    $scope.Zoomout = function() {
      canvasScale = canvasScale / SCALE_FACTOR;
      canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
      canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
      var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
        var tempLeft = left * (1 / SCALE_FACTOR);
        var tempTop = top * (1 / SCALE_FACTOR);
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      canvas.renderAll();
    };
     $scope.ResetZoom = function() {
      canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
      canvas.setWidth(canvas.getWidth() * (1 / canvasScale));

      if(canvas.backgroundImage){
        canvas.backgroundImage.scaleX = canvas.backgroundImage.scaleX * (1 / canvasScale);
        canvas.backgroundImage.scaleY =  canvas.backgroundImage.scaleY * (1 / canvasScale);
        canvas.backgroundImage.left = canvas.backgroundImage.left* (1 / canvasScale);
        canvas.backgroundImage.top =  canvas.backgroundImage.top* (1 / canvasScale);
      }
           if(canvas.overlayImage){
        canvas.overlayImage.scaleX = canvas.overlayImage.scaleX * (1 / canvasScale);
        canvas.overlayImage.scaleY =  canvas.overlayImage.scaleY * (1 / canvasScale);
        canvas.overlayImage.left = canvas.overlayImage.left* (1 / canvasScale);
        canvas.overlayImage.top =  canvas.overlayImage.top* (1 / canvasScale);
      }
        var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * (1 / canvasScale);
        var tempScaleY = scaleY * (1 / canvasScale);
        var tempLeft = left * (1 / canvasScale);
        var tempTop = top * (1 / canvasScale);
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      canvas.renderAll();
      canvasScale = 1;
    }



 
    ///// END: ZOOM CANVAS
    /// SAVE IMAGE
    $scope.saveImg = function(value) {
      $ionicLoading.show();
    
      if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      } else {
        $timeout(function() {
   $scope.ResetZoom();
        
          canvas.renderAll();
          for (var i = 0; i < value; i++) {
            $scope.Zoomin();
          }
          console.log(canvas.toDataURL('image/jpeg'));
          document.addEventListener('deviceready', function() {
            FILESYSTEM_PROTOCOL = 'cdvfile'; 
          // $cordovaFile.writeFile();
          console.log(FILESYSTEM_PROTOCOL);
            var params = {
              data: canvas.toDataURL('jpg'),
              prefix: 'myPrefix_',
              format: 'JPG',
              quality: 100,
              mediaScanner: true
            };
            window.imageSaver.saveBase64Image(params, function(filePath) {
              console.log('File saved on ' + filePath);
              alert("Save Image Success!");
            }, function(msg) {
              console.error(msg);
            });
            $scope.ResetZoom();
          });
          $scope.ResetZoom();
          $ionicLoading.hide()
        }, 100);
      }
    }
    /// SAVE IMAGE
    ////SAVE JSON AS TEXT
    $scope.saveJson = function() {
      saveText(JSON.stringify(canvas.toJSON()), "test.txt");
    }

    function saveText(text, filename) {
      var a = document.createElement('a');
      a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
      a.setAttribute('download', filename);
      a.click()
      document.addEventListener('deviceready', function() {
        $cordovaFile.writeFile(cordova.file.externalRootDirectory, "file.txt", text, true).then(function(success) {
         // alert('success');
        }, function(error) {
          alert('error');
          // error
        });
      });
    }
    ////SAVE JSON AS TEXT
    ///LOAD JSON
    $scope.loadJson = function(obj) {
        
      canvas.loadFromDatalessJSON(obj, function() {

        for(let i in canvas.getObjects()){
          canvas.getObjects()[i].set('cornerSize', 20);
           canvas.getObjects()[i].set('borderColor', '#E8E8E8');
            canvas.getObjects()[i].set('cornerColor', '#44444487');
             canvas.getObjects()[i].set('transparentCorners', true);
              canvas.getObjects()[i].set('cornerStyle', 'circle');
               canvas.getObjects()[i].set('cornerSize', 20);
               canvas.getObjects()[i].set('padding', 20); 
                console.log( canvas.getObjects()[i] )

        

        }
            
      });
      removeEvents();
      canvas.renderAll();
      a();
    };
    ///LOAD JSON
    ///DELETE 
    $scope.clear = function() {
     
      h.push(canvas.getActiveObject());
      canvas.remove(canvas.getActiveObject());
       resetobjects();
      canvas.renderAll();
    }
    $scope.delete = function() {
      canvas.clear();
      $scope.data.rulersize=false;
      $scope.data.ruler = false;
      $scope.data.showshape=false;
      $scope.data.showstraight=false;
      canvas.backgroundColor = "white"
      canvas.renderAll();
    }
    ///DELETE 
    var c = function(value) {
      return console.log(value);
    }
  }).controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  }).controller('PlaylistCtrl', function($scope, $stateParams) {})
  /////////////BEGIN: UPLOAD OBJECT
  .factory('readFile', function($window, $rootScope, $q) {
    'use strict';
    var readFile = function(file) {
      var deferred = $q.defer(),
        reader = new $window.FileReader();
      reader.onload = function(ev) {
        var content = ev.target.result;
        deferred.resolve(content);
      };
      reader.readAsText(file);
      return deferred.promise;
    };
    return readFile;
  }).directive('fileHandler', function(readFile) {
    'use strict';
    return {
      link: function(scope, element) {
        element.on('change', function(event) {
          var file = event.target.files[0];
          readFile(file).then(function(content) {
            // console.log(content);
          });
        });
      }
    };
  }).directive('fileBrowser', function(readFile, $rootScope) {
    'use strict';
    return {
      template: '<input  type="file" accept="json/*" style="display: none;" />' + '<ng-transclude></ng-transclude>',
      transclude: true,
      link: function(scope, element) {
        var fileInput = element.children('input[file]');
        fileInput.on('change', function(event) {
          var file = event.target.files[0];
          readFile(file).then(function(content) {
            $rootScope.$broadcast("upload", {
              a: content
            });
          });
          element.children('input[file]').val(null);
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  })
  ///////////// END: UPLOAD OBJECT
  /////////////UPLOAD IMAGE BG
  .factory('readFilebg', function($window, $rootScope, $q) {
    'use strict';
    var readFilebg = function(file) {
      var deferred = $q.defer(),
        reader = new $window.FileReader();
      reader.onload = function(ev) {
        var content = ev.target.result;
        deferred.resolve(content);
      };
      reader.readAsDataURL(file);
      return deferred.promise;
    };
    return readFilebg;
  }).directive('fileHandlerbg', function(readFilebg) {
    'use strict';
    return {
      link: function(scope, element) {
        element.on('change', function(event) {
          var file = event.target.files[0];
          readFilebg(file).then(function(content) {
            // console.log(content);
          });
        });
      }
    };
  }).directive('fileBrowserbg', function(readFilebg, $rootScope) {
    'use strict';
    return {
      template: '<input  type="file" accept="image/*" style="display: none;" />' + '<ng-transclude></ng-transclude>',
      transclude: true,
      link: function(scope, element) {
        var fileInput = element.children('input[file]');
        fileInput.on('change', function(event) {
          var file = event.target.files[0];
          console.log(file);
          readFilebg(file).then(function(content) {
            $rootScope.$broadcast("uploadbg", {
              a: content
            });
          });
          element.children('input[file]').val(null);
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  })
  /////////////UPLOAD IMAGE BG
  /////////////UPLOAD IMAGE BG
  .directive('image', function(readFilebg, $rootScope) {
    'use strict';
    return {
      template: '<input  type="file" accept="image/*" style="display: none;" />' + '<ng-transclude></ng-transclude>',
      transclude: true,
      link: function(scope, element) {
        var fileInput = element.children('input[file]');
        fileInput.on('change', function(event) {
          var file = event.target.files[0];
          console.log(file);
          readFilebg(file).then(function(content) {
            $rootScope.$broadcast("images", {
              a: content
            });
          });
          element.children('input[file]').val(null);
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  })
/////////////UPLOAD IMAGE BG
.factory('focus', function ($timeout, $window) {
                return function (id) {
                    // timeout makes sure that is invoked after any other event has been triggered.
                    // e.g. click events that need to run before the focus or
                    // inputs elements that are in a disabled state but are enabled when those events
                    // are triggered.
                    $timeout(function () {
                        var element = $window.document.getElementById(id);
                        if (element)
                            element.focus();
                    });
                };
            })

.directive('eventFocus', function (focus) {
                        return function (scope, elem, attr) {
                            elem.on(attr.eventFocus, function () {
                                focus(attr.eventFocusId);

                            });

                            // Removes bound events in the element itself
                            // when the scope is destroyed
                            scope.$on('$destroy', function () {
                                element.off(attr.eventFocus);
                            });
                        };
                    })