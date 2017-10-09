(function() {
	function APP(app,id) {
		app.view = new view(id);
		app.controller = new controller(app.view);

	}
	window.slide1 = window.slide1 || {};
	window.slide2 = window.slide2 || {};

	APP(window.slide1,'img-slide1');
	APP(window.slide2,'img-slide2');

})();


