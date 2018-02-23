$(document).ready(function(){
	bindExecutingDownloadBtn();
	bindUploadEvidenceBtn();
	initEvidenceUploadInput();
	bindEvidenceDialogSubmitBtn();
	bindChangeMeasureBtn();
	bindCommitMeasureChangeDialogSubmitBtn();
	bindArrangeExecute();
	initDistributeExeDialogPointerSelect();
	bindExecuteSwitchBtn();
	bindClearFileList();
	clearUploadController();
	bingReset();
	bindDownloadEvidencesBtn();
});
/**
 * 点击下载证据文件按钮事件
 * @returns
 */
function bindDownloadEvidencesBtn(){
	$("#downloadEvidencesBtn").on("click",function(){
		var selectedList = executingTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var measureId = selectedList[0]["measureNumber"];
		downloadEvidences(measureId);
	});
}
/**
 * 下载按钮点击事件
 * @returns
 */
function bindExecutingDownloadBtn(){
	$("#executingDownloadBtn").on("click",function(){
		var selectedList = executingTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条措施","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		if(fileId == null){
			swal("","该措施不存在表单","warning");
			return;
		}
		var ico = selectedList[0]["ico"];
		
		if(ico == null){
			// 未变更的表单
			downloadFile(fileId);
		} else {
			// 变更后的表单，下载打包文件
			var measureId = selectedList[0]["measureNumber"];
			downloadFileAndChangeFiles(measureId);
		}
	});
}
/**
 * 上传证据按钮点击事件
 * @returns
 */
function bindUploadEvidenceBtn(){
	$("#uploadEvidenceBtn").on("click",function(){
		
		var selectedList = executingTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条措施","warning");
			return;
		}
		var ncrMeasure = selectedList[0];
		if(ncrMeasure["responsiblePerson"]!== $("#currentUser").text()){
			swal("", "您不是该措施的处理人", "error");
			return;
		}
		
		$("#evidenceDialogMeasureNumber").text(ncrMeasure["measureNumber"]);
		$("#evidenceDialogMeasureContext").val(ncrMeasure["planMeasure"]);
		$("#commitMeasureEvidenceDialog").modal("show");
	});
}

function initEvidenceUploadInput(){
    //初始化上传控件的样式
    $("#evidenceUpload").fileinput({
		language : 'zh',
		uploadUrl : "/TBNCRMS/fileUpload",
		maxFileSize : 102400,
		maxFileCount : 100,
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

    $("#commitMeasureChangeDialogUpload").fileinput({
		language : 'zh',
		uploadUrl : "/TBNCRMS/fileUpload",
		maxFileSize : 102400,
		maxFileCount : 100,
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

	$("#evidenceUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("提示", data["msg"], "error");
			return;
		}
		var fileId = data["response"]["fileId"];
		var fileName = data["response"]["fileName"];
		evidenceDialogTable.add({
			index: evidenceDialogTable.rowCount()+1, 
			fileId:fileId,
			evidenceFileName : fileName,
			removeFile: '<a style="text-decoration:none;" href="javascript:void(0)" class="modaltableremovefile" onclick=removeEvidence('+(evidenceDialogTable.rowCount()+1)+')>移除</a>'
		});
	});
	$("#commitMeasureChangeDialogUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("提示", data["msg"], "error");
			return;
		}
		
		var fileId = data["response"]["fileId"];
		$("#commitMeasureChangeDialogUploadFile").val(fileId);
	});
}
function removeEvidence(index){
	evidenceDialogTable.del(evidenceDialogTable.get(index));
}

function bindClearFileList(){
	$(".fileinput-remove-button").click(function(){
		$(".modaltableremovefile").trigger("click");
	});
}

/**
 * 初始化指派界面的内部处理人列表
 * @returns
 */
function initDistributeExeDialogPointerSelect(){
	var result = sendAjax("/TBNCRMS/getPointerList",{});
	if(result["code"] !== 0){
		return;
	}
	$("#distributeExeDialogPointerSelect").empty();
	for(var i in result["rows"]){
		$("#distributeExeDialogPointerSelect").append('<option value="'+result["rows"][i]["id"]+'">'+result["rows"][i]["name"]+'</option>');
	}
	
}

function bindEvidenceDialogSubmitBtn(){
	$("#evidenceDialogSubmitBtn").on("click",function(){
		var a = $("#evidenceDialogTable").html();
		if(a.indexOf("modaltableremovefile") < 0 || a.indexOf("modaltableremovefile") === 0){
			swal("", "请上传证据文件", "error");
			return;
		}
		swal({
			title: "",
			text: "是否提交证据文件?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				bindEvidenceDialogSubmitfinal();
			}else{
				return;
			}
		});
	});
}

