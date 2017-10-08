(function(){
	function controller(view,model){
		var _t = this;
		this.view = view;
		this.model = model;
		this.tempA = [];
		this.current_tab = "showAll";
		this.view.bind('txtbox', function(txt){
				_t.callAddtxthandller(txt);
		});
		this.view.bind('checked', function(param){
				_t.callCheckHandller(param);
		});
		this.view.bind('unchecked', function(param){
				_t.callUnCheckHandller();
		});
		this.view.bind('showAll', function(param){
				_t.callshowAllhandller();
		});
	}


	controller.prototype.callAddtxthandller = function(txt) {
		this.model.addData(txt);
		this.reWriteData();

	};
	controller.prototype.callCheckHandller = function(event) {
		var _t=this;
		_t.current_tab="checked";
		obj.showChk(this);
		
	};
	controller.prototype.callUnCheckHandller = function(event) {
		var _t=this;
		_t.current_tab="unchecked";
		obj.showUnChk(this);
		
	};
	
	controller.prototype.callshowAllhandller = function(event) {
		var _t=this;
		_t.current_tab="showAll";
		_t.reWriteData();
	};
	




	var obj = new tabEvents();

	controller.prototype.callRemove = function(event) {
		var _t=this;
		    var id = this.view.getremocediv(event);
		    this.model.removeData(id);
		    this.view.removeFromHtml(event);   

	};

	controller.prototype.callCheck	=function(event) {
	   	var _t=this;
	    var div = this.view.getParentId(event);
	    this.model.toggleStatus(div);
	    switch(_t.current_tab){
	    	case "checked" : obj.showChk(this);
	    					break;
	    	case "unchecked" : obj.showUnChk(this);
	    					break;
	    	case "showAll" : _t.reWriteData();
	    					break;				
	    }
	};

	function tabEvents(){
		var _t =this;
				
	    function write(status,ctrl) {
			_t.tempA = [];
			_t.tempA = ctrl.model.elegibleTask(status);
			_t.tempA.forEach(function(element) {
				ctrl.view.writeHtml(element,ctrl,ctrl.callCheck,ctrl.callRemove);// ctrl passing this		        
			});
		}
	    this.showChk = function(ctrl) {
			ctrl.view.MakeEmpty();        
	        write(true,ctrl);
	    };
	    this.showUnChk = function(ctrl) {
	        ctrl.view.MakeEmpty();
	        write(false,ctrl);
	    };
	};

	controller.prototype.reWriteData = function() {
	    	var _t=this;
	    	this.view.MakeEmpty();
	    	this.tempA = [];
	    	this.tempA = this.model.AllData();
	   		this.tempA.forEach(function(element){
	     		_t.view.writeHtml(element,_t,_t.callCheck,_t.callRemove);
	    	});	
	};
	window.controller = controller;
})();



(function() {
	function APP(app,id) {
		app.view = new view(id);
		app.model = new model(id);
		app.controller = new controller(app.view, app.model);

	}
	window.app1 = window.app1 || {};

	APP(window.app1,'fetodo');	
})();


