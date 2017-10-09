(function(){
	function view(id){
		var _t = this;
		this.cnt = document.getElementById(id);
		this.elements = {
			TEXTBOX: _t.cnt.querySelector(".txtbox"),
			SHOWCHECKED: _t.cnt.querySelector(".checked"),
			SHOWUNCHECKED : _t.cnt.querySelector(".unchecked"),
			SHOWALL : _t.cnt.querySelector(".showAll"),
			TASKCNT : _t.cnt.querySelector(".write")


		};
		this.keys = {
			'ENTER': 13
		}
	}
	view.prototype.bind = function(event,callback) {
		var _t=this;
		switch(event) {
			case "txtbox":
				this.elements.TEXTBOX.addEventListener('keypress', function(event){
					if (event.keyCode != _t.keys.ENTER) {
						return;
					}
				    var text = event.target;
				    callback(text.value);
				    text.value = "";
				});
			break;
			case "checked":
				this.elements.SHOWCHECKED.addEventListener('click', function(event) {
					callback(event); 
				});
			break;
			case "unchecked":
				this.elements.SHOWUNCHECKED.addEventListener('click', function(event) {
					callback(event); 
				});
			break;
			case "showAll":
				this.elements.SHOWALL.addEventListener('click', function(event) {
					callback(event); 
				});
			break; 
		}
	};
	// context - this-scope of controller passing this
	view.prototype.writeHtml = function(element,context,ref1,ref2) {
	    if (!element.show) {
	        return false;
	    }
	    var divnew = document.createElement('div');
	    divnew.setAttribute("id", element.id);
	    var chkbox = document.createElement("INPUT");
	    chkbox.setAttribute("type", "checkbox");
	    chkbox.classList.add("checkbox");
	    chkbox.checked = element.status;
	    chkbox.addEventListener('change',function(event){ 
	    	ref1.call(context,event);
	    });

	    divnew.appendChild(chkbox);
	    var btnrmv = document.createElement("button");
	    btnrmv.classList.add("btn-delete");
	    btnrmv.addEventListener("click", function(event){
	    	ref2.call(context,event);
	    });
	    btnrmv.innerHTML = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
	    
	    divnew.appendChild(document.createTextNode(element.title));
	    divnew.appendChild(btnrmv);
	    this.elements.TASKCNT.appendChild(divnew);
	};
	view.prototype.removeFromHtml = function(event){
    	var del = event.target.parentNode;
    	var pr = del.parentNode.parentNode;
    	pr.removeChild(del.parentNode);
	};

	view.prototype.MakeEmpty = function(){
		divnew = this.elements.TASKCNT;
		divnew.innerHTML ="";
		
    	
	};
	view.prototype.getremocediv = function(event){
    	var deldiv = event.target.parentNode.parentElement.id;
    	return deldiv;
	};
	
	view.prototype.getParentId = function(event){
   		return event.target.parentNode.id; 		
	};
		

	window.view = view;
})();