function bindEvidenceDialogSubmitfinal(){
	var selectedList = executingTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	var ncrMeasure = selectedList[0];
	var measureId = ncrMeasure["measureNumber"];
	
	var evidenceFileList = [];
	var rows = evidenceDialogTable.getDataSource();
	for(var i in rows){
		evidenceFileList.push(rows[i]["fileId"]);
	}
	
	var isSuccess = alertResult(sendAjax("/TBNCRMS/commitNcrMeasureEvidence",
			{"id":measureId,"filelist":evidenceFileList}));
	
	if(isSuccess){
		$("#commitMeasureEvidenceDialog").modal("hide");
		clearCommitMeasureEvidenceDialog();
		$("#unconfirmedTable-reflesh").trigger("click");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
		$("#executingTable-reflesh").trigger("click");
	}
}

/**
 * 变更措施按钮点击事件
 * @returns
 */
function bindChangeMeasureBtn(){
	$("#changeMeasureBtn").on("click",function(){
		var selectedList = executingTable.getSelected();
		if(selectedList.length === 0){
			swal("", "请选择至少一条措施", "warning");
			return;
		}

		// 保证选择的措施为同一开具项的措施
		var ncrInfoId;
		for(var i in selectedList){
			var currNcrInfoId = selectedList[i]["ncrInfoId"];
			if(ncrInfoId == null){
				ncrInfoId = currNcrInfoId;
			} else if(ncrInfoId !== currNcrInfoId) {
				swal("", "请选择同一开具项的措施", "error");
				return;
			}
		}
		
		var ncrMeasure = selectedList[0];
		
		var mainDepartment = ncrMeasure["data"]["ncrInfo"]["departmemt"]["departmentName"];
		var currentDapartment = $("#currentDepartmentName").text();
		if(currentDapartment!==mainDepartment){
			swal("", "只有主责部门可以变更措施", "error");
			return;
		}
		
		var serialNumber = ncrMeasure["serialNumber"];
		
		$("#commitMeasureChangeDialogMeasureNumber").text(serialNumber);
		$("#commitMeasureChangeDialog").modal("show");
	});
}
/**
 * 变更措施界面-确定按钮点击事件
 * @returns
 */
function bindCommitMeasureChangeDialogSubmitBtn(){
	$("#commitMeasureChangeDialogSubmitBtn").on("click",function(){
		var selectedList = executingTable.getSelected();
		if(selectedList.length === 0){
			return;
		}
		var measureIdList = [];
		for(var i in selectedList){
			measureIdList.push(selectedList[i]["measureNumber"]);
		}
		var fileId = $("#commitMeasureChangeDialogUploadFile").val();
		
		if(!$("#MeasureTimeChange").prop("checked")&& !$("#MeasureActionChange").prop("checked")){
			swal("提示", "未选择措施类型", "warning");
			return;
		}
		if(fileId == null || fileId === ""){
			swal("提示", "未上传文件", "warning");
			return;
		}
		
		var wordData = sendAjax("/TBNCRMS/readWord",{"fileId":fileId,"code":5});
		if(wordData["code"] !== 0){
			swal("提示", wordData["msg"], "error");
			return;
		} 
		$("#dialogBeforeMeasure").val(wordData["data"]["beforeMeasure"]);
		$("#dialogAfterMeasure").val(wordData["data"]["afterMeasure"]);
		$("#dialogMeasureChangeNo").text(wordData["data"]["no"]);
		$("#commitMeasureChangeDialog").modal("hide");
		$("#measureChangeBeforeUploadDialog").modal("show");
	});
}
/**
 * 变更措施提交
 * @returns
 */
function MeasureChangeCommitfinal(){
	var selectedList = executingTable.getSelected();
	var measureIdList = [];
	for(var i in selectedList){
		measureIdList.push(selectedList[i]["measureNumber"]);
	}
	var fileId = $("#commitMeasureChangeDialogUploadFile").val();
	var changeType = "";
	if($("#MeasureTimeChange").prop("checked")){
		changeType="措施延期";
	}
	if($("#MeasureActionChange").prop("checked")){
		if(changeType!=='') changeType+="，";
		changeType+="措施变更";
	}

	var isSuccess = alertResult(sendAjax("/TBNCRMS/commitNcrMeasureChange",
			{"measureIdList":measureIdList,"fileId":fileId,"changeType":changeType}));
	
	if(isSuccess){
		clearCommitMeasureChangeDialog();
		clearUploadController();
		$("#measureChangeBeforeUploadDialog").modal("hide");
		$("#executingTable-reflesh").trigger("click");
	}
}

function clickMeasureChangeBeforeUploadDialogCancelBtn(){
	clearUploadController();
	$(".fileinput-remove-button").trigger("click");
	$("#commitMeasureChangeDialogUploadFile").val("");
	$("#measureChangeBeforeUploadDialog").modal("hide");
	$("#commitMeasureChangeDialog").modal("show");
}
function clickMeasureChangeBeforeUploadDialogSubmitBtn(){
	swal({
		title: "",
		text: "是否变更措施?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#223a5e",
		confirmButtonText: "是",
		cancelButtonText: "否",
		closeOnConfirm: false}, 
	function(confirm){
		if(confirm){
			MeasureChangeCommitfinal();
		}else{
			$("#measureChangeBeforeUploadDialog").modal("show");
		}
	});
}

