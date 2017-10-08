(function(){
	function model(){
		this.data = [];			
	}
	
	model.prototype.addData = function(txt) {
		var d = new Date();
		var divid = d.getTime();
		this.data.push({
			id : divid,
	        title: txt,
	        status: false,
	        show: true
	    });
	}
	model.prototype.removeData =function(parentid){
		this.data.forEach(function(element){
	        if (element.id == parentid) {
	             element.show = false;
	         }
	    });
	}
	model.prototype.toggleStatus = function(divid) {
	    this.data.forEach(function(element){
	         if (element.id == divid){
	             element.status = !element.status;
	         }
	     });
	};

	model.prototype.elegibleTask =function(status) {
		var ar = [];
        ar = this.data.filter(function(element){
            if (element.status == status) {
				return element;
			}
		}); 
		return ar;
	}



	model.prototype.AllData =function() {
		return this.data;
	}




	window.model = model;
})();
