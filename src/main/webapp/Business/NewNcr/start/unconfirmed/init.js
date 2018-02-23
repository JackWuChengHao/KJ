/**
 * 开具项发起-未确认
 */
$(document).ready(function(){
	initUploadInput();
	bindSourceSelect("unconfirmedChangeNcrDialogSource");
	bindTypeSelect("unconfirmedChangeNcrDialogSource","unconfirmedChangeNcrDialogType");
	bindSourceSelect("unconfirmedNewNcrDialogSourceSelect");
	bindTypeSelect("unconfirmedNewNcrDialogSourceSelect","unconfirmedNewNcrDialogTypeSelect");
	initDepartmentSelect("unconfirmedNewNcrDialogDepartment");
	bindUnconfirmedNewNcrDialogSubmitBtn();
	bindAbandonNewNcrBtn();
	bindAbandonSubmitNewNcrBtn();
	bindUnconfirmedTabDownloadBtn();
	bindNcrInfoChangeBtn();
	bindUnconfirmedChangeNcrDialogSubmitBtn();
	bindUnconfirmedNewNcrDialogSelect();
	clearUploadController();
});

/**
 * 初始化上传控件
 * @returns
 */
function initUploadInput(){
    //初始化上传控件的样式
    $("#unconfirmedNewNcrUpload").fileinput({
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
    $("#unconfirmedChangeNcrUpload").fileinput({
		language : 'zh',
		uploadUrl : "/TBNCRMS/fileUpload",
		maxFileSize : 102400,
		maxFileCount : 1,
		showUpload : true,
		showRemove : true,
		browseClass : "btn  btn-default",
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

	$("#unconfirmedNewNcrUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("", data["msg"], "error");
			return;
		}
		var fileId = data["response"]["fileId"];
		$("#unconfirmedNewNcrDialogUploadFileId").val(fileId);
	});
	$("#unconfirmedChangeNcrUpload").on("fileuploaded", function (event, data, previewId, index) {
		if(data["response"]["code"] !== 0){
			swal("", data["msg"], "error");
			return;
		}
		var fileId = data["response"]["fileId"];
		$("#unconfirmedChangeNcrDialogUploadFile").val(fileId);
	});

}

/**
 * 通过开具项类型控制开具不符合项界面的显示
 * @returns
 */
function bindUnconfirmedNewNcrDialogSelect(){
	$("#unconfirmedNewNcrDialogSourceSelect").change(function(){
		$("#unconfirmedNewNcrUploadGroup").hide();
		$("#unconfirmedNewNcrDialogDepartmentGroup").hide();
		$("#unconfirmedNewNcrDialogDescriptionGroup").hide();
		
		$("#unconfirmedNewNcrDialogDepartment").val(-1);
		$("#unconfirmedNewNcrDialogDescription").val("");
		var sourceId = $("#unconfirmedNewNcrDialogSourceSelect").find("option:selected").val();

		// 开具项类型为“二方审核”（包括书面和口头）时，用户需要指定审核对象
		if(Number(sourceId) === 6 || Number(sourceId) === 7){
			$("#unconfirmedNewNcrDialogAuditObjectDiv").show();
		} else{
			$("#unconfirmedNewNcrDialogAuditObjectDiv").hide();
		}
	});
	$("#unconfirmedChangeNcrDialogSource").change(function(){
		$("#unconfirmedChangeNcrDialogUploadDiv").hide();
		$("#unconfirmedChangeNcrDialogDescriptionGroup").hide();
		
		$("#unconfirmedChangeNcrDialogAuditObject").val("");

		var sourceId = $("#unconfirmedChangeNcrDialogSource").find("option:selected").val();

		// 开具项类型为“二方审核”（包括书面和口头）时，用户需要指定审核对象
		if(Number(sourceId) === 6 || Number(sourceId) === 7){
			$("#unconfirmedChangeNcrDialogAuditObjectDiv").show();
		} else{
			$("#unconfirmedChangeNcrDialogAuditObjectDiv").hide();
		}
	});
	$("#unconfirmedNewNcrDialogTypeSelect").change(function(){
		var typeId = $("#unconfirmedNewNcrDialogTypeSelect").find("option:selected").val();

		$("#unconfirmedNewNcrDialogDescription").val("");
		$("#unconfirmedNewNcrDialogDepartmentGroup").show();
		// 需要上传表单
		if(isTypeNeedForm(typeId)){
			// 公司质量目标完成情况统计表
			if(Number(typeId) === 7){
				$("#unconfirmedNewNcrDialogDepartmentGroup").show();
			} else {
				$("#unconfirmedNewNcrDialogDepartmentGroup").hide();
			}
			
			$("#unconfirmedNewNcrUploadGroup").show();
			$("#unconfirmedNewNcrDialogDescriptionGroup").hide();
		} else {
			$("#unconfirmedNewNcrUploadGroup").hide();
			$("#unconfirmedNewNcrDialogDescriptionGroup").show();
		}
		// 原处置单
		if(Number(typeId) === 10){
			$("#unconfirmedNewNcrDialogDepartmentGroup").show();
			$("#unconfirmedNewNcrDialogDescriptionGroup").show();
		}
		if(Number(typeId)===-1){
			$("#unconfirmedNewNcrUploadGroup").hide();
			$("#unconfirmedNewNcrDialogDepartmentGroup").hide();
			$("#unconfirmedNewNcrDialogDescriptionGroup").hide();
		}

		$(".fileinput-remove-button").trigger("click");
		$("#unconfirmedNewNcrDialogUploadFileId").val("");
		$("#unconfirmedNewNcrDialogDepartment").val(-1);
		$("#unconfirmedNewNcrDialogDescription").val("");
	});
	$("#unconfirmedChangeNcrDialogType").change(function(){
		var typeId = $("#unconfirmedChangeNcrDialogType").find("option:selected").val();

		// 需要上传表单
		if(isTypeNeedForm(typeId)){
			$("#unconfirmedChangeNcrDialogUploadDiv").show();
			$("#unconfirmedChangeNcrDialogDescriptionGroup").hide();
		} else {
			$("#unconfirmedChangeNcrDialogUploadDiv").hide();
			$("#unconfirmedChangeNcrDialogDescriptionGroup").show();
		}
		// 原处置单
		if(Number(typeId) === 10){
			$("#unconfirmedNewNcrDialogDepartmentGroup").show();
			$("#unconfirmedChangeNcrDialogDescriptionGroup").show();
		}
		
		if(Number(typeId)===-1){
			$("#unconfirmedNewNcrDialogDepartmentGroup").hide();
			$("#unconfirmedChangeNcrDialogDescriptionGroup").hide();
		}

		$(".fileinput-remove-button").trigger("click");
		$("#unconfirmedChangeNcrDialogUploadFile").val("");
		$("#unconfirmedChangeNcrDialogDescribe").val("");
	});
}
/**
 * 绑定新开具项确定按钮点击事件
 * @returns
 */
function bindUnconfirmedNewNcrDialogSubmitBtn(){
	$("#unconfirmedNewNcrDialogSubmitBtn").on("click",function(){
		var sourceId = $("#unconfirmedNewNcrDialogSourceSelect").find("option:selected").val();
		var typeId = $("#unconfirmedNewNcrDialogTypeSelect").find("option:selected").val();
		var fileId = $("#unconfirmedNewNcrDialogUploadFileId").val();
		var description = stripencodescript($("#unconfirmedNewNcrDialogDescription").val().trim()); 
		var departmentId = $("#unconfirmedNewNcrDialogDepartment").find("option:selected").val();
		var modalnewNcrTime = $("#ModalnewNcrTimeVal").val();
		var auditObject = $("#unconfirmedNewNcrDialogAuditObject").val().trim();
		
		if(sourceId == null || sourceId === '-1'){
			swal("", "请选择开具项来源", "warning");
			return;
		}
		if(typeId == null || typeId === '-1'){
			swal("", "请指定开具项类型", "warning");
			return;
		}
		if(Number(typeId) === 7 && (departmentId == null || departmentId === '-1')){
			swal("", "请选择主责部门", "warning");
			return;
		}
		if(modalnewNcrTime == null || modalnewNcrTime === ''){
			swal("", "请确定应回复日期", "warning");
			return;
		}
		if( new Date(modalnewNcrTime) <= new Date($("#TXWelcomeDate").text())){
			swal("", "应回复时间应晚于当前服务器时间", "warning");
			return;	
		}
		if(Number(sourceId) === 6 || Number(sourceId) === 7){
			if(auditObject==null || auditObject === ""){
				swal("", "审核对象不得为空", "warning");
				return;
			}
		}
		
		// 原处置单
		if(Number(typeId) === 10){
			if(fileId == null ||fileId === '' ){
				swal("", "请上传文件", "warning");
				return;
			}
			if(description == null || description === '' ){
				swal("", "不符合项描述不得为空", "warning");
				return;
			}
			if(departmentId == null || Number(departmentId) ===-1){
				swal("", "请选择主责部门", "warning");
				return;
			}
		} else {
			if(isTypeNeedForm(typeId)){
				// 需要上传表单
				if(fileId == null ||fileId === '' ){
					swal("", "请上传文件", "warning");
					return;
				}
			} else {
				if(description == null || description === ''){
					swal("", "不符合项描述不得为空", "warning");
					return;
				}
				if(departmentId == null || Number(departmentId) ===-1){
					swal("", "请选择主责部门", "warning");
					return;
				}
			}
		}
		
		// 不需要上传表单以及原处置单直接开具,需要解析表单的则需要二次确认
		if(!isTypeNeedForm(typeId) || Number(typeId) === 10){
			swal({
				title: "",
				text: "是否确认开具?",
				type: "info",
				showCancelButton: true,
				confirmButtonColor: "#223a5e",
				confirmButtonText: "是",
				cancelButtonText: "否",
				closeOnConfirm: false}, 
			function(confirm){
				if(confirm){
					if(departmentId == null || Number(departmentId)===-1){
						swal("", "信息不完整", "error");
						return;
					}
					var isSuccess = alertResult(sendAjax("/TBNCRMS/insertStartNcrInfo",
							{'sourceId':sourceId,'typeId':typeId,'fileId':fileId,'departmentId':departmentId,
							'describe':description,'shouldAnswerTime':modalnewNcrTime,'auditObject':auditObject}
					));
					if(isSuccess){
						$("#unconfirmedNewNcrDialog").modal("hide");
						$("#newNcrUnconfirmedTable-reflesh").trigger("click");
						clearUnconfirmedNewNcrDialog();
						$("#ensureNewSheet").modal("hide");
					}
					return;
				}
			});
			return;
		}
		
		var wordData = sendAjax("/TBNCRMS/readWord",{"fileId":fileId,"code":0,"typeId":typeId});
		if(wordData["code"] !== 0){
			swal("", wordData["msg"], "error");
			return;
		}
		$("#ensureNewSheetNO").text(wordData["data"]["serialNumber"]);
		if(isTypeNeedForm(typeId) && Number(typeId) !== 7){
			$("#ensureNewSheetDepartment").text(wordData["data"]["departmentName"]);
		} else {
			$("#ensureNewSheetDepartment").text($("#unconfirmedNewNcrDialogDepartment").find("option:selected").text());
		}
		$("#ensureNewSheetSource").text($("#unconfirmedNewNcrDialogSourceSelect").find("option:selected").text());
		$("#ensureNewSheetType").text($("#unconfirmedNewNcrDialogTypeSelect").find("option:selected").text());
		$("#ensureNewSheetDescribe").val(wordData["data"]["describe"]);
		$("#unconfirmedNewNcrDialog").modal("hide");
		$("#ensureNewSheetNewBtn").show();
		$("#ensureNewSheetChangeBtn").hide();
		$("#ensureNewSheet").modal("show");
	});
}
/**
 * 绑定修改开具项确定按钮点击事件
 * @returns
 */
function bindUnconfirmedChangeNcrDialogSubmitBtn(){
	$("#unconfirmedChangeNcrDialogSubmitBtn").on("click",function(){
		var sourceId = $("#unconfirmedChangeNcrDialogSource").find("option:selected").val();
		var typeId = $("#unconfirmedChangeNcrDialogType").find("option:selected").val();
		var fileId = $("#unconfirmedChangeNcrDialogUploadFile").val();
		var description = stripencodescript($("#unconfirmedChangeNcrDialogDescribe").val().trim()); 
		var auditObject = $("#unconfirmedChangeNcrDialogAuditObject").val();

		var selectedList = newNcrUnconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			return;
		}
		var ncrInfo = selectedList[0];
		var ncrId = ncrInfo["id"];
		
		
		if(sourceId == null || sourceId === '-1'){
			swal("", "请选择开具项来源", "warning");
			return;
		}
		if(typeId == null || typeId === '-1'){
			swal("", "请指定开具项类型", "warning");
			return;
		}
		if(Number(sourceId) === 6 || Number(sourceId) === 7){
			if(auditObject==null || auditObject === ""){
				swal("", "审核对象不得为空", "warning");
				return;
			}
		}
		
		// 原处置单
		if(Number(typeId) === 10){
			if(fileId == null ||fileId === '' ){
				swal("", "请上传文件", "warning");
				return;
			}
			if(description == null || description === '' ){
				swal("", "不符合项描述不得为空", "warning");
				return;
			}
		} else {
			if(isTypeNeedForm(typeId)){
				// 需要上传表单
				if(fileId == null ||fileId === '' ){
					swal("", "请上传文件", "warning");
					return;
				}
			} else {
				if(description == null || description === ''){
					swal("", "不符合项描述不得为空", "warning");
					return;
				}
			}
		}
		
		// 不需要上传表单以及原处置单直接开具,需要解析表单的则需要二次确认
		if(!isTypeNeedForm(typeId) || Number(typeId) === 10){
			swal({
				title: "",
				text: "是否确认修改?",
				type: "info",
				showCancelButton: true,
				confirmButtonColor: "#223a5e",
				confirmButtonText: "是",
				cancelButtonText: "否",
				closeOnConfirm: false}, 
			function(confirm){
				if(confirm){
					var isSuccess = alertResult(sendAjax("/TBNCRMS/changeStartNcrInfo",
							{'ncrId':ncrId,'fileId':fileId,'typeId':typeId,'sourceId':sourceId,'describe':description,'auditObject':auditObject}
					));
					if(isSuccess){
						$("#unconfirmedChangeNcrDialog").modal("hide");
						$("#newNcrUnconfirmedTable-reflesh").trigger("click");
						clearUnconfirmedChangeNcrDialog();
					}
					return;
				}
			});
			return;
		}
		
		var wordData = sendAjax("/TBNCRMS/readWord",{"fileId":fileId,"code":0,"typeId":typeId});
		if(wordData["code"] !== 0){
			swal("", wordData["msg"], "error");
			return;
		}
		if(wordData["data"]["serialNumber"] !== selectedList[0]["serialNumber"]){
			swal("","您上传的文件流水号发生变化","warning");
			return;
		}
		if(Number(typeId) !== 7 && wordData["data"]["departmentName"] !== selectedList[0]["departmemt"]){
			swal("","您上传的文件主责部门发生变化","warning");
			return;
		}
		$("#ensureNewSheetNO").text(wordData["data"]["serialNumber"]);
		if(isTypeNeedForm(typeId) && Number(typeId) !== 7){
			$("#ensureNewSheetDepartment").text(wordData["data"]["departmentName"]);
		} else {
			$("#ensureNewSheetDepartment").text($("#unconfirmedChangeNcrDialogDepartment").text());
		}
		$("#ensureNewSheetSource").text($("#unconfirmedChangeNcrDialogSource").find("option:selected").text());
		$("#ensureNewSheetType").text($("#unconfirmedChangeNcrDialogType").find("option:selected").text());
		$("#ensureNewSheetDescribe").val(wordData["data"]["describe"]);
		$("#unconfirmedNewNcrDialog").modal("hide");
		$("#ensureNewSheetNewBtn").hide();
		$("#ensureNewSheetChangeBtn").show();
		$("#ensureNewSheet").modal("show");
	});
}

/**
 * 新开具项-确认界面的取消按钮点击事件
 * @returns
 */
function clickNewNcrBeforeComitDialogCancelBtn(){
	$("#unconfirmedNewNcrDialog").modal("show");
}
/**
 * 新开具项-确认界面的确定按钮点击事件
 * @returns
 */
function clickNewNcrBeforeComitDialogSubmitBtn(){
	swal({
		title: "",
		text: "是否确认开具?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#223a5e",
		confirmButtonText: "是",
		cancelButtonText: "否",
		closeOnConfirm: false}, 
	function(confirm){
		if(confirm){
			clickNewNcrBeforeComitDialogSubmitBtnfinal();
		}else{
			return;
		}
	});
}
/**
 * 修改开具项-确认界面的取消按钮点击事件
 * @returns
 */
function clickChangeNcrBeforeComitDialogSubmitBtn(){
	swal({
		title: "",
		text: "是否确认修改?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#223a5e",
		confirmButtonText: "是",
		cancelButtonText: "否",
		closeOnConfirm: false}, 
	function(confirm){
		if(confirm){
			clickChangeNcrBeforeComitDialogSubmitBtnfinal();
		}else{
			return;
		}
	});
}

function clickNewNcrBeforeComitDialogSubmitBtnfinal(){
	var sourceId = $("#unconfirmedNewNcrDialogSourceSelect").find("option:selected").val();
	var typeId = $("#unconfirmedNewNcrDialogTypeSelect").find("option:selected").val();
	var fileId = $("#unconfirmedNewNcrDialogUploadFileId").val();
	var description = stripencodescript($("#unconfirmedNewNcrDialogDescription").val()); 
	
	var departmentId = $("#unconfirmedNewNcrDialogDepartment").find("option:selected").val();
	var modalnewNcrTime = $("#ModalnewNcrTimeVal").val();
	var auditObject = $("#unconfirmedNewNcrDialogAuditObject").val().trim();
	
	if(sourceId == null || sourceId === '-1' ||typeId == null || typeId === '-1'){
		swal("", "信息不完整", "error");
		return;
	}
	if((!isTypeNeedForm(typeId) || Number(typeId) === 7) && (departmentId == null || Number(departmentId)===-1)){
		swal("", "信息不完整", "error");
		return;
	}
	
	// 原处置单
	if(Number(typeId) === 10){
		if(fileId == null ||fileId === '' || description == null || description === ''){
			swal("", "信息不完整", "error");
			return;
		}
	} else {
		if(isTypeNeedForm(typeId)){
			// 需要上传表单
			if(fileId == null ||fileId === '' ){
				swal("", "信息不完整", "error");
				return;
			}
		} else {
			if(description == null || description === ''){
				swal("", "信息不完整", "error");
				return;
			}
		}
	}
	
	var isSuccess = alertResult(sendAjax("/TBNCRMS/insertStartNcrInfo",
			{'sourceId':sourceId,'typeId':typeId,'fileId':fileId,'departmentId':departmentId,
			'describe':description,'shouldAnswerTime':modalnewNcrTime,'auditObject':auditObject}
	));
	if(isSuccess){
		$("#ensureNewSheet").modal("hide");
		$("#newNcrUnconfirmedTable-reflesh").trigger("click");
		clearUnconfirmedNewNcrDialog();
	}
}
function clickChangeNcrBeforeComitDialogSubmitBtnfinal(){
	var sourceId = $("#unconfirmedChangeNcrDialogSource").find("option:selected").val();
	var typeId = $("#unconfirmedChangeNcrDialogType").find("option:selected").val();
	var fileId = $("#unconfirmedChangeNcrDialogUploadFile").val();
	var selectedList = newNcrUnconfirmedTable.getSelected();
	var auditObject = $("#unconfirmedNewNcrDialogAuditObject").val().trim();
	if(selectedList.length !== 1){
		return;
	}
	var ncrInfo = selectedList[0];
	var ncrId = ncrInfo["id"];
	
	if(sourceId == null || sourceId === '-1' ||typeId == null || typeId === '-1' || 
			fileId == null ||	fileId === '-1'){
		swal("", "信息不完整", "error");
		return;
	}
	
	var isSuccess = alertResult(sendAjax("/TBNCRMS/changeStartNcrInfo",
			{'ncrId':ncrId,'fileId':fileId,'typeId':typeId,'sourceId':sourceId,'auditObject':auditObject}
	));
	if(isSuccess){
		$("#ensureNewSheet").modal("hide");
		$("#unconfirmedChangeNcrDialog").modal("hide");
		$("#newNcrUnconfirmedTable-reflesh").trigger("click");
		clearUnconfirmedChangeNcrDialog();
	}
}


/**
 * 绑定作废开具项界面确定按钮点击事件
 * @returns
 */
function bindAbandonSubmitNewNcrBtn(){
	$("#unconfirmedAbandomNcrDialogSubmitBtn").on("click",function(){
		var selectedList = newNcrUnconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			return;
		}
		
		var id = selectedList[0]["id"];
		var reason = $("#abandonReason").val().trim();
		if(reason == null || reason === ''){
			swal("", "信息不完整", "error");
			return;
		}
		
		swal({
			title: "",
			text: "是否作废开具项?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				reason = stripencodescript(reason);
				var isSuccess = alertResult(sendAjax("/TBNCRMS/abandonNewNcrInfo",{'id':id,'reason':reason}));
				if(isSuccess){
					$("#unconfirmedAbandomNcrDialog").modal("hide");
					$("#newNcrUnconfirmedTable-reflesh").trigger("click");
					clearUnconfirmedAbandomNcrDialog();
				}
			}else{
				return;
			}
		});
	
	});
}
/**
 * 绑定作废按钮点击事件
 * @returns
 */
