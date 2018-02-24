$(document).ready(function(){
	bindSourceSelect("sourceSelect2");
	bindTypeSelect("sourceSelect2","typeSelect2");
	bindUnreplyedDownloadBtn();
	bindUnreplyedAuditPassBtn();
	bindUnreplyedAuditUnpassBtn();
	bindUnreplyeUnpassDialogSubmitBtn();
	bindUnreplyedSwitchBtn();
	unreplyClearBtn();
});
/**
 * 绑定下载按钮点击事件
 * @returns
 */
function bindUnreplyedDownloadBtn(){
	$("#unreplyedDownloadBtn").on("click",function(){
		var selectedList = newNcrUnreplyedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		downloadFile(fileId);
	});
}

/**
 * 审核通过按钮点击事件
 * @returns
 */
function bindUnreplyedAuditPassBtn(){
	$("#unreplyedAuditPassBtn").on("click",function(){
		var selectedList = newNcrUnreplyedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		if(selectedList[0]["activitiStatus"] === 3 || selectedList[0]["activitiStatus"] === 4
			|| selectedList[0]["activitiStatus"] === 8 || selectedList[0]["activitiStatus"] === 9){
			swal("","请等待主责部门回复后进行审核","warning");
			return;
		}
		var ncrInfo = selectedList[0];
		
		var currUser = $("#currentUser").text();
		var createUser = selectedList[0]["data"]["createPersion"]["name"];
		if(currUser!==createUser){
			swal("", "您不是该开具项的开具人", "warning");
			return;
		}
		
		swal({
			title:"",
			text:"是否确定此开具项审核通过",
			type:"info",
			allowEscapeKey:true,
			allowOutsideClick:true,
			showCancelButton:true,
			cancelButtonText:"取消",
			showConfirmButton:true,
			confirmButtonText:"通过",
			closeOnConfirm:false,
			closeOnCancel:true,
		},
		function(isConfirm){
			if(isConfirm === true){
				commitAuditResult(ncrInfo["id"],0);
			}
		}
		);
	});
}

function showNcrReasonAndMessage(rowIndex){
	var ncrInfo = newNcrUnreplyedTable.getDataSource()[rowIndex];
	initReasonsAndMeasuresDetailDialogTable(ncrInfo["ncrAnalyzeId"]);
	initReasonsAndMeasuresDetailDialogTable(ncrInfo["ncrAnalyzeId"]);
	$("#TXReasonsAndMeasuresDetailDialogDescribe").text(ncrInfo["data"]["ncrForm"]["describe"]);
	$("#reasonsAndMeasuresDetailDialogReason").text(ncrInfo["analyzeContext"]);
	$("#TXReasonsAndMeasuresDetailDialog").modal("show");
}

function initReasonsAndMeasuresDetailDialogTable(ncrAnalyzeId){
	var dialogTable = new TableView('reasonsAndMeasuresDetailDialogTable');
	dialogTable.putQueryParam("id",ncrAnalyzeId);
	dialogTable.url = '/webapp/getMeasureListByAnalyzeId';
	dialogTable.showPageComp = false;
	dialogTable.initHeader([
	                        {id:'index',name:'序号',width:10,align:'center',key:true},
	                        {id:'departmemt',name:'责任部门',width:20,align:'center'},
	                        {id:'describe',name:'计划措施',width:70,align:'center'}
	                        ]);
	dialogTable.ajaxCallback = function(data){
		dialogTable.clear();
		var len = data["rows"].length;
		for(var i=0;i<len;i++){
			dialogTable.add({
				index: i+1, 
				id : data["rows"][i]["id"],
				departmemt: data["rows"][i]["department"]["departmentName"], 
				describe:data["rows"][i]["planMeasure"]
			});
		}
	};
	dialogTable.ajaxFailCallback = function(){
		swal("提示", "网络故障", "error");
	};
	dialogTable.render();
}
/**
 * 审核不通过按钮点击事件
 * @returns
 */
function bindUnreplyedAuditUnpassBtn(){
	$("#unreplyedAuditUnpassBtn").on("click",function(){
		var selectedList = newNcrUnreplyedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		if(selectedList[0]["activitiStatus"] === 3 || selectedList[0]["activitiStatus"] === 4
			|| selectedList[0]["activitiStatus"] === 8 || selectedList[0]["activitiStatus"] === 9){
			swal("","请等待主责部门回复后进行审核","warning");
			return;
		}
		var ncrInfo = selectedList[0];

		var currUser = $("#currentUser").text();
		var createUser = selectedList[0]["data"]["createPersion"]["name"];
		if(currUser!==createUser){
			swal("", "你不是该开具项的开具人", "warning");
			return;
		}
		
		$("#unreplyeUnpassDialogSerialNumber").text(ncrInfo["serialNumber"]);
		$("#unreplyeUnpassDialog").modal("show");
	});

}
function bindUnreplyeUnpassDialogSubmitBtn(){
	$("#unreplyeUnpassDialogSubmitBtn").on("click",function(){
		if(judgeNullAndEmpty("unreplyeUnpassDialogAudit") === 0){
			swal("","请填写审核意见","error");
			return;
		};
		swal({
			title: "",
			text: "是否确定此开具项审核不通过?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
			function(confirm){
				if(confirm){
					UnreplyeUnpassDialogSubmitfinal();
				}else{
					return;
				}
			});
	});
}

function UnreplyeUnpassDialogSubmitfinal(){
	var selectedList = newNcrUnreplyedTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	var ncrInfo = selectedList[0];
	var ncrId = ncrInfo["id"];
	var auditContext = stripencodescript($("#unreplyeUnpassDialogAudit").val().trim());
	commitAuditResult(ncrId,1,auditContext);
}


function commitAuditResult(ncrId,result,auditContext){
	auditContext = stripencodescript(auditContext);
	var isSuccess = alertResult(sendAjax("/webapp/auditNcrMeasure",
			{'ncrId':ncrId,'result':result,'auditContext':auditContext}));
	if(isSuccess){
		clearUnreplyeUnpassDialogForm();
		$("#unreplyeUnpassDialog").modal("hide");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
	}
}

function clearUnreplyeUnpassDialogForm(){
	$("#unreplyeUnpassDialogForm")[0].reset();
}


/**
 * 绑定切换按钮 
 */
function bindUnreplyedSwitchBtn(){
	$("#unreplyedSwitchBtn").on("click",function(){	
		var now_content = $("#unreplyedSwitchBtn").val();
		switch(now_content){
		case "显示全部":
			$("#Select").val(0);
			$("#unreplyedSwitchBtn").val("只显示未审核");
			break;
		case "只显示未审核":
			$("#Select").val(1);
			$("#unreplyedSwitchBtn").val("只显示未回复");
			break;
		case "只显示未回复":
			$("#Select").val(-1);
			$("#unreplyedSwitchBtn").val("显示全部");
			break;
		default:
			$("#Select").val(-1);
			$("#unreplyedSwitchBtn").val("只显示未审核");
			break;
		}
		$("#UnreplyedSearch").trigger("click");
	});
}

/**
 * 重置按钮添加操作
 */
function unreplyClearBtn(){
	$("#UnreplyedReset").on("click",function(){
		$("#Select").val(0);
		$("#unreplyedSwitchBtn").val("只显示未审核");
	});
	
}