$(document).ready(function(){
	initUploadInput();
	initPointerSelect();
	bindUnanalyzePointBtn();
	bindDistributeDialogSubmitBtn();
	bindHandlerUnanalyzeDownloadBtn();
	bindHandlerUnanalyzeAnalyzeBtn();
	bindAnalyzeDialogSubmitBtn();
	bindFinalizeBtn();
	bindAnalyzeDialogAddBtn();
	initTimeSerach("addMeasureDialogPlanFinishTime");
	initDepartmentSelect("addMeasureDialogDepartment");
	bindAddMeasureDialogSubmitBtn();
	bindAnalyzeAuditDialogChangeBtn();
	bindAnalyzeAuditDialogSubmitBtn();
	bindRedistributefinal();

	$(".fileinput-remove-button").click(function(){
		analyzeDialogEvidenceTable.clear();
		$("#addMeasureDialogPlanFinishTimeVal").val("");
		$("#analyzeNcrUploadFileId").val("");
		$("#analyzeDialogNcrReason").val("");
	});
});
/**
 * 初始化上传控件
 * @returns
 */
function initUploadInput(){
    //初始化上传控件的样式
    $("#analyzeNcrUpload").fileinput({
		language : 'zh',
		uploadUrl : "/TBNCRMS/fileUpload",
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

	$("#analyzeNcrUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("提示", data["msg"], "error");
			return;
		}
		var fileId = data["response"]["fileId"];
		$("#analyzeNcrUploadFileId").val(fileId);
		
		var ncrInfo = unanalyzeTable.getSelected()[0];
		if(ncrInfo["ncrtype"]==='原处置单'){
			return;
		}
		var wordData = sendAjax("/TBNCRMS/readWord",{"fileId":fileId,"typeId":ncrInfo["ncrtypeId"],"code":1});
		if(wordData["code"] !== 0){
			swal("提示", wordData["msg"], "error");
			return;
		}
		$("#analyzeDialogNcrReasonDiv").show();
		$("#analyzeDialogEvidenceDiv").show();
		
		$("#analyzeDialogNcrReason").val(wordData["data"]["reason"]);
		analyzeDialogEvidenceTable.clear();
		for(var i in wordData["data"]["measureList"]){
			var ncrInfoFromWord = wordData["data"]["measureList"][i];
			analyzeDialogEvidenceTable.add({
				index: analyzeDialogEvidenceTable.rowCount()+1, 
				department : ncrInfoFromWord["department"]["departmentName"],
				departmentId : ncrInfoFromWord["department"]["id"],
				planFinishTime: getFormatDate(ncrInfoFromWord["planFinishTime"]),
				planMeasure: ncrInfoFromWord["planMeasure"],
				index:ncrInfoFromWord["measureIndex"]
			});
		}
	});
}
/**
 * 清空制定的措施
 * @returns
 */
function clearMeasureTable(){
	analyzeDialogEvidenceTable.clear();
	$(".fileinput-remove-button").trigger("click");
	$("#addMeasureDialogPlanFinishTimeVal").val("");
	$("#analyzeNcrUploadFileId").val("");
	$("#analyzeDialogNcrReason").val("");
}

/**
 * 初始化指派界面的内部处理人列表和审核界面的内部处理人列表
 * @returns
 */
function initPointerSelect(){
	var result = sendAjax("/TBNCRMS/getPointerList",{});
	if(result["code"] !== 0){
		return;
	}
	$("#pointerSelect").empty();
	$("#fixUnpassReasonAndRedistributeInlinePersion").empty();
	for(var i in result["rows"]){
		$("#pointerSelect").append('<option value="'+result["rows"][i]["id"]+'">'+result["rows"][i]["name"]+'</option>');
		$("#fixUnpassReasonAndRedistributeInlinePersion").append('<option value="'+result["rows"][i]["id"]+'">'+result["rows"][i]["name"]+'</option>');
	}
}
/**
 * 绑定指派按钮点击事件
 * @returns
 */