function bindAbandonNewNcrBtn(){
	$("#abandonNewNcrBtn").on("click",function(){
		var selectedList = newNcrUnconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var activitiStatus = selectedList[0]["activitiStatus"];
		// 只有被驳回状态的开具项可以作废
		if(activitiStatus !== 1){
			swal("", "当前选中的开具项不允许被作废", "error");
			return;
		}
		
		var currUser = $("#currentUser").text();
		var createUser = selectedList[0]["data"]["createPersion"]["name"];
		if(currUser!==createUser){
			swal("", "您不是此开具项的开具人", "warning");
			return;
		}
		
		var serialNumber = selectedList[0]["serialNumber"];
		$("#unconfirmedAbandomNcrDialogSerialNumber").text(serialNumber);
		$("#unconfirmedAbandomNcrDialog").modal("show");
	});
}
/**
 * 绑定下载按钮点击事件
 * @returns
 */
function bindUnconfirmedTabDownloadBtn(){
	$("#unconfirmedTabDownloadBtn").on("click",function(){
		var selectedList = newNcrUnconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		downloadFile(fileId);
	});
}
/**
 * 绑定修改按钮点击事件
 * @returns
 */
function bindNcrInfoChangeBtn(){
	$("#ncrInfoChangeBtn").on("click",function(){
		$("#unconfirmedChangeNcrDialogUploadDiv").hide();
		$("#unconfirmedChangeNcrDialogDescriptionGroup").hide();
		$("#unconfirmedChangeNcrDialogAuditObjectDiv").hide();
		
		var selectedList = newNcrUnconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var activitiStatus = selectedList[0]["activitiStatus"];
		// 只有被驳回状态的开具项可以修改
		if(activitiStatus !== 1){
			swal("", "当前选中的开具项不允许被修改", "error");
			return;
		}
		
		var ncrInfo = selectedList[0];
		
		var currUser = $("#currentUser").text();
		var createUser = ncrInfo["data"]["createPersion"]["name"];
		if(currUser!==createUser){
			swal("", "您不是此开具项的开具人", "warning");
			return;
		}
		
		$("#unconfirmedChangeNcrDialogTurndownReasion").val(ncrInfo["turndownReason"]);
		$("#unconfirmedChangeNcrDialogDepartment").text(ncrInfo["departmemt"]);
		$("#unconfirmedChangeNcrDialog").modal("show");
	});
}

