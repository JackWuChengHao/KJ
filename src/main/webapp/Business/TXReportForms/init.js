$(document).ready(function(){
	bindDownloadExcelBtn();
});

function bindDownloadExcelBtn(){
	$("#downloadExcelBtn").on('click',function(){
		window.location.href = "/webapp/downloadExcel";
	});
}
