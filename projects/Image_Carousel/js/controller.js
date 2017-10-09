(function(){

	function controller(view){
		var _t = this;
		// variables for calculation
		this.count= 0;
		this.view = view;
		this.ctrl_image_count = 0;
		this.ctrl_total_length_ul = 0;
		this.ctrl_max_width = 0;
		this.ctrl_max_left=0;
		this.ctrl_max_right=0;
		// event binding
		this.view.bind('left', function(ev){
			_t.calllefthandller(ev);
		});
		this.view.bind('right', function(ev){
			_t.callrightHandller(ev);
		});
	}
	// add handlers to events
	controller.prototype.calllefthandller = function(ev) {
		var _t=this;
		_t.leftscroll(ev);
	};
	controller.prototype.callrightHandller = function(ev) {
		var _t=this;	
		_t.rightscroll();	
	};
	// function to scroll left
	controller.prototype.leftscroll = function(ev){
		console.log("scroll left");
		var _t=this;
		this.cont_id = _t.view.getId();
		_t.ctrl_max_width = _t.TrimString(_t.getMaxWidth(this.cont_id)); // width of container getMaxlength: convert string to number
		_t.ctrl_image_count = _t.getimgCount(this.cont_id); // number of image ul having.
		_t.ctrl_total_length_ul =  _t.ctrl_max_width * _t.ctrl_image_count; 	// total length of ul					
		_t.count= _t.count - _t.ctrl_max_width;
		_t.max_left = (-(_t.ctrl_total_length_ul)) + _t.ctrl_max_width;

		if(_t.count < _t.max_left){
			_t.count = _t.max_left;
			return
		}
		_t.view.UpdateLeft(_t.count); //sending data to view  
	};
	//function to scroll right 
	controller.prototype.rightscroll = function(ev){
		console.log("scroll right");
		var _t=this;
		this.cont_id = _t.view.getId();
		_t.ctrl_max_width = _t.TrimString(_t.getMaxWidth(this.cont_id)); // width of container getMaxWidth: convert string to number
		_t.ctrl_image_count = _t.getimgCount(this.cont_id); // number of image ul having.
		_t.ctrl_total_length_ul =  _t.ctrl_max_width * _t.ctrl_image_count; 
		
		_t.count= _t.count + _t.ctrl_max_width;
		if(_t.count > _t.ctrl_max_right){
			_t.count = 0;
			return;
		}						
		_t.view.UpdateLeft(_t.count);	// sending data to view 	
	};


	controller.prototype.getMaxWidth =function(id){
		var _t=this;
		this.cnt_maxwidth = $("#"+id).css("max-width");
		return	this.cnt_maxwidth;
	}
	controller.prototype.getimgCount =function(id){
		var _t=this;
		this.img_count = $("#"+id).find("img").length;
		return this.img_count;
	}
	controller.prototype.TrimString =function(value){
		return Number((value.slice(0, -2)));
	}


	window.controller = controller;

})();