/**
 * 清空开具不符合项界面
 * @returns
 */
function clearUnconfirmedNewNcrDialog(){
	$("#unconfirmedNewNcrDialogForm")[0].reset();
	$("#unconfirmedNewNcrDialogUploadFileId").val("");
	$("#ModalnewNcrTimeVal").val("");
	initTypeSelect("unconfirmedNewNcrDialogTypeSelect");
	$(".fileinput-remove-button").trigger("click");
}
/**
 * 清空修改不符合项界面
 * @returns
 */
function clearUnconfirmedChangeNcrDialog(){
	$("#unconfirmedChangeNcrDialogForm")[0].reset();
	initTypeSelect("unconfirmedChangeNcrDialogType");
	$(".fileinput-remove-button").trigger("click");

}
/**
 * 清空作废开具项界面
 * @returns
 */
function clearUnconfirmedAbandomNcrDialog(){
	$("#unconfirmedAbandomNcrDialogForm")[0].reset();
}

function initNewNcrModal(){
	clearUnconfirmedNewNcrDialog();
	$("#unconfirmedNewNcrDialogDescriptionGroup").hide();
	$("#unconfirmedNewNcrUploadGroup").hide();
	$("#unconfirmedNewNcrDialogDepartmentGroup").hide();
	$("#unconfirmedNewNcrDialogAuditObjectDiv").hide();
}