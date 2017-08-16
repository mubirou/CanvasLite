// toile.js (ver.0.1 build 132)
// © 2017 Takashi Nishimura
if(toile!=window){var toile={}}toile.AbstractCanvas=class AbstractCanvas{addChild(_superDisplay){throw new Error("must be implemented in the subclass");}deleteChild(_superDisplay){throw new Error("must be implemented in the subclass");}drawScreen(_color){throw new Error("must be implemented in the subclass");}};toile.Canvas=class Canvas extends toile.AbstractCanvas{static get ENTER_FRAME(){return"enterframe"}static get KEY_DOWN(){return"keydown"}static get KEY_UP(){return"keyup"}static get MOUSE_DOWN(){return"mousedown"}static get MOUSE_MOVE(){return"mousemove"}static get MOUSE_UP(){return"mouseup"}constructor(_id_or_width,_height=undefined){super();this.__canvasScale=1;this.__cursor="default";this.__enabledMouseMove=false;this.__mouseDownEventThrough=true;this.__mouseUpEventThrough=true;this.__millisecPerFrame=Math.round(1000/30);this.__mouseX=this.__mouseY=0;this.__canvas=undefined;this.__container=undefined;this.__context2D=undefined;this.__enterframeHandler=undefined;this.__height=undefined;this.__mouseDownHandler=undefined;this.__mouseUpHandler=undefined;this.__mousemoveHandler=undefined;this.__container_observerArray=undefined;this.__screenColor=undefined;this.__timerID=undefined;this.__width=undefined;if(typeof _id_or_width=="string"){this.__canvas=document.getElementById(_id_or_width);this.__width=this.__canvas.width;this.__height=this.__canvas.height}else if(typeof _id_or_width=="number"){this.__canvas=document.createElement("canvas");this.__canvas.width=this.__width=_id_or_width;this.__canvas.height=this.__height=_height;document.body.appendChild(this.__canvas)}this.__mousedown_canvas=(_e)=>{this.__mousedown_canvas_method(_e)};this.__mouseup_canvas=(_e)=>{this.__mouseup_canvas_method(_e)};this.__mousemove_canvas=(_e)=>{this.__mousemove_canvas_method(_e)};this.__keydown_document=(_e)=>{this.__keydown_document_method(_e)};this.__keyup_document=(_e)=>{this.__keyup_document_method(_e)};this.__resize_window=(_e)=>{this.__resize_window_method(_e)};this.__context2D=this.__canvas.getContext("2d");this.__timerID=setInterval(this.__loop,this.__millisecPerFrame,this);if(!("ontouchstart"in window)||(navigator.platform.indexOf("Win")!=-1)){this.__canvas.addEventListener("mousedown",this.__mousedown_canvas,false);this.__canvas.addEventListener("mouseup",this.__mouseup_canvas,false)}else{this.__canvas.addEventListener("touchstart",this.__mousedown_canvas,false);this.__canvas.addEventListener("touchend",this.__mouseup_canvas,false)}this.__container=new toile.Container();this.__container.__name="root"}addChild(_superDisplay){if(_superDisplay instanceof toile.SpriteSheet){var _spriteSheet=_superDisplay;if(_spriteSheet.fps==undefined){_spriteSheet.fps=this.fps}else{_spriteSheet.fps=_spriteSheet.fps}}this.__container.addChild(_superDisplay)}addEventListener(_event,_function){switch(_event){case"enterframe":this.__enterframeHandler=_function;break;case"keydown":document.addEventListener("keydown",this.__keydown_document);this.__keydownHandler=_function;break;case"keyup":document.addEventListener("keyup",this.__keyup_document);this.__keyupHandler=_function;break;case"mousedown":this.__mouseDownHandler=_function;break;case"mousemove":this.__mousemoveHandler=_function;break;case"mouseup":this.__mouseUpHandler=_function;break;default:throw new Error("Canvas.addEventListener()");}}deleteChild(_superDisplay){this.__container.deleteChild(_superDisplay)}drawScreen(_color="#ffffff"){this.__screenColor=_color;this.__context2D.fillStyle=this.__screenColor;this.__context2D.fillRect(0,0,this.__canvas.width,this.__canvas.height);this.__container_observerArray=this.__container.getObserverArray();for(let i in this.__container_observerArray){this.__context2D.save();this.__context2D.setTransform(1,0,0,1,0,0);var _observer=this.__container_observerArray[i];this.__context2D.translate(_observer.x+_observer.regX,_observer.y+_observer.regY);this.__context2D.rotate(_observer.rotateRadian);var _theData=_observer.update();if(_theData==undefined){return}if(_theData.type!="Container"){this.__commonObserverAction(_observer,_theData)}else{var _containerAlpha=_observer.alpha;this.__commonContainerAction(_observer,_containerAlpha)}this.__context2D.restore()}this.__context2D.restore()}enabledContextMenu(_bool){this.__canvas.oncontextmenu=function(){return _bool}}enabledMouseMove(_bool){this.__enabledMouseMove=_bool;if(this.__enabledMouseMove){if(this.__mousemoveHandler==undefined){throw new Error('Please define "mousemove" eventlistener');}if(!("ontouchstart"in window)||(navigator.platform.indexOf("Win")!=-1)){this.__canvas.addEventListener("mousemove",this.__mousemove_canvas,false)}else{this.__canvas.addEventListener("touchmove",this.__mousemove_canvas,false)}}else{this.__canvas.removeEventListener("mousemove",this.__mousemove_canvas,false);this.__canvas.removeEventListener("touchmove",this.__mousemove_canvas,false)}}exitFullscreen(){if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()}else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else if(document.msExitFullscreen){document.msExitFullscreen()}else if(document.cancelFullScreen){document.cancelFullScreen()}else if(document.exitFullscreen){document.exitFullscreen()}}getDepthElement(_depth){return this.__container.getDepthElement(_depth)}getDepthIndex(_superDisplay){return this.__container.getDepthIndex(_superDisplay)}getDepthMax(){return this.__container.getDepthMax()}isFitWindow(_boolean){if(_boolean){window.addEventListener("resize",this.__resize_window);this.__canvas.style.display="block";this.__canvas.style.position="absolute";this.__canvas.style.top="0px";this.__canvas.style.left="0px";var _scaleX=window.innerWidth/this.__width;var _scaleY=window.innerHeight/this.__height;this.__canvasScale=Math.min(_scaleX,_scaleY);var _scaleX=window.innerWidth/this.__width;var _scaleY=window.innerHeight/this.__height;if(_scaleX<_scaleY){this.__canvas.style.width="100%";this.__canvas.style.height=""}else{this.__canvas.style.width="";this.__canvas.style.height="100%"}}else{window.removeEventListener("resize",this.__resize_window);this.__canvasScale=1;var _scaleX=window.innerWidth/this.__width;var _scaleY=window.innerHeight/this.__height;if(_scaleX<_scaleY){this.__canvas.style.width=this.width+"px"}else{this.__canvas.style.height=this.height+"px"}}}isBorder(_boolean){if(_boolean){this.__canvas.style.border="solid 1px #000000"}else{this.__canvas.style.border="none"}}removeEventListener(_event){switch(_event){case"enterframe":this.__enterframeHandler=undefined;break;case"keydown":document.removeEventListener("keydown",this.__keydown_document);this.__keydownHandler=undefined;break;case"keyup":document.removeEventListener("keyup",this.__keyup_document);this.__keyupHandler=undefined;break;case"mousedown":this.__mouseDownHandler=undefined;break;case"mouseup":this.__mouseUpHandler=undefined;break;case"mousemove":this.__mousemoveHandler=undefined;break;default:throw new Error("Canvas.removeEventListener()");}}reload(){this.__context2D.fillRect(-this.__canvas.width/2,-this.__canvas.height/2,this.__canvas.width,this.__canvas.height)}requestFullscreen(){var _target=this.__canvas;if(_target.webkitRequestFullscreen){_target.webkitRequestFullscreen()}else if(_target.mozRequestFullScreen){_target.mozRequestFullScreen()}else if(_target.msRequestFullscreen){_target.msRequestFullscreen()}else if(_target.requestFullscreen){_target.requestFullscreen()}else{alert("NOT SUPPORT FULLSCREEN MODE");return}}setDepthIndex(_superDisplay,_depth){this.__container.setDepthIndex(_superDisplay,_depth)}stopMouseDownEvent(){this.__mouseDownEventThrough=false}stopMouseUpEvent(){this.__mouseUpEventThrough=false}__commonContainerAction(_observer,_containerAlpha){for(let i in _observer.getObserverArray()){this.__context2D.save();var _childObserver=_observer.getObserverArray()[i];var _theChildData=_childObserver.update();this.__context2D.translate(_childObserver.x+_childObserver.regX-_observer.regX,_childObserver.y+_childObserver.regY-_observer.regY);if(_theChildData.type!="Container"){this.__context2D.rotate(_childObserver.rotateRadian);this.__commonObserverAction(_childObserver,_theChildData,_containerAlpha);this.__context2D.restore()}else{this.__context2D.rotate(_childObserver.rotateRadian);_containerAlpha=_childObserver.alpha*_containerAlpha;this.__commonContainerAction(_childObserver,_containerAlpha);this.__context2D.restore()}}}__commonObserverAction(_observer,_theData,_containerAlpha=1){this.__context2D.globalAlpha=_observer.alpha*_containerAlpha;switch(_theData.type){case"Bitmap":this.__context2D.drawImage(_theData.image,0,0,_theData.width,_theData.height,-_theData.regX,-_theData.regY,_theData.width*_theData.scaleX,_theData.height*_theData.scaleY);break;case"SpriteSheet":this.__context2D.drawImage(_theData.image,_theData.frameX,_theData.frameY,_theData.width,_theData.height,-_theData.regX,-_theData.regY,_theData.width*_theData.scaleX,_theData.height*_theData.scaleY);break;case"Text":this.__context2D.font=_theData.size+"px "+_theData.font;this.__context2D.textBaseline=_theData.baseline;this.__context2D.textAlign=_theData.align;this.__context2D.fillStyle=_theData.fillStyle;this.__context2D.fillText(_theData.fillText,-_theData.regX,-_theData.regY);break;case"Video":this.__context2D.drawImage(_theData.video,0,0,_theData.originWidth,_theData.originHeight,-_theData.regX,-_theData.regY,_theData.width,_theData.height);break;case"Line":this.__context2D.strokeStyle="rgba("+_theData.lineColor+","+_theData.lineAlpha+")";this.__context2D.lineWidth=_theData.lineWidth;this.__context2D.beginPath();this.__context2D.moveTo(-_theData.regX,-_theData.regY);this.__context2D.lineTo(-_theData.regX+_theData.endX-_theData.startX,-_theData.regY+_theData.endY-_theData.startY);this.__context2D.stroke();break;case"Rect":if(_theData.isFill){this.__context2D.fillStyle="rgba("+_theData.fillColor+","+_theData.fillAlpha+")";this.__context2D.fillRect(-_theData.regX,-_theData.regY,_theData.endX-_theData.startX,_theData.endY-_theData.startY)}this.__context2D.strokeStyle="rgba("+_theData.lineColor+","+_theData.lineAlpha+")";this.__context2D.lineWidth=_theData.lineWidth;this.__context2D.strokeRect(-_theData.regX,-_theData.regY,_theData.endX-_theData.startX,_theData.endY-_theData.startY);break;case"Circle":this.__context2D.beginPath();this.__context2D.strokeStyle="rgba("+_theData.lineColor+","+_theData.lineAlpha+")";this.__context2D.lineWidth=_theData.lineWidth;this.__context2D.arc(_theData.x,_theData.y,_theData.radius,(Math.PI/180)*0,(Math.PI/180)*360,false);if(_theData.isFill){this.__context2D.fillStyle="rgba("+_theData.fillColor+","+_theData.fillAlpha+")";this.__context2D.fill()}this.__context2D.stroke();break;default:"ERROR: Canvas.__commonObserverAction()"}}__loop(_canvas){_canvas.__enterframeHandler(_canvas)}__keydown_document_method(_e){this.__keydownHandler(this,_e)}__keyup_document_method(_e){this.__keyupHandler(this,_e)}__mousedown_canvas_method(_e){this.__mouseX=_e.layerX/this.__canvasScale;this.__mouseY=_e.layerY/this.__canvasScale;var _tempArray=this.__container_observerArray.concat();_tempArray.reverse();for(var i in _tempArray){var _theObserver=_tempArray[i];if(_theObserver.mouseHitTest!=undefined){_theObserver.mouseHitTest(_e.layerX/this.__canvasScale,_e.layerY/this.__canvasScale,this.__context2D,this.__screenColor,"mousedown")}if(!this.__mouseDownEventThrough){this.__mouseDownEventThrough=true;break}}if(this.__mouseDownEventThrough){if(this.__mouseDownHandler!=undefined){this.__mouseDownHandler(this,_e)}}}__mouseup_canvas_method(_e){this.__mouseX=_e.layerX/this.__canvasScale;this.__mouseY=_e.layerY/this.__canvasScale;var _tempArray=this.__container_observerArray.concat();_tempArray.reverse();for(var i in _tempArray){var _theObserver=_tempArray[i];if(_theObserver.mouseHitTest!=undefined){_theObserver.mouseHitTest(_e.layerX/this.__canvasScale,_e.layerY/this.__canvasScale,this.__context2D,this.__screenColor,"mouseup")}if(!this.__mouseUpEventThrough){this.__mouseUpEventThrough=true;break}}if(this.__mouseUpEventThrough){if(this.__mouseUpHandler!=undefined){this.__mouseUpHandler(this,_e)}}}__mousemove_canvas_method(_mouseEvent){this.__mouseX=_mouseEvent.layerX/this.__canvasScale;this.__mouseY=_mouseEvent.layerY/this.__canvasScale;this.__mousemoveHandler(this,_mouseEvent)}__resize_window_method(_event){this.isFitWindow(true)}get borderColor(){return this.__canvas.style.borderColor}set borderColor(_newValue){this.__canvas.style.borderColor=_newValue}get borderWidth(){return this.__canvas.style.borderWidth}set borderWidth(_newValue){this.__canvas.style.borderWidth=_newValue+"px"}get correctFPS(){return 1000/this.__millisecPerFrame}set correctFPS(_newValue){throw new Error("correctFPS can't be changed");}get cursor(){return this.__cursor}set cursor(_newValue){if((_newValue.lastIndexOf(".png")!=-1)||(_newValue.lastIndexOf(".jpg")!=-1)){this.__canvas.style.cursor="url('"+_newValue+"'),text"}else if(_newValue=="default"){this.__canvas.style.cursor="default"}}get fps(){return Math.round(1000/this.__millisecPerFrame)}set fps(_fps){clearInterval(this.__timerID);this.__millisecPerFrame=Math.round(1000/_fps);this.__timerID=setInterval(this.__loop,this.__millisecPerFrame,this)}get height(){return this.__height}set height(_newValue){throw new Error("height can't be changed");}get width(){return this.__width}set width(_newValue){throw new Error("width can't be changed");}get mouseX(){return this.__mouseX}set mouseX(_newValue){throw new Error("mouseX can't be changed");}get mouseY(){return this.__mouseY}set mouseY(_newValue){throw new Error("mouseY can't be changed");}};toile.SuperDisplay=class SuperDisplay{constructor(){this.__alpha=1;this.__parent=null;this.__regX=0;this.__regY=0;this.__rotateRadian=0;this.__x=0;this.__y=0;this.__name=undefined}hitTest(_target){if(!(this instanceof toile.Circle)){var _this_Top=this.__y;var _this_Bottom=_this_Top+this.__height;var _this_Left=this.__x;var _this_Right=_this_Left+this.__width}else{_this_Top=this.__centerY-this.__radius;_this_Bottom=this.__centerY+this.__radius;_this_Left=this.__centerX-this.__radius;_this_Right=this.__centerX+this.__radius}if(!(_target instanceof toile.Circle)){var _target_Top=_target.y;var _target_Bottom=_target_Top+_target.height;var _target_Left=_target.x;var _target_Right=_target_Left+_target.width}else{var _target_Top=_target.__centerY-_target.__radius;_target_Bottom=_target.__centerY+_target.__radius;_target_Left=_target.__centerX-_target.__radius;_target_Right=_target.__centerX+_target.__radius}if((_this_Top<=_target_Bottom)&&(_this_Bottom>=_target_Top)){if((_this_Right>=_target_Left)&&(_this_Left<=_target_Right)){return true}}return false}hitTestCircle(_target){if(!(this instanceof toile.Circle)){var _thisRadius=this.width*this.scaleX/2;var _thisX=this.__x+_thisRadius;var _thisY=this.__y+_thisRadius}else{_thisRadius=this.__radius;_thisX=this.__centerX;_thisY=this.__centerY}if(!(_target instanceof toile.Circle)){var _targetRadius=_target.width/2;var _targetX=_target.x+_targetRadius;var _targetY=_target.y+_targetRadius}else{_targetRadius=_target.radius;_targetX=_target.centerX;_targetY=_target.centerY}var _disX=_thisX-_targetX;var _disY=_thisY-_targetY;var _dis=Math.sqrt(_disX*_disX+_disY*_disY);if(_dis<(_thisRadius+_targetRadius)){return true}return false}setParent(_container){this.__parent=_container}get alpha(){return this.__alpha}set alpha(_newValue){if(_newValue<0)_newValue=0;if(_newValue>1)_newValue=1;this.__alpha=_newValue}get globalX(){if(this.__parent.name=="root")return this.__x;var _this=this;var _displayArray=[this];while(_this.parent.name!="root"){_this=_this.parent;_displayArray.push(_this)}_displayArray.reverse();var _display0=_displayArray[0];var _totalKakudo=0;var _theGlobalX=0;for(let i in _displayArray){let _theDisplay1=_displayArray[i];if(Number(i)+1>=_displayArray.length){return _theGlobalX+_display0.x}let _theDisplay2=_displayArray[Number(i)+1];_theGlobalX+=this.__getGlobalX(_theDisplay2,_totalKakudo)-_theDisplay1.x;_totalKakudo+=_theDisplay1.rotate}}set globalX(_newValue){throw new Error("globalX can't be changed");}get globalY(){if(this.__parent.name=="root")return this.__y;var _this=this;var _displayArray=[this];while(_this.parent.name!="root"){_this=_this.parent;_displayArray.push(_this)}_displayArray.reverse();var _display0=_displayArray[0];var _totalKakudo=0;var _theGlobalY=0;for(let i in _displayArray){let _theDisplay1=_displayArray[i];if(Number(i)+1>=_displayArray.length){return _theGlobalY+_display0.y}let _theDisplay2=_displayArray[Number(i)+1];_theGlobalY+=this.__getGlobalY(_theDisplay2,_totalKakudo)-_theDisplay1.y;_totalKakudo+=_theDisplay1.rotate}}set globalY(_newValue){throw new Error("globalY can't be changed");}get name(){return this.__name}set name(_newValue){this.__name=_newValue}get parent(){return this.__parent}set parent(_newValue){throw new Error("parent can't be changed");}get regX(){return this.__regX}set regX(_newValue){this.__regX=_newValue}get regY(){return this.__regY}set regY(_newValue){this.__regY=_newValue}get rotate(){return 180*this.rotateRadian/Math.PI}set rotate(_newValue){this.rotateRadian=_newValue*Math.PI/180}get rotateRadian(){return this.__rotateRadian}set rotateRadian(_newValue){this.__rotateRadian=_newValue}get x(){return this.__x}set x(_newValue){this.__x=_newValue}get y(){return this.__y}set y(_newValue){this.__y=_newValue}__getGlobalX(_this,_totalKakudo=0){var _disX=_this.parent.regX-_this.x-_this.__regX;var _disY=_this.parent.regY-_this.y-_this.__regY;var _dis=Math.sqrt(_disX*_disX+_disY*_disY);var _kakudo=180*Math.atan2(_disY,_disX)/Math.PI;_kakudo=_kakudo+_this.parent.rotate+_totalKakudo;var _tmpX=_dis*Math.cos(Math.PI*_kakudo/180);return _this.parent.x+_this.parent.regX-_tmpX-_this.__regX}__getGlobalY(_this,_totalKakudo=0){var _disX=_this.parent.regX-_this.x-_this.__regX;var _disY=_this.parent.regY-_this.y-_this.__regY;var _dis=Math.sqrt(_disX*_disX+_disY*_disY);var _kakudo=180*Math.atan2(_disY,_disX)/Math.PI;_kakudo=_kakudo+_this.parent.rotate+_totalKakudo;var _tmpY=_dis*Math.sin(Math.PI*_kakudo/180);return _this.parent.y+_this.parent.regY-_tmpY-_this.__regY}};toile.Container=class Container extends toile.SuperDisplay{constructor(){super();this.__observerArray=[]}addChild(_superDisplay){if(_superDisplay==undefined){throw new Error("Container.addChild()");}this.__observerArray.push(_superDisplay);_superDisplay.setParent(this)}deleteChild(_superDisplay){var _theNum=this.__observerArray.indexOf(_superDisplay,0);if(_theNum!=-1)this.__observerArray.splice(_theNum,1)}getDepthElement(_depth){return this.__observerArray[_depth]}getDepthIndex(_superDisplay){return this.__observerArray.indexOf(_superDisplay,0)}getDepthMax(){return this.__observerArray.length-1}hitTest(_target){throw new Error("hitTest() can't be used");}hitTestCircle(_target){throw new Error("hitTestCircle() can't be used");}setDepthIndex(_superDisplay,_depth){var _targetNum=this.getDepthIndex(_superDisplay);if(_targetNum==_depth){return}else{this.__observerArray.splice(_targetNum,1);var _deleteArray=this.__observerArray.splice(_depth);this.__observerArray.push(_superDisplay);this.__observerArray=this.__observerArray.concat(_deleteArray)}}getObserverArray(){return this.__observerArray}update(){return this.__getData()}hitTest(_target){throw new Error("Container.hitTest() can't be used");}hitTestCircle(_target){throw new Error("Container.hitTestCircle() can't be used");}__getData(){return{type:"Container"}}get name(){return this.__name}set name(_newValue){if(_newValue=="root")throw new Error('"root" can not be used');this.__name=_newValue}get scaleX(){throw new Error("Container.scaleX(): can't be used");}set scaleX(_scaleX){throw new Error("Container.scaleX(): not changed");}get scaleY(){throw new Error("Container.scaleY(): can't be used");}set scaleY(_scaleY){throw new Error("Container.scaleY(): not changed");}};toile.Bitmap=class Bitmap extends toile.SuperDisplay{static get LOAD(){return"load"}static get MOUSE_DOWN(){return"mousedown"}static get MOUSE_UP(){return"mouseup"}static get MOUSE_UP_OUTSIDE(){return"mouseupoutside"}constructor(_path){super();this.__isMouseDown=false;this.__isHitOutsideArea=false;this.__isChoice=false;this.__scale=1;this.__scaleX=1;this.__scaleY=1;this.__height=undefined;this.__mouseHitTestIsCircle=undefined;this.__image=undefined;this.__loadHandler=undefined;this.__mouseDownHandler=undefined;this.__mouseUpHandler=undefined;this.__originWidth=undefined;this.__originHeight=undefined;this.__width=undefined;this.__load_image=(_e)=>{this.__load_image_method(_e)};this.__image=new Image();this.__image.src=_path;this.__image.addEventListener("load",this.__load_image,false)}addEventListener(_event,_function,_isCircle=false){switch(_event){case"mousedown":this.__mouseDownHandler=_function;break;case"mouseup":this.__mouseUpHandler=_function;break;case"mouseupoutside":this.__mouseUpOutsideHandler=_function;break;case"load":this.__loadHandler=_function;break;default:throw new Error("Bitmap.addEventListener()");}this.__mouseHitTestIsCircle=_isCircle}removeEventListener(_event){switch(_event){case"mousedown":this.__mouseDownHandler=undefined;break;case"mouseup":this.__mouseUpHandler=undefined;break;case"mouseupoutside":this.__mouseUpOutsideHandler=undefined;break;case"load":this.__loadHandler=undefined;break;default:throw new Error("Bitmap.removeEventListener()");}}getData(){var _obj={};_obj.type="Bitmap";_obj.width=this.__originWidth;_obj.height=this.__originHeight;_obj.image=this.__image;_obj.regX=this.regX;_obj.regY=this.regY;_obj.x=this.x;_obj.y=this.y;_obj.scaleX=this.scaleX;_obj.scaleY=this.scaleY;return _obj}mouseHitTest(_mouseX,_mouseY,_context2D,_color,_event){var _obj=this.getData();var _left=_obj.x;var _top=_obj.y;var _right=_left+_obj.width*this.scaleX;var _bottom=_top+_obj.height*this.scaleY;if((_mouseX<_right)&&(_left<_mouseX)&&(_top<_mouseY)&&(_mouseY<_bottom)){if(!this.__mouseHitTestIsCircle){var _imageData=_context2D.getImageData(_mouseX,_mouseY,1,1);var _r=_imageData.data[0];var _g=_imageData.data[1];var _b=_imageData.data[2];var _a=_imageData.data[3];var _rColor=parseInt(_color.substr(1,2),16);var _gColor=parseInt(_color.substr(3,2),16);var _bColor=parseInt(_color.substr(5,2),16);var _theColor=[_rColor,_gColor,_bColor,255];if((_r!=_theColor[0])||(_g!=_theColor[1])||(_b!=_theColor[2])||(_a!=_theColor[3])){this.__commonHit(_event)}else{if(this.__mouseUpOutsideHandler!=undefined){this.__mouseUpOutsideHandler(this)}}}else{var _radius=_obj.width*this.scaleX/2;var _centerX=this.x+_radius;var _centerY=this.y+_radius;var _disX=_mouseX-_centerX;var _disY=_mouseY-_centerY;if(Math.sqrt((_disX*_disX)+(_disY*_disY))<=_radius){this.__commonHit(_event)}else{if(this.__isChoice){if(this.__mouseUpOutsideHandler!=undefined){this.__mouseUpOutsideHandler(this)}}this.__commonHitOutsideArea()}}}else{if(_event=="mousedown"){this.__commonHitOutsideArea()}else if(_event=="mouseup"){if(this.__isMouseDown){if(this.__isHitOutsideArea){if(this.__mouseUpHandler!=undefined){this.__mouseUpHandler(this)}this.__isMouseDown=false}}else{if(this.__mouseUpOutsideHandler!=undefined){if(this.__isChoice){this.__mouseUpOutsideHandler(this);this.__isChoice=false}}}}}}update(){return this.getData()}__commonHit(_event){switch(_event){case"mousedown":if(this.__mouseDownHandler!=undefined){this.__mouseDownHandler(this)}this.__isChoice=true;this.__isMouseDown=false;break;case"mouseup":if(this.__isChoice){if(this.__mouseUpHandler!=undefined){this.__isChoice=false;this.__mouseUpHandler(this)}}break}}__commonHitOutsideArea(){if(!this.__isMouseDown){this.__isHitOutsideArea=true;this.__isChoice=false}else{this.__isMouseDown=false}}isMouseDownHandler(){return(this.__mouseDownHandler!=undefined)}isMouseUpHandler(){return(this.__mouseUpHandler!=undefined)}__load_image_method(_e){this.__originWidth=this.__width=_e.currentTarget.width;this.__originHeight=this.__height=_e.currentTarget.height;if(this.__loadHandler!=undefined){this.__loadHandler(this)}}get height(){return this.__height}set height(_newValue){this.__height=_newValue;this.__scale=null;this.__scaleY=_newValue/this.__originHeight}get image(){return this.__image}get scale(){return this.__scale}set scale(_newValue){this.__width=this.__originWidth*_newValue;this.__height=this.__originHeight*_newValue;this.__scale=_newValue;this.__scaleX=_newValue;this.__scaleY=_newValue}get scaleX(){return this.__scaleX}set scaleX(_newValue){this.__width=this.__originWidth*_newValue;this.__scaleX=_newValue;this.__scale=null}get scaleY(){return this.__scaleY}set scaleY(_newValue){this.__height=this.__originHeight*_newValue;this.__scaleY=_newValue;this.__scale=null}get width(){return this.__width}set width(_newValue){this.__width=_newValue;this.__scale=null;this.__scaleX=_newValue/this.__originWidth}};toile.Circle=class Circle extends toile.SuperDisplay{constructor(_x=0,_y=0,_radius=100){super();this.__x=_x;this.__y=_y;this.__radius=_radius;this.__centerX=_x+_radius;this.__centerY=_y+_radius;this.__lineAlpha=1;this.__lineColor="0,0,0";this.__lineWidth=1;this.__fillAlpha=1;this.__fillColor="255,255,255";this.__isFill=false;this.__scale=1}isFill(_boolean){this.__isFill=_boolean}update(){var _obj={};_obj.type="Circle";_obj.x=this.__x+this.__radius;_obj.y=this.__y+this.__radius;_obj.lineAlpha=this.__lineAlpha;_obj.lineColor=this.__lineColor;_obj.lineWidth=this.__lineWidth;_obj.fillAlpha=this.__fillAlpha;_obj.fillColor=this.__fillColor;_obj.isFill=this.__isFill;_obj.radius=this.__radius;return _obj}get centerX(){return this.__centerX}set centerX(_newValue){this.__centerX=_newValue;this.__x=this.__centerX-this.__radius}get centerY(){return this.__centerY}set centerY(_newValue){this.__centerY=_newValue;this.__y=this.__centerY-this.__radius}get fillAlpha(){return this.__fillAlpha}set fillAlpha(_newValue){this.__fillAlpha=_newValue;if(this.__fillAlpha<0){this.__fillAlpha=0}else if(this.__fillAlpha>1){this.__fillAlpha=1}}get fillColor(){return this.__fillColor}set fillColor(_newValue){this.__fillColor=_newValue}get lineAlpha(){return this.__lineAlpha}set lineAlpha(_newValue){this.__lineAlpha=_newValue;if(this.__lineAlpha<0){this.__lineAlpha=0}else if(this.__lineAlpha>1){this.__lineAlpha=1}}get lineColor(){return this.__lineColor}set lineColor(_newValue){this.__lineColor=_newValue}get lineWidth(){return this.__lineWidth}set lineWidth(_newValue){if(_newValue<1)_newValue=1;this.__lineWidth=_newValue}get radius(){return this.__radius}set radius(_newValue){this.__radius=_newValue;this.__scale=1}set regX(_newValue){throw new Error("Circle.regX can't be used");}set regY(_newValue){throw new Error("Circle.regX can't be used");}set rotate(_newValue){throw new Error("rotate can't be changed");}set rotateRadian(_newValue){throw new Error("rotateRadian can't be changed");}get scale(){return this.__scale}set scale(_newValue){this.__radius=this.__radius*(_newValue/this.__scale);this.__lineWidth=this.__lineWidth*(_newValue/this.__scale);this.__scale=_newValue}get scaleX(){throw new Error("Circle.scaleX can't be used");}set scaleX(_newValue){throw new Error("Circle.scaleX can't be used");}get scaleY(){throw new Error("Circle.scaleY can't be used")}set scaleY(_newValue){throw new Error("Circle.scaleY can't be used");}get x(){return this.__x}set x(_newValue){this.__x=_newValue;this.__centerX=this.__x+this.radius}get y(){return this.__y}set y(_newValue){this.__y=_newValue;this.__centerY=this.__y+this.radius}};toile.Line=class Line extends toile.SuperDisplay{constructor(_startX=0,_startY=0,_endX=100,_endY=100){super();this.__startX=_startX;this.__startY=_startY;this.__x=_startX;this.__y=_startY;this.__endX=_endX;this.__endY=_endY;this.__width=_endX-_startX;this.__height=_endY-_startY;this.__lineAlpha=1;this.__lineColor="0,0,0";this.__lineWidth=1;this.__scale=1}hitTestCircle(_target){throw new Error("Line.hitTestCircle() can't be used");}update(){var _obj={};_obj.type="Line";_obj.startX=this.__x;_obj.startY=this.__y;_obj.endX=this.__endX;_obj.endY=this.__endY;_obj.lineWidth=this.__lineWidth;_obj.lineColor=this.__lineColor;_obj.lineAlpha=this.__lineAlpha;_obj.regX=this.__regX;_obj.regY=this.__regY;return _obj}get endX(){return this.__endX}set endX(_newValue){this.__endX=_newValue;this.__width=this.__endX-this.__startX;this.__scale=null}get endY(){return this.__endY}set endY(_newValue){this.__endY=_newValue;this.__height=this.__endY-this.__startY;this.__scale=null}get height(){return this.__height}set height(_newValue){this.__endY=this.__startY+_newValue;this.__height=_newValue;this.__scaleY=_newValue/this.__originHeight;this.__scale=null}get lineAlpha(){return this.__lineAlpha}set lineAlpha(_newValue){this.__lineAlpha=_newValue;if(this.__lineAlpha<0){this.__lineAlpha=0}else if(this.__lineAlpha>1){this.__lineAlpha=1}}get lineColor(){return this.__lineColor}set lineColor(_newValue){this.__lineColor=_newValue}get lineWidth(){return this.__lineWidth}set lineWidth(_newValue){this.__lineWidth=_newValue}get scale(){return this.__scale}set scale(_newValue){this.__endX=(this.__endX-this.__startX)*(_newValue/this.__scale)+this.__x;this.__endY=(this.__endY-this.__startY)*(_newValue/this.__scale)+this.__y;this.__width=this.__endX-this.__startX;this.__height=this.__endY-this.__startY;this.__lineWidth=this.__lineWidth*(_newValue/this.__scale);this.__scale=_newValue}get scaleX(){throw new Error("Line.scaleX() can't be used");}set scaleX(_newValue){throw new Error("Line.scaleX() can't be used");}get scaleY(){throw new Error("Line.scaleY() can't be used");}set scaleY(_newValue){throw new Error("Line.scaleY() can't be used");}get startX(){return this.__startX}set startX(_newValue){this.__x=_newValue;this.__startX=_newValue;this.__width=this.__endX-this.__startX;this.__scale=null}get startY(){return this.__startY}set startY(_newValue){this.__y=_newValue;this.__startY=_newValue;this.__height=this.__endY-this.__startY;this.__scale=null}get width(){return this.__width}set width(_newValue){this.__endX=this.__startX+_newValue;this.__width=_newValue;this.__scaleX=_newValue/this.__originWidth;this.__scale=null}get x(){return this.__x}set x(_newValue){this.__x=_newValue;this.__startX=_newValue;this.__endX=this.__startX+this.__width}get y(){return this.__y}set y(_newValue){this.__y=_newValue;this.__startY=_newValue;this.__endY=this.__startY+this.__height}};toile.Rect=class Rect extends toile.Line{constructor(_startX=0,_startY=0,_endX=100,_endY=100){super();this.__startX=_startX;this.__startY=_startY;this.__x=_startX;this.__y=_startY;this.__endX=_endX;this.__endY=_endY;this.__width=_endX-_startX;this.__height=_endY-_startY;this.__fillAlpha=1;this.__fillColor="255,255,255";this.__isFill=false}isFill(_boolean){this.__isFill=_boolean}get fillAlpha(){return this.__fillAlpha}set fillAlpha(_newValue){this.__fillAlpha=_newValue;if(this.__fillAlpha<0){this.__fillAlpha=0}else if(this.__fillAlpha>1){this.__fillAlpha=1}}get fillColor(){return this.__fillColor}set fillColor(_newValue){this.__fillColor=_newValue}update(){var _obj={};_obj.type="Rect";_obj.startX=this.__x;_obj.startY=this.__y;_obj.endX=this.__endX;_obj.endY=this.__endY;_obj.lineWidth=this.__lineWidth;_obj.lineColor=this.__lineColor;_obj.lineAlpha=this.__lineAlpha;_obj.isFill=this.__isFill;_obj.fillColor=this.__fillColor;_obj.fillAlpha=this.__fillAlpha;_obj.regX=this.__regX;_obj.regY=this.__regY;return _obj}};toile.SpriteSheet=class SpriteSheet extends toile.Bitmap{constructor(_path){super(_path);this.__currentframe=1;this.__isReadystatechange=false;this.__isReloadPermitted=true;this.__state="play";this.__isLoaded=false;this.__count=undefined;this.__framesArray=undefined;this.__imageURL=undefined;this.__jsonURL=undefined;this.__isPlay=undefined;this.__millisecPerFrame=undefined;this.__request=undefined;this.__timerID=undefined;this.__totalframes=undefined;if(_path.lastIndexOf(".png")!=-1){this.__imageURL=_path;this.__jsonURL=_path.substr(0,_path.lastIndexOf(".png"))+".json"}else if(_path.lastIndexOf(".jpg")!=-1){this.__imageURL=_path;this.__jsonURL=_path.substr(0,_path.lastIndexOf(".jpg"))+".json"}else{throw new Error("Only .png or .jpg is being supported");}this.__load_image=(_e)=>{this.__load_image_method(_e)};this.__image=new Image();this.__image.src=this.__imageURL;this.__image.addEventListener("load",this.__load_image,false)}gotoAndPlay(_frame){if((_frame<=0)||(this.__totalframes<_frame)){throw new Error("SpriteSheet.gotoAndPlay()");}this.__currentframe=_frame;if(_frame!=0){this.__count=_frame-1}else{this.__count=0}this.play()}gotoAndStop(_frame){if((_frame<=0)||(this.__totalframes<_frame)){throw new Error("SpriteSheetM.gotoAndPlay()");}this.__currentframe=_frame;if(_frame!=0){this.__count=_frame-1}else{this.__count=0}this.stop()}isPlay(){if(this.__state=="play"){return true}else if(this.__state=="stop"){return false}}play(){this.__state="play"}stop(){this.__state="stop"}update(){if(this.__isReloadPermitted){if(this.__state=="play"){this.__count=(++this.__count)%this.__totalframes;if(this.__count!=0){this.__currentframe=this.__count}else{this.__currentframe=this.__totalframes}}this.__isReloadPermitted=false}return this.getData()}getData(){if(this.__isReadystatechange){if(this.__framesArray==undefined){return}var _theFrameObj=this.__framesArray[this.__count];var _obj={};_obj.type="SpriteSheet";_obj.frameX=_theFrameObj.frame.x;_obj.frameY=_theFrameObj.frame.y;_obj.width=this.__originWidth=this.__width=_theFrameObj.frame.w;_obj.height=this.__originHeight=this.__height=_theFrameObj.frame.h;_obj.image=this.__image;_obj.regX=this.regX;_obj.regY=this.regY;_obj.x=this.x;_obj.y=this.y;_obj.scaleX=this.scaleX;_obj.scaleY=this.scaleY;return _obj}}__load_image_method(_e){this.__request=new XMLHttpRequest();this.__readystatechange_request=()=>{this.__readystatechange_request_method()};this.__request.addEventListener("readystatechange",this.__readystatechange_request,false);this.__request.open("GET",this.__jsonURL);this.__request.send(null)}__loop(_spriteSheet){_spriteSheet.__isReloadPermitted=true}__readystatechange_request_method(){this.__isReadystatechange=true;if(this.__request.readyState==4){if(this.__request.status==200){if(!this.__isLoaded){var _json=JSON.parse(this.__request.responseText);this.__framesArray=_json.frames;this.__totalframes=this.__framesArray.length;this.__count=0;if(this.__loadHandler!=undefined){this.getData();this.__loadHandler(this)}this.__isLoaded=true}}}}get currentframe(){return this.__currentframe}set currentframe(_newValue){throw new Error("currentframe can't be changed");}get fps(){return Math.round(1000/this.__millisecPerFrame)}set fps(_fps){clearInterval(this.__timerID);this.__millisecPerFrame=Math.round(1000/_fps);this.__timerID=setInterval(this.__loop,this.__millisecPerFrame,this)}get totalframes(){return this.__totalframes}set totalframes(_newValue){throw new Error("totalframes can't be changed");}};toile.Text=class Text extends toile.SuperDisplay{constructor(_text){super();this.__text=_text;this.__align="left";this.__baseline="top";this.__color="0,0,0";this.__font="san-serif";this.__scale=1;this.__size=10}addWebFont(_fontName,_url,_type=""){var _style=document.createElement("style");_style.appendChild(document.createTextNode('@font-face {font-family: "'+_fontName+'"; src: url("'+_url+'"); format("'+_type+'");}'));//@font-face規則を記述する
document.head.appendChild(_style)}hitTest(_target){throw new Error("Text.hitTest() can't be used");}hitTestCircle(_target){throw new Error("Text.hitTestCircle() can't be used");}update(){var _obj={};_obj.type="Text";_obj.size=this.__size;_obj.font=this.__font;_obj.fillStyle="rgba("+this.__color+",1)";_obj.fillText=this.__text;_obj.baseline=this.__baseline;_obj.align=this.__align;_obj.regX=this.regX;_obj.regY=this.regY;_obj.scale=this.scale;return _obj}get align(){return this.__align}set align(_newValue){this.__align=_newValue}get baseline(){return this.__baseline}set baseline(_newValue){this.__baseline=_newValue}get color(){return this.__color}set color(_newValue){var _rColor=parseInt(_newValue.substr(1,2),16);var _gColor=parseInt(_newValue.substr(3,2),16);var _bColor=parseInt(_newValue.substr(5,2),16);this.__color=_rColor+","+_gColor+","+_bColor}get font(){return this.__font}set font(_newValue){this.__font=_newValue}get scale(){return this.__scale}set scale(_newValue){this.__size=this.__size*(_newValue/this.__scale);this.__scale=_newValue}get scaleX(){throw new Error("Text.scaleX() can't be used");}set scaleX(_newValue){throw new Error("Text.scaleX() can't be used");}get scaleY(){throw new Error("Text.scaleY() can't be used");}set scaleY(_newValue){throw new Error("Text.scaleY() can't be used");}get size(){return this.__size}set size(_newValue){this.__size=_newValue;this.__scale=1}get text(){return this.__text}set text(_newValue){this.__text=_newValue}};toile.Video=class Video extends toile.SuperDisplay{constructor(_path,_originWidth,_originHeight){super();this.__url=_path;this.__originWidth=this.__width=_originWidth;this.__originHeight=this.__height=_originHeight;this.__scale=this.__width/this.__originWidth;this.__isLoaded=false;this.__video=undefined;this.__video=document.createElement("video");this.__video.src=this.__url;this.__video.loop=false;this.__video.autoplay=true}hitTestCircle(_target){throw new Error("Video.hitTestCircle() can't be used");}isLoaded(){return this.__video.duration>0}isLoop(_bool){this.__video.loop=_bool}pause(){this.__video.pause()}play(){this.__video.play()}stop(){this.__video.pause();this.__video.currentTime=0}update(){var _obj={};_obj.type="Video";_obj.width=this.__width;_obj.height=this.__height;_obj.originWidth=this.__originWidth;_obj.originHeight=this.__originHeight;_obj.video=this.__video;_obj.regX=this.regX;_obj.regY=this.regY;_obj.scale=this.scale;return _obj}get currentTime(){return this.__video.currentTime}set currentTime(_sec){this.__video.currentTime=_sec}get duration(){return this.__video.duration}set duration(_newValue){throw new Error("duration can't be changed");}get height(){return this.__height}set height(_newValue){this.__height=_newValue;this.__scale=null}get scale(){return this.__scale}set scale(_newValue){this.__width=this.__originWidth*_newValue;this.__height=this.__originHeight*_newValue;this.__scale=_newValue}get scaleX(){throw new Error("Video.scaleX() can't be used");}set scaleX(_newValue){throw new Error("Video.scaleX() can't be used");}get scaleY(){throw new Error("Video.scaleY() can't be used");}set scaleY(_newValue){throw new Error("Video.scaleY() can't be used");}get width(){return this.__width}set width(_newValue){this.__width=_newValue;this.__scale=null}};toile.Sound=class Sound{constructor(_path){this.__isLoaded=false;this.__audio=undefined;this.__endedHandler=undefined;this.__fadeoutTime=undefined;this.__name=undefined;this.__timerID=undefined;this.__volume=undefined;this.__audio=undefined;this.__audio=new Audio(_path);this.__audio.loop=false;this.__audio.autoplay=false}fadeOut(_sec=1){clearInterval(this.__timerID);this.__fadeoutTime=_sec;this.__timerID=setInterval(this.__faceOutLoop,50,this)}isLoaded(){return this.__audio.duration>0}pause(){this.__audio.pause()}play(){this.__audio.play()}removeEventListener(_event){switch(_event){case"ended":this.__endedHandler=undefined;break;default:throw new Error("Sound.removeEventListener()");}}stop(){this.__audio.pause();this.__audio.currentTime=0;this.__audio.volume=1}__faceOutLoop(_this){var _nextVolume=_this.__audio.volume-0.05/_this.__fadeoutTime;if(_nextVolume>0){_this.__audio.volume=_nextVolume}else{_this.stop();clearInterval(_this.__timerID)}}get currentTime(){return this.__audio.currentTime}set currentTime(_newValue){this.__audio.currentTime=_newValue}get duration(){return this.__audio.duration}get loop(){return this.__audio.loop}set loop(_isLoop){this.__audio.loop=_isLoop}get name(){return this.__name}set name(_newValue){this.__name=_newValue}get volume(){return this.__audio.volume}set volume(_newValue){if(_newValue<0)_newValue=0;if(_newValue>1)_newValue=1;this.__audio.volume=_newValue}};