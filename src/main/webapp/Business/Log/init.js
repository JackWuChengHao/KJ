/**
 * 
 */

$(document).ready(function(){
	bindResetLogList();
	isNameValid("name");
});
	

function bindResetLogList(){
	$("#TXNcrLogReset").click(function(){
		$("#name").val("");
		$("#action").val("-1");
		$("#occurTime").val("");
		$("#serialNumber").val("");
	});
}