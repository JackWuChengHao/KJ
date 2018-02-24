$(document).ready(function(){
	initTimeSerach("newNcrTime");
	bindSourceSelect("sourceSelect");
	bindTypeSelect("sourceSelect","typeSelect");
	initDepartmentSelect("ncrdepartment");
	initUploadInput();
	isNumValid("serialNumberInput");
	initCreatePersionSelect("ncrstarter");
});

function initUploadInput(){
    //初始化上传控件的样式
    $("#addNewVaildCheckDialogUpload").fileinput({
		language : 'zh',
		uploadUrl : "/webapp/fileUpload",
		maxFileSize : 102400,
		maxFileCount : 1,
		showUpload : true,
		showRemove : true,
		browseClass : "btn btn-default",
		dropZoneEnabled : true,
		uploadAsync : true,
		showPreview:false,
		fileActionSettings : {
			showRemove : true,
			showUpload : true,
			showZoom : true,
			showDrag : true,
		}
	});
    
	$("#addNewVaildCheckDialogUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("提示", data["msg"], "error");
			return;
		}
		var fileId = data["response"]["fileId"];
		$("#newCheckDialogUploadFile").val(fileId);
	});

}