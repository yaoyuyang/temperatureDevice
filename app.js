/*jshint browser:true devel:true*/
/*global AbstractApp */

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Sub Class /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function MyApp(divobj,uuid,dash){
  this.myuuid = uuid;
  if (!divobj) {
    throw "First argument must be a valid html object";
  }
  this.div = divobj;
  this.dash = dash;
}
MyApp.prototype = Object.create(AbstractApp.prototype);

//overwrite start and update
MyApp.prototype.start = function() {
  //
  //Starts app and loads gui.
  //
  var this_app = this;

  //set some attributes for the app div
  this.div.style.backgroundColor = "#BBFFBB";
  
  this.getUIhtml(function(e,h){
    this_app.div.innerHTML = h;
    this_app.getAllElements();
    this_app.start_button.addEventListener('click',function(){
      this_app.sendEvent('forward',{cmd: 'startLog',uuid: this_app.myuuid},
                         function(err,resp){
      });
    });
    this_app.stop_button.addEventListener('click',function(){
      this_app.sendEvent('forward',{cmd: 'stopLog',uuid: this_app.myuuid},
                         function(err,resp){
      });
    });
    this_app.dash.loadScript("http://www.flotcharts.org/flot/jquery.flot.js",
                       function(){
      this_app.update();
    });
  });
};
// This app has nothing to do on update
MyApp.prototype.update = function(){
  var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
  jQuery.plot("#id"+this.myuuid+"data", [  d2 ]);
};

////////////////////////////////// Some "Private" Methods //////////////////////
MyApp.prototype.getAllElements = function(){
  this.data_div = this.getElement("data");
  this.stop_button = this.getElement("stop");
  this.start_button = this.getElement("start");
};

//spec says app needs to be named App
var App = MyApp;