function bindUnanalyzePointBtn(){
	$("#unanalyzePointBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}

		var ncrInfo = selectedList[0];
		var activitiStatus = ncrInfo["activitiStatus"]
		if(!(activitiStatus === 3 || activitiStatus === 8 || activitiStatus === 9)){
			swal("", "当前选中开具项不可以指派", "error");
			return;
		}
		
		var pointPersion = ncrInfo["pointPersion"];
		var options = $("#pointerSelect").find("option");
		for(var i in options){
			if(options[i].text === pointPersion){
				$("#pointerSelect").val(options[i].value);
				break;
			}
		}
		
		var serialNumber = ncrInfo["serialNumber"];
		$("#distributeDialogSerialNumber").text(serialNumber);
		$("#distributeDialogAudit").val(ncrInfo["auditContext"]);
		$("#distributeDialog").modal("show");
		
		// 或开具项被开具人打回过，则显示开具人审核意见
		var activitiStatus = ncrInfo["activitiStatus"]
		if(activitiStatus === 8){
			$("#distributeDialogAuditDiv").show();
		}else {
			$("#distributeDialogAuditDiv").hide();
		}
	});
}
/**
 * 绑定指派界面的确定按钮点击事件
 * @returns
 */
function bindDistributeDialogSubmitBtn(){
	$("#distributeDialogSubmitBtn").on("click",function(){
		var userId = $("#pointerSelect").find("option:selected").val();
		if(userId == null || userId === ''){
			swal("", "请指定内部处理人", "error");
			return;
		}
		swal({
			title: "",
			text: "是否指定内部处理人?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				bindDistributeDialogSubmitfinal();
			}else{
				return;
			}
		});
	});
}

function bindDistributeDialogSubmitfinal(){
	var selectedList = unanalyzeTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	var id = selectedList[0]["id"];
	var userId = $("#pointerSelect").find("option:selected").val();
	if(userId == null || userId === ''){
		swal("", "信息输入不完整", "error");
		return;
	}
	
	var isSuccess = alertResult(sendAjax("/TBNCRMS/pointHandleNcrInfo",{"id":id,"userId":userId}));
	
	if(isSuccess){
		clearDistributeDialogForm();
		$("#distributeDialog").modal("hide");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
	}
}

/**
 * 绑定下载按钮点击事件
 * @returns
 */
function bindHandlerUnanalyzeDownloadBtn(){
	$("#ncrHandlerUnanalyzeDownloadBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条开具项","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		downloadFile(fileId);
	});
}
/**
 * 分析原因和制定措施按钮点击事件，以及显示控制
 * @returns
 */
function bindHandlerUnanalyzeAnalyzeBtn(){
	$("#ncrHandlerUnanalyzeAnalyzeBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("", "请选择一条开具项", "warning");
			return;
		}
		var ncrInfo = selectedList[0];
		
		
		var activitiStatus = ncrInfo["activitiStatus"]
		// 延期开具项需要填写延期原因
		if(ncrInfo["hasDelay"]){
			$("#analyzeDialogDelayReason").val();
			$("#analyzeDialogDelayReasonDiv").show();
		} else {
			$("#analyzeDialogDelayReasonDiv").hide();
		}
		
		var pointPersion = ncrInfo["pointPersion"];
		if(activitiStatus === 4 && $("#finalizeBtn").length===0){
			swal("", "等待部门经理审核", "error");
			return;
		}
		if(ncrInfo["pointPersion"]!== $("#currentUser").text() && activitiStatus !== 4){
			swal("", "您不是该开具项的处理人", "error");
			return;
		}
		
		// 审核意见
		if(ncrInfo["auditContext"]!=null){
			$("#analyzeDialogAudit").val(ncrInfo["auditContext"]);
			$("#analyzeDialogAuditGroup").show();
		} else {
			$("#analyzeDialogAuditGroup").hide();
		}
		
		var typeId = ncrInfo["ncrtypeId"];
		var measureList=analyzeDialogEvidenceTable.getDataSource();
		// 原处置单readonly
		if(Number(typeId) === 10){
			$("#analyzeDialogNcrReason").prop("readonly",false);
			$("#analyzeDialogNcrReasonDiv").show();
			$("#analyzeDialogUploadDiv").show();
			$("#analyzeDialogEvidenceDiv").show();
			$("#analyzeDialogAddBtn").show();
		} else {
			if(isTypeNeedForm(typeId)){
				// 需要上传表单
				$("#analyzeDialogNcrReason").prop("readonly",true);
				$("#analyzeDialogNcrReasonDiv").hide();
				$("#analyzeDialogUploadDiv").show();
				$("#analyzeDialogEvidenceDiv").hide();
				$("#analyzeDialogAddBtn").hide();
			} else {
				$("#analyzeDialogNcrReason").prop("readonly",false);
				$("#analyzeDialogNcrReasonDiv").show();
				$("#analyzeDialogUploadDiv").hide();
				$("#analyzeDialogEvidenceDiv").show();
				$("#analyzeDialogAddBtn").show();
			}
		}
		
		if(activitiStatus === 8){
			$("#analyzeAuditDialogPointer").text(ncrInfo["pointPersion"]);
			$("#analyzeDialogAuditGroup").show();
			$("#analyzeDialogAudit").val(ncrInfo["auditContext"]);
			$("#analyzeDialog").modal("show");
			return;
		};
		if(activitiStatus === 6){
			swal("", "该开具项已定稿", "info");
			return;
		}
		// 待部门经理审核
		if(activitiStatus === 4){
			$("#analyzeAuditDialogPointer").text(ncrInfo["pointPersion"]);
			$("#analyzeAuditDialogProblemType").text(ncrInfo["problemType"]);
			$("#analyzeAuditDialogReason").val(ncrInfo["analyzeContext"]);
			
			var data = sendAjax("/TBNCRMS/getMeasureListByAnalyzeId",{"id":ncrInfo["analyzeId"]});
			if(data["code"] !== 0){
				swal("提示", data["msg"], "error");
				return;
			}
			analyzeAuditDialogMeasureTable.clear();
			for(var i in data["rows"]){
				var measure = data["rows"][i];
				analyzeAuditDialogMeasureTable.add({
					index: analyzeDialogEvidenceTable.rowCount()+1, 
					department : measure["department"]["departmentName"],
					planFinishTime: getFormatDate(measure["planFinishTime"]),
					planMeasure: measure["planMeasure"]
				});
			}

			if(ncrInfo["auditContext"]!=null){
				$("#analyzeAuditDialogAudit").val(ncrInfo["auditContext"]);
				$("#analyzeAuditDialogAuditDiv").show();
			} else {
				$("#analyzeAuditDialogAuditDiv").hide();
			}
			$("#analyzeAuditDialog").modal("show");
			return;
		}
		$("#analyzeDialog").modal("show");
	});
}

