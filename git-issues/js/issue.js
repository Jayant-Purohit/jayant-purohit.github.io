$(document).ready(function(){
	
	var arr= []; 
	var pathname =  window.location.href;
	var url = new URL(pathname);
	var c = url.searchParams.get("q");
		$.ajax({
			url: c,
			success: function(data) {
				arr = data;
				writeHtml(arr);
			},
			type: 'GET'
		});

	function writeHtml(param){		
		var issueCreateDate = "Issue Created At : " + formatDate(param.created_at);
		var issueUpdateDate = "<br>Issue Updated At : " + formatDate(param.updated_at);
	    var txt1 = "<h5>"+param.title+"</h5>";                
	    var txt2 = "<p>"+param.body+"</p>";               
	    var txt3 = "<p><img src='"+param.user.avatar_url+"'/></p>";
	    var txt4 = "<p> <a href='user.html?q="+param.user.login+"'> "+param.user.login+ " </a> </p>";     
	    $("#id-issue-title").append(txt1);
	    $("#issuebody").append(txt2);    
	    $("#issue-user-img").append(txt3);
	    $("#issue-user-name").append(txt4);
	    $("#issue-dates").append(issueCreateDate);
	    $("#issue-dates").append(issueUpdateDate);
	    dataLabel = [];
			if(param.labels.length > 0 ){
				var lbtxt= " labels : ";
				for (var i = 0; i < (param.labels.length); i++) {
				 	lbtxt +=  " <span style='background-color:#"+param.labels[i].color+"' class='label'>"  + param.labels[i].name+  "</span> ";
				}
				$("#issuebody").append(lbtxt);
			}
		}

	function formatDate(d){
		date = new Date(d)
		var dd = date.getDate(); 
		var mm = date.getMonth()+1;
		var yyyy = date.getFullYear(); 
		if(dd<10){dd='0'+dd} 
		if(mm<10){mm='0'+mm};	
		return d = dd+'/'+mm+'/'+yyyy
	}
	
});