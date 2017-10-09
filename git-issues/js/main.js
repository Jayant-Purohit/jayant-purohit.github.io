$(document).ready(function(){
	var arr = [];
	var arrOfIssue = [];
	var reponame=[];

	$.typeahead({
		input: ".js-typeahead",
		maxItem:10,
		dynamic: true,
		delay: 500,
		display: "name",
		debug: true,
		selector: {
	        container: "typeahead__container"
		},
		searchOnFocus: true,
		template: function (query, item) {

			var color = "#777";

			return "{{name}} {{open_issues}}"
		},
		source: {
			items: {
				ajax: function (query) {
					return {
						type: "GET",
						url: "https://api.github.com/search/repositories",
						data: {
							q: "{{query}}"
						},
						callback: {
							done: function (data) {		
								return data.items;
							}
						}
					}
				}
			}

		},
		callback: {
			    onClick: function (node, a, item, event) {
					event.preventDefault();
					var prepareurl = "";
		            console.log(item.issues_url);
					var issue_str = item.issues_url.slice(0, -9);
					console.log(issue_str);
					prepareurl = issue_str +"?q=state:open+sort:created-asc";
					makeCall(prepareurl);
					this.container.removeClass('result');
				} 
	        }
	});

	function makeCall(url) {
		$.ajax({
			url: url,
			success: function(data) {
				console.log(data);
				arrOfIssue = [];
				arrOfIssue = data;
				write();
			},
			type: 'GET'
		});
	}

	function write(){
		$("write").empty();
		var htmlstr = "";
		for(i = 0 ; i < (arrOfIssue.length/2);i++ ){
			var crDate = formatDate(arrOfIssue[i].created_at);
			var upDate = formatDate(arrOfIssue[i].updated_at);
			htmlstr += "<a href='issue.html?q="+arrOfIssue[i].url+"'><div class='div-cont'><div class='img-div'><img src='"+arrOfIssue[i].user.avatar_url+"'></div><div class='text-div'><span class='title'>"+arrOfIssue[i].title+"</span><br><span class='cr-date'>Created at: "+crDate+" </span><br><span class='up-date'>Updated at: "+upDate+"</span></div></div></a>";
		}
		$("#write").append(htmlstr);
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

