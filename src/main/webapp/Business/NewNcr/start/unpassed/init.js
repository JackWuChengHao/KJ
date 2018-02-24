$(document).ready(function(){
	bindDownloadEvidencesBtn();
	bindUnpassedTabDownloadBtn();
	bindUnpassedCommitAuditBtn();
	bindUnpassedCommitNcrDialogSubmitBtn();
	initUnpassUploadInput();
	bindunpassedSwitchBtn();
	clearUploadController();
	bindUnpassedReset();
});

/**
 * 点击下载证据文件按钮事件
 * @returns
 */
function bindDownloadEvidencesBtn(){
	$("#downloadEvidencesBtn").on("click",function(){
		var selectedList = newNcrUnpassedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var measureId = selectedList[0]["measureNumber"];
		downloadEvidences(measureId);
	});
}

/**
 * 点击下载按钮事件
 * @returns
 */
function bindUnpassedTabDownloadBtn(){
	$("#unpassedTabDownloadBtn").on("click",function(){
		var selectedList = newNcrUnpassedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		if(fileId == null){
			swal("","该措施不存在表单","warning");
			return;
		}
		var hasChange = selectedList[0]["hasChange"];
		
		if(hasChange){
			// 变更后的表单，下载打包文件
			var measureId = selectedList[0]["measureNumber"];
			downloadFileAndChangeFiles(measureId);
		} else {
			// 未变更的表单
			downloadFile(fileId);
		}
	});
}
/**
 * 点击提交验证意见按钮事件
 * @returns
 */
function bindUnpassedCommitAuditBtn(){
	$("#unpassedCommitAuditBtn").on("click",function(){
		var selectedList = newNcrUnpassedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var measure = selectedList[0];
		
		var currUser = $("#currentUser").text();
		var createUser = measure["data"]["ncrInfo"]["createPersion"]["name"];
		if(currUser!==createUser){
			swal("", "您不是此开具项的开具人", "warning");
			return;
		}
		
		var typeId = measure["typeId"];
		if(Number(typeId) === 10){
			// 原处置单
			$("#unpassedCommitNcrDialogUploadDiv").show();
			$("#unpassedCommitNcrDialogJudgeDiv").show();
			$("#unpassedCommitNcrDialogAuditDiv").show();
			
			$("#unpassedCommitNcrDialogSubmitBtn").show();
			$("#unpassedCommitNcrDialogWordSubmitBtn").hide();
		} else {
			if(isTypeNeedForm(typeId)){
				// 需要上传表单
				$("#unpassedCommitNcrDialogUploadDiv").show();
				$("#unpassedCommitNcrDialogJudgeDiv").hide();
				$("#unpassedCommitNcrDialogAuditDiv").hide();
				
				$("#unpassedCommitNcrDialogSubmitBtn").hide();
				$("#unpassedCommitNcrDialogWordSubmitBtn").show();
			} else {
				$("#unpassedCommitNcrDialogUploadDiv").hide();
				$("#unpassedCommitNcrDialogJudgeDiv").show();
				$("#unpassedCommitNcrDialogAuditDiv").show();

				$("#unpassedCommitNcrDialogSubmitBtn").show();
				$("#unpassedCommitNcrDialogWordSubmitBtn").hide();
			}
		}
		
		$("#unpassedCommitNcrDialogMeasureNumber").text(measure["measureNumber"]);
		$("#unpassedCommitNcrDialog").modal("show");
	});
}
/**
 * 提交措施验证意见
 * @returns
 */
function bindUnpassedCommitNcrDialogSubmitBtn(){
	$("#unpassedCommitNcrDialogSubmitBtn").on("click",function(){
		var selectedList = newNcrUnpassedTable.getSelected();
		if(selectedList.length !== 1){
			return;
		}
		var measure = selectedList[0];
		var typeId =measure["data"]["ncrInfo"]["type"]["id"];
		
		var fileId = $("#unpassedCommitNcrDialogFileId").val();
		var measureJudge = $("#measureJudge").find("option:selected").val();
		var auditContext = stripencodescript($("#unpassedCommitNcrDialogAudit").val().trim());

		if(isTypeNeedForm(typeId) && (fileId == null || fileId === "")){
			swal("","请上传文件" , "info");
			return;
		}
		
		if(measureJudge === null || measureJudge === undefined || measureJudge === "-1"){
			swal("","请选择实施进度" , "info");
			return;
		}
	
		if(auditContext === null || auditContext === undefined || auditContext.trim() === ""){
			swal("","请输入验证意见" , "info");
			return;
		}
	
		var isSuccess = alertResult(sendAjax("/webapp/commitNcrMeasureCheck",
				{'measureId':measure["measureNumber"],'fileId':fileId,'measureJudge':measureJudge,'measureAudit':auditContext}));
		
		if(isSuccess){
			clearUnpassedCommitNcrDialogForm();
			$("#unpassedCommitNcrDialog").modal("hide")
			$("#newNcrUnpassedTable-reflesh").trigger("click");
		}
	});
}