/**
 * 页面添加措施
 * @returns
 */
function bindAddMeasureDialogSubmitBtn(){
	$("#addMeasureDialogSubmitBtn").on("click",function(){
		var planMeasure = stripencodescript($("#addMeasureDialogPlanMeasure").val().trim());
		var planFinishTime = $("#addMeasureDialogPlanFinishTimeVal").val();
		var departmentName = $("#addMeasureDialogDepartment").find("option:selected").text();
		var departmentId = $("#addMeasureDialogDepartment").find("option:selected").val();
		
		if(planMeasure == "" || planMeasure == null){
			swal("", "请填写计划措施内容", "error");
			return;
		}
		if(planFinishTime == "" || planFinishTime == null){
			swal("", "请指定计划完成日期", "error");
			return;
		}
		if(departmentId == "-1" || departmentId == null){
			swal("", "请指定责任部门", "error");
			return;
		}
		if( new Date(planFinishTime+" 23:59") < new Date($("#TXWelcomeDate").text())){
			swal("", "计划完成时间应晚于当前服务器时间", "error");
			return;	
		}
		analyzeDialogEvidenceTable.add({
			index: analyzeDialogEvidenceTable.rowCount()+1, 
			department : departmentName,
			departmentId : departmentId,
			planFinishTime:planFinishTime,
			planMeasure:planMeasure
		});
		clearAddMeasureDialogForm();
		$("#addMeasureDialog").modal("hide");
		$("#analyzeDialog").css("overflow","auto");
	});
}
/**
 * 原因分析和措施制定界面的确定按钮点击事件
 * @returns
 */
