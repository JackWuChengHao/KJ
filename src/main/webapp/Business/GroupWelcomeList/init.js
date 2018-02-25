$(document).ready(function(){
	bind_add_welcome_msg();
}); 


function bind_add_welcome_msg(){
	$("#add_welcome_msg").on("click",function(){
		var content = $("#message-text").content;
		alert(content);
		//sendAjax();
	});
}