function initUnpassUploadInput(){
    //初始化上传控件的样式
    $("#unpassedCommitNcrDialogUpload").fileinput({
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
    
	$("#unpassedCommitNcrDialogUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("提示", data["msg"], "error");
			return;
		}
		var fileId = data["response"]["fileId"];
		$("#unpassedCommitNcrDialogFileId").val(fileId);
	});

}
/**
 * 上传文件后，回显数据
 * @returns
 */
function showUnpassedCommitNcrDialogWordSubmitBtn(){
	var fileId = $("#unpassedCommitNcrDialogFileId").val();
	if(fileId == null || fileId === ""){
		swal("","请上传文件" , "info");
		return;
	}
	
	var measure = newNcrUnpassedTable.getSelected()[0];
	var wordData = sendAjax("/webapp/readWord",{"fileId":fileId,"measureId":measure["id"],"code":2});
	if(wordData["code"] !== 0){
		swal("", wordData["msg"], "error");
		return;
	}
	
	var checkInfo = wordData["data"];
	
	$("#TXMeasuresCheckCommitDialogTime").text(getFormatDate(checkInfo["checkTime"]));
	$("#TXMeasuresCheckCommitDialogPersion").text(checkInfo["checkPersion"]["name"]);
	$("#TXMeasuresCheckCommitDialogPersonId").text(checkInfo["checkPersion"]["id"]);
	$("#TXMeasuresCheckCommitDialogResult").text(checkInfo["measureJudgeContext"]);
	$("#TXMeasuresCheckCommitDialogContext").val(checkInfo["recordContext"]);
	$("#TXMeasuresCheckCommitDialog").modal("show");
}
/**
 * 提交回显的数据
 * @returns
 */
function commitUnpassedCommitNcrDialog(){
	var selectedList = newNcrUnpassedTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	swal({
		title: "",
		text: "是否提交措施验证?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#223a5e",
		confirmButtonText: "是",
		cancelButtonText: "否",
		closeOnConfirm: false}, 
	function(confirm){
		if(confirm){	
			commitUnpassedCommitNcrDialogfinal();
		}else{
			return;
		}
	});
}

function commitUnpassedCommitNcrDialogfinal(){
	var selectedList = newNcrUnpassedTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	var measure = selectedList[0];
	
	var fileId = $("#unpassedCommitNcrDialogFileId").val();
	var measureJudgeContext = $("#TXMeasuresCheckCommitDialogResult").text();
	var measureJudge;
	if(measureJudgeContext === '延期关闭'){
		measureJudge=0;
	} else if(measureJudgeContext === '按期关闭'){
		measureJudge=1;
	} else if(measureJudgeContext === '延期未完成'){
		measureJudge=2;
	} else if(measureJudgeContext === '未到期待观察'){
		measureJudge=3;
	}
	var auditContext = stripencodescript($("#TXMeasuresCheckCommitDialogContext").val());
	
	var isSuccess = alertResult(sendAjax("/webapp/commitNcrMeasureCheck",
			{'measureId':measure["measureNumber"],'fileId':fileId,'measureJudge':measureJudge,'measureAudit':auditContext}));
	
	if(isSuccess){
		clearUnpassedCommitNcrDialogForm();
		$("#unpassedCommitNcrDialog").modal("hide")
		$("#newNcrUnpassedTable-reflesh").trigger("click");
	}
}

function clearUnpassedCommitNcrDialogForm(){
	$("#unpassedCommitNcrDialogForm")[0].reset();
	$(".fileinput-remove-button").trigger("click");
	$("#unpassedCommitNcrDialogFileId").val("");
}


function showMeasuresDetailDialog(rowIndex){
	$("#measuresDetailDialogContext").val(newNcrUnpassedTable.get(rowIndex)["planMeasure"]);
	var measureId = newNcrUnpassedTable.get(rowIndex)["measureNumber"];

	var data = sendAjax("/webapp/selectNcrMeasureChangeList",{"measureId":measureId});
	if(data["code"] !== 0){
		swal("提示", data["msg"], "error");
		return;
	}
	var len = data["rows"].length;
	measuresDetailDialogTable.clear();
	for(var i=0;i<len;i++){
		measuresDetailDialogTable.add({
			index: i+1, 
			file : '<a href="javascript:void(0)" onclick=downloadFile('+(data["rows"][i]["file"]["id"])+')>'+data["rows"][i]["file"]["fileName"]+'</a>',
			changeTime: getFormatDate(data["rows"][i]["changeTime"])
		});
	}
	$("#TXMeasuresDetailDialog").modal("show");
}

function bindunpassedSwitchBtn(){
	$("#unpassedSwitchBtn").on("click",function(){
		var show = $("#unpassedSwitchBtn").val();
		if(show === '显示全部'){
			$("#hasDelayInput").val("y");
			$("#unpassedSwitchBtn").val("只显示延期上传");
			$("#UnpassedSearch").trigger("click");
		} else if(show === '只显示延期上传'){
			$("#hasDelayInput").val("");
			$("#unpassedSwitchBtn").val("显示全部");
			$("#UnpassedSearch").trigger("click");
		}
	});
}

function bindUnpassedReset(){
	$("#UnpassedReset").on("click",function(){
		$("#unpassedSwitchBtn").val("显示全部");
	});
}