function bindAnalyzeDialogSubmitBtn(){
	$("#analyzeDialogSubmitBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			return;
		}
		var ncrInfo = selectedList[0];
		
		var problemType = "";
		var checked1 = $("#analyzeDialogCheck1").prop("checked");
		var checked2 = $("#analyzeDialogCheck2").prop("checked");
		var checked3 = $("#analyzeDialogCheck3").prop("checked");
		var checked4 = $("#analyzeDialogCheck4").prop("checked");
		var checked5 = $("#analyzeDialogCheck5").prop("checked");
		if(checked1){
			problemType+='无流程';
		}
		if(checked2){
			if(problemType!=='')	problemType+=",";
			problemType+='流程执行不到位';
		}
		if(checked3){
			if(problemType!=='')	problemType+=",";
			problemType+='流程不合理';
		}
		if(checked4){
			if(problemType!=='')	problemType+=",";
			problemType+='流程不完善';
		}
		if(checked5){
			problemType='/';
		}
		
		var typeId = ncrInfo["ncrtypeId"];
		var fileId = $("#analyzeNcrUploadFileId").val();
		var measureList=analyzeDialogEvidenceTable.getDataSource();
		var delayReason = $("#analyzeDialogDelayReason").val().trim();
		var ncrReason = $("#analyzeDialogNcrReason").val().trim();
		
		
		if(!(checked1||checked2||checked3||checked4||checked5)){
			swal("", "请选择问题分类", "warning");
			return;
		}
		
		// 延期需要填写延期原因
		if(ncrInfo["hasDelay"]){
			if(delayReason == null ||$.trim(delayReason) === ''){
				swal("", "请填写延期原因", "warning");
				return;
			}
		}

		if(ncrReason == null ||$.trim(ncrReason) === ''){
			swal("", "请填写原因分析", "warning");
			return;
		}
		
		// 原处置单
		if(Number(typeId) === 10){
			if(fileId == null ||fileId === '' || measureList == null || measureList.length === 0){
				swal("", "信息不完整", "warning");
				return;
			}
		} else {
			if(isTypeNeedForm(typeId)){
				// 需要上传表单
				if(fileId == null ||fileId === '' ){
					swal("", "信息不完整", "warning");
					return;
				}
			} else {
				if(measureList == null || measureList.length === 0){
					swal("", "信息不完整", "warning");
					return;
				}
			}
		}

		swal({
			title: "",
			text: "是否提交原因和措施?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				bindAnalyzeDialogSubmitfinal();
			}else{
				return;
			}
		});
	});
}

function bindAnalyzeDialogSubmitfinal(){
	var selectedList = unanalyzeTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	var ncrInfo = selectedList[0];
	
	var problemType = "";
	var checked1 = $("#analyzeDialogCheck1").prop("checked");
	var checked2 = $("#analyzeDialogCheck2").prop("checked");
	var checked3 = $("#analyzeDialogCheck3").prop("checked");
	var checked4 = $("#analyzeDialogCheck4").prop("checked");
	var checked5 = $("#analyzeDialogCheck5").prop("checked");
	if(checked1){
		problemType+='无流程';
	}
	if(checked2){
		if(problemType!=='')	problemType+=",";
		problemType+='流程执行不到位';
	}
	if(checked3){
		if(problemType!=='')	problemType+=",";
		problemType+='流程不合理';
	}
	if(checked4){
		if(problemType!=='')	problemType+=",";
		problemType+='流程不完善';
	}
	if(checked5){
		problemType='/';
	}
	
	var typeId = ncrInfo["ncrtypeId"];
	var fileId = $("#analyzeNcrUploadFileId").val();
	var measureList=analyzeDialogEvidenceTable.getDataSource();
	var delayReason = $("#analyzeDialogDelayReason").val().trim();
	var ncrReason = $("#analyzeDialogNcrReason").val().trim();
	
	var isSuccess = alertResult(sendAjax("/TBNCRMS/analyzeNcrInfo",
			{"id":ncrInfo["id"],"fileId":fileId,"problemType":problemType,
				"measureList":analyzeDialogEvidenceTable.getDataSource(),
				"delayReason":delayReason,"ncrReason":ncrReason}
	));
	
	if(isSuccess){
		clearAnalyzeDialog();
		$("#analyzeDialog").modal("hide");
		$("#unconfirmedTable-reflesh").trigger("click");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
		$("#executingTable-reflesh").trigger("click");
	}
}


/**
 * 定稿
 * @returns
 */
function bindFinalizeBtn(){
	$("#finalizeBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条开具项","warning");
			return;
		}
		
		var ncrInfo = selectedList[0];
		
		var activitiStatus = ncrInfo["activitiStatus"]
		if(activitiStatus !== 6){
			swal("", "当前选中的开具项不允许被定稿", "error");
			return;
		}
		
		
		swal({
			title: "",
			text: "是否定稿该开具项?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				finalizeBtnfinal();
			}else{
				return;
			}
		});
	});
}

