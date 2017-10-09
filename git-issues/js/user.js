$(document).ready(function(){
	var arr= []; 
	var pathname =  window.location.href;
	var url = new URL(pathname);
	var c = url.searchParams.get("q");

		$.ajax({
			url: 'https://api.github.com/users/'+c,
			success: function(data) {
			arr = data;
			writeHtml(arr);
			},
			type: 'GET'
		});
	function writeHtml(param){

		var userimage = "<img src='"+param.avatar_url+"'/>"


		var profilebutton = "<a href='"+param.html_url+"' ><button type='' class='button'>visit git profile</button></a>"


		$("#user-img").append(userimage);
		$("#user-uname").append(param.name);
		$("#user-uname").append(profilebutton);

		$(".user-loc").append(param.location);
		$(".user-comp").append(param.company);
		$(".user-following").append(param.followers);
		$(".user-followers").append(param.following);
		$(".user-repo").append(param.public_repos);


	}
							


   
});