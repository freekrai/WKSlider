/*
 * 
 * Find more about this plugin by visiting
 * http://miniapps.co.uk/
 *
 * Copyright (c) 2010 Alex Gibson, http://miniapps.co.uk/
 * Released under MIT license 
 * http://miniapps.co.uk/license/
 * 
 */
 
(function() {

	//Modernizr feature detection for CSS 3d transforms
	window.Modernizr=function(k,e,h){var d={},i=e.documentElement,q=e.head||e.getElementsByTagName("head")[0],g=e.createElement("modernizr"),o=g.style;e.createElement("input");var r=" -webkit- -moz- -o- -ms- -khtml- ".split(" ");"Webkit Moz O ms Khtml".split(" ");g={};k=[];var j;(function(){var b={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return function(a,c){c=c||e.createElement(b[a]||"div");a="on"+a;var l=a in c;if(!l){c.setAttribute||(c=e.createElement("div"));
if(c.setAttribute&&c.removeAttribute){c.setAttribute(a,"");l=typeof c[a]==="function";typeof c[a]===h||(c[a]=h);c.removeAttribute(a)}}return l}})();var m={}.hasOwnProperty,p;p=typeof m!==h&&typeof m.call!==h?function(b,a){return m.call(b,a)}:function(b,a){return a in b&&typeof b.constructor.prototype[a]===h};g.csstransforms3d=function(){var b;a:{var a=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],c;for(c in a)if(o[a[c]]!==h){b=true;break a}}if((b=!!b)&&
"webkitPerspective"in i.style){c="@media ("+r.join("transform-3d),(")+"modernizr)";b=e.createElement("style");a=e.createElement("div");b.textContent=c+"{#modernizr{height:3px}}";q.appendChild(b);a.id="modernizr";i.appendChild(a);c=a.offsetHeight===3;b.parentNode.removeChild(b);a.parentNode.removeChild(a);b=!!c}return b};for(var n in g)if(p(g,n)){j=n.toLowerCase();d[j]=g[n]();k.push((d[j]?"":"no-")+j)}d.crosswindowmessaging=d.postmessage;d.historymanagement=d.history;d.addTest=function(b,a){b=b.toLowerCase();
if(!d[b]){a=!!a();i.className+=" "+(a?"":"no-")+b;d[b]=a;return d}};o.cssText="";g=f=null;d._enableHTML5=true;d._version="1.6";i.className=i.className.replace(/\bno-js\b/,"")+" js";i.className+=" "+k.join(" ");return d}(this,this.document);

	function WKSlider(id) {

		this.element = document.getElementById(id);
		
		if (Modernizr.csstransforms3d) {
			this.supports3d = true;
		}
		else {
			this.supports3d = false;
		}

		//get knob width	
		this.knob = this.element.getElementsByClassName('knob')[0];
		this.knobWidth = this.knob.offsetWidth;
	
		//get track width
		this.track = this.element.getElementsByClassName('track')[0];
		this.trackWidth = this.track.offsetWidth;
	
		this.element.addEventListener('touchstart', this, false);
		this.element.addEventListener('mousedown', this, false);
	}

	WKSlider.prototype.touchstart = function(e) {

		e.preventDefault();

		this.moveKnobTo(e.targetTouches[0].pageX);
	
		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
		this.element.addEventListener('touchcancel', this, false);
	};

	WKSlider.prototype.touchmove = function(e) {

		e.preventDefault();
	
		this.moveKnobTo(e.targetTouches[0].pageX);
	};

	WKSlider.prototype.touchend = function(e) {

		e.preventDefault();

		this.moveKnobTo(e.changedTouches[0].pageX);
	
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);
		this.element.removeEventListener('touchcancel', this, false);
	};

	WKSlider.prototype.touchcancel = function(e) {

		e.preventDefault();

		this.moveKnobTo(e.changedTouches[0].pageX);
	
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);
		this.element.removeEventListener('touchcancel', this, false);
	};

	WKSlider.prototype.mousedown = function(e) {

		e.preventDefault();

		this.moveKnobTo(e.pageX);
	
		this.element.addEventListener('mousemove', this, false);
		this.element.addEventListener('mouseup', this, false);
	};

	WKSlider.prototype.mousemove = function(e) {

		e.preventDefault();
	
		this.moveKnobTo(e.pageX);
	};

	WKSlider.prototype.mouseup = function(e) {

		e.preventDefault();

		this.moveKnobTo(e.pageX);
	
		this.element.removeEventListener('mousemove', this, false);
		this.element.removeEventListener('mouseup', this, false);
	};

	//moves the slider
	WKSlider.prototype.moveKnobTo = function(x) {

		x = Math.min(x, this.trackWidth);
		x = Math.max(x - this.knobWidth, 0);
	
		//use css 3d transforms for hardware acceleration if available 
		if (this.supports3d) {
			this.knob.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
		}
		else {
			this.knob.style.webkitTransform = 'translate(' + x + 'px, 0)';
		}
	
		//return value change as a percentage
		var percentage = Math.round(x  / (this.trackWidth - this.knobWidth) * 100);
		this.callback(percentage);
	};

	//callback method will be implemented by user
	WKSlider.prototype.callback = function() {

	};

	//event handler
	WKSlider.prototype.handleEvent = function(e) {

		if (typeof(this[e.type]) === 'function' ) {
			return this[e.type](e);
		}
	};

	//public function
	window.WKSlider = WKSlider;
	
})();