function finalizeBtnfinal(){
	var selectedList = unanalyzeTable.getSelected();
	if(selectedList.length !== 1){
		swal("","请选择一条记录","warning");
		return;
	}
	var ncrInfo = selectedList[0];
	
	var activitiStatus = ncrInfo["activitiStatus"]
	if(activitiStatus !== 6){
		swal("", "当前选中的开具项不允许被定稿", "error");
		return;
	}
	
	var isSuccess = alertResult(sendAjax("/TBNCRMS/finalize",{"id":ncrInfo["id"]}));
	if(isSuccess){
		$("#unconfirmedTable-reflesh").trigger("click");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
		$("#executingTable-reflesh").trigger("click");
	}
}

/**
 * 原因分析和措施制定界面措施+按钮点击事件
 * @returns
 */
function bindAnalyzeDialogAddBtn(){
	$("#analyzeDialogAddBtn").on("click",function(){
//		$("#analyzeDialog").modal("hide");
		$("#addMeasureDialog").modal("show");
	});
}
/**
 * 部门经理审核同事提交的原因分析，审核不通过
 * @returns
 */
function bindAnalyzeAuditDialogChangeBtn(){
	$("#analyzeAuditDialogChangeBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var ncrInfo = selectedList[0];
		
		var pointPersion = ncrInfo["pointPersion"];
		var options = $("#fixUnpassReasonAndRedistributeInlinePersion").find("option");
		for(var i in options){
			if(options[i].text === pointPersion){
				$("#fixUnpassReasonAndRedistributeInlinePersion").val(options[i].value);
				break;
			}
		}
		
		$("#fixUnpassReasonAndRedistributeSerialNumber").text(ncrInfo["serialNumber"]);
		$("#fixUnpassReasonAndRedistribute").modal("show");
		$("#fixUnpassReasonAndRedistributeForm")[0].reset();
	});
}

function bindRedistributefinal(){
	$("#redistribute").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		swal({
			title: "",
			text: "是否需要重新分析原因和制定措施?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				bindAnalyzeAuditDialogChangefinalsubmit();
			}else{
				return;
			}
		});
	});
}

function bindAnalyzeAuditDialogChangefinalsubmit(){
	var selectedList = unanalyzeTable.getSelected();
	if(selectedList.length !== 1){
		swal("","请选择一条记录","warning");
		return;
	}
	var ncrInfo = selectedList[0];
	var person = $("#fixUnpassReasonAndRedistributeInlinePersion").val();
	var audit = $("#fixUnpassReasonAndRedistributeAudit").val().trim();
	var isSuccess = alertResult(sendAjax("/TBNCRMS/auditHandleNcrInfo",{"id":ncrInfo["id"],"audit":audit,"result":1,"person":person}));
	if(isSuccess){
		$("#analyzeDialog").modal("hide");
		$("#fixUnpassReasonAndRedistribute").modal("hide");
		$("#analyzeAuditDialog").modal("hide");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
	}
}

/**
 * 部门经理审核同事提交的原因分析，审核通过
 * @returns
 */
function bindAnalyzeAuditDialogSubmitBtn(){
	$("#analyzeAuditDialogSubmitBtn").on("click",function(){
		var selectedList = unanalyzeTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		swal({
			title: "",
			text: "是否将此开具项提交给开具人审核?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				bindAnalyzeAuditDialogSubmitfinal();
			}else{
				return;
			}
		});
	});
}

function bindAnalyzeAuditDialogSubmitfinal(){
	var selectedList = unanalyzeTable.getSelected();
	if(selectedList.length !== 1){
		swal("","请选择一条记录","warning");
		return;
	}
	var person = selectedList[0]["pointpersonId"];
	var ncrInfo = selectedList[0];
	var isSuccess = alertResult(sendAjax("/TBNCRMS/auditHandleNcrInfo",{"id":ncrInfo["id"],"person":person,"result":'0',"audit":"审核通过"}));
	
	if(isSuccess){
		$("#analyzeAuditDialog").modal("hide");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
	}
}


function clearAnalyzeDialog(){
	$("#analyzeDialogForm")[0].reset();
	$(".fileinput-remove-button").trigger("click");
	analyzeDialogEvidenceTable.clear();
	$("#analyzeNcrUploadFileId").val("");
}
function clearAddMeasureDialogForm(){
	$("#addMeasureDialogForm")[0].reset();
	$("#addMeasureDialogPlanFinishTimeVal").val("");
	$("#analyzeDialog").css("overflow","auto");
}
function clearDistributeDialogForm(){
	$("#distributeDialogForm")[0].reset();
}