/**
 * 悬浮气泡
 * @returns
 */
function initAllMeasuresDetailDialogTablePopover(){
	$('a[id^="allMeasuresDetailDialogTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = allMeasuresDetailDialogTable.get(rowid);
		var content = row["planMeasure"];
		
		$(this).webuiPopover({
			placement:'top',
			title:"",
			html:true,
			content:content,
			animation:"fade", 
			delay:{
				show:null,
				hide:300
			},
			trigger:"hover",
		});
	});
}
function initExecutingTablePopover(){
	$('a[id^="executingTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = executingTable.get(rowid);
		var content = row["planMeasure"];
		
		$(this).webuiPopover({
			placement:'top',
			title:"",
			html:true,
			content:content,
			animation:"fade", 
			delay:{
				show:null,
				hide:300
			},
			trigger:"hover",
		});
	});
}

function showMeasuresDetailDialog(rowIndex){
	$("#measuresDetailDialogContext").val(executingTable.get(rowIndex)["planMeasure"]);
	
	var measureId = executingTable.get(rowIndex)["measureNumber"];

	var data = sendAjax("/TBNCRMS/selectNcrMeasureChangeList",{"measureId":measureId});
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

/**
 * 上传变更措施-信息确认界面的取消按钮点击事件
 * @returns
 */
function bindMeasureChangeBeforeUploadDialogCancelBtn(){
	$("#commitMeasureChangeDialogUploadFile").val("");
	$(".fileinput-remove-button").trigger("click");
}

function clearCommitMeasureEvidenceDialog(){
	$("#commitMeasureEvidenceDialogForm")[0].reset();
	$(".fileinput-remove-button").trigger("click");
	evidenceDialogTable.clear();
}
function clearCommitMeasureChangeDialog(){
	clearUploadController();
	$("#commitMeasureChangeDialogForm")[0].reset();
	$(".fileinput-remove-button").trigger("click");
}
/**
 * 实施界面-指派按钮点击事件
 * @returns
 */
function bindArrangeExecute(){
	$("#executingBtn").click(function(){
		var selectedList = executingTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条措施","warning");
			return;
		}
		
		var MeasureNo = selectedList[0];
		var department = MeasureNo["department"];
		if(department !== $("#currentDepartmentName").text()){
			swal("","非本部门措施不可指派","warning");
			return;
		}
		
		var pointPersion = MeasureNo["responsiblePerson"];
		var options = $("#distributeExeDialogPointerSelect").find("option");
		for(var i in options){
			if(options[i].text === pointPersion){
				$("#distributeExeDialogPointerSelect").val(options[i].value);
				break;
			}
		}
		
		$("#distributemeasureDialogSerial").text(MeasureNo["measureNumber"])
		$("#distributeExeDialog").modal("show");
	});
}
/**
 * 实施中-指派人员
 * @returns
 */
function distributeExeDialogPoint(){
	var userId = $("#distributeExeDialogPointerSelect").find("option:selected").val();
	var selectedList = executingTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	swal({
		title: "",
		text: "是否指派给该用户?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#223a5e",
		confirmButtonText: "是",
		cancelButtonText: "否",
		closeOnConfirm: false}, 
	function(confirm){
		if(confirm){
			var measureId =  selectedList[0]["measureNumber"];
			
			var isSuccess = alertResult(sendAjax("/TBNCRMS/pointMeasure",
					{"measureId":measureId,"userId":userId}));
			if(isSuccess){
				$("#distributeExeDialog").modal("hide");
				$("#executingTable-reflesh").trigger("click");
				initDistributeExeDialogPointerSelect();
			}
		}else{
			return;
		}
	});
}

/*
 * 控制变更类型checkbox
 */
$(function (){
	$("#analyzeDialogCheck5").click(function(){
		if($("#analyzeDialogCheck5").prop("checked")){
			$("#analyzeDialogCheck1").prop("checked",false);
			$("#analyzeDialogCheck2").prop("checked",false);
			$("#analyzeDialogCheck3").prop("checked",false);
			$("#analyzeDialogCheck4").prop("checked",false);
		}
	});
	$("input[name='common']").click(function(){
		if($("#analyzeDialogCheck5").prop("checked")){
			$("#analyzeDialogCheck5").prop("checked",false);
		}
	});
});

function bindExecuteSwitchBtn(){
	$("#ExecuteSwitchBtn").on("click",function(){

		var now_content = $("#ExecuteSwitchBtn").val();
		switch(now_content){
			case "显示全部":
				$("#isChangeInput").val("y");
				$("#ExecuteSwitchBtn").val("只显示有变更的");
				break;
			case "只显示有变更的":
				$("#isChangeInput").val("");
				$("#ExecuteSwitchBtn").val("显示全部");
				break;
			default:
				$("#isChangeInput").val("");
				$("#ExecuteSwitchBtn").val("显示全部");
				break;
		}
		$("#executeSearchDivSearch").trigger("click");
	});
}

function bingReset(){
	$("#executeReset").on("click",function(){
		$("#ExecuteSwitchBtn").val("显示全部");
	});
}