$(document).ready(function(){
	initTimeSerach("createTime");
	initTimeSerach("closeTime");
	bindSourceSelect("sourceSelect");
	bindTypeSelect("sourceSelect","typeSelect");
	initDepartmentSelect("departmentSelect");
	binddownloadHistoryNcrBtn();
	bindResetHistoryNcrList();
	initCreatePersionSelect("starter");
	isNumValid("serialNumber");
});

function binddownloadHistoryNcrBtn(){
	$("#downloadHistoryNcrBtn").on("click",function(){
		var selectedList = historyNcrTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		downloadFile(fileId);
	});
}

function bindResetHistoryNcrList(){
	$("#ResetHistoryNcrlist").click(function(){
		$("#serialNumber").val("");
		$("#departmentSelect").val("-1");
		$("#starter").val("-1");
		$("#createTime").val("");
		$("#closeTime").val("");
		$("#sourceSelect").val("-1");
		$("#typeSelect").val("-1");
		initTypeSelect("typeSelect");
	});
}
