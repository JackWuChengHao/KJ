$(document).ready(function(){
	bindConfirmedBtn();
	bindTrundownBtn();
	bindnHandlerUncomfirmDownloadBtn();
	bindRefusedInputBtn();
});

/**
 * 绑定认定按钮点击事件
 * @returns
 */
function bindConfirmedBtn(){
	$("#ncrHandlerComfirmBtn").on('click',function(){
		var selectedList = unconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		swal({
			title: "",
			text: "是否认定该开具项?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				ncrHandlerComfirmfinal();
			}else{
				return;
			}
		});
	});
}

function ncrHandlerComfirmfinal(){
	var selectedList = unconfirmedTable.getSelected();
	if(selectedList.length !== 1){
		swal("","请选择一条记录","warning");
		return;
	}
	
	var id = selectedList[0]["id"];
	var isSuccess = alertResult(sendAjax("/webapp/comfiredHandleNcrInfo",{'id':id}));
	
	if(isSuccess){
		$("#unconfirmedTable-reflesh").trigger("click");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
		$("#executingTable-reflesh").trigger("click");
	}
}

/**
 * 控制驳回的模态框
 * @returns
 */

function bindRefusedInputBtn(){
	$("#ncrHandlerTurndownBtn").click(function(){
		var selectedList = unconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			swal("", "请选择一条记录", "warning");
			return;
		}

		if(selectedList[0]["ncrtype"]==='原处置单'){
			swal("", "原处置单不可驳回", "warning");
			return;
		}
		$("#refuseNcrDialog").modal("show");
	});
}


/**
 * 绑定驳回界面确定按钮点击事件
 * @returns
 */
function bindTrundownBtn(){
	$("#refuseNcrDialogSubmitBtn").on('click',function(){
		if(judgeNullAndEmpty("turndownReason") === 0){
			swal("","请填写驳回原因","error");
			return;
		};
		swal({
			title: "",
			text: "是否驳回该开具项?",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#223a5e",
			confirmButtonText: "是",
			cancelButtonText: "否",
			closeOnConfirm: false}, 
		function(confirm){
			if(confirm){
				bindTrundownBtnfinal();
			}else{
				return;
			}
		});
	});
}

function bindTrundownBtnfinal(){
	var selectedList = unconfirmedTable.getSelected();
	if(selectedList.length !== 1){
		return;
	}
	var reason = $("#turndownReason").val().trim();
	if(reason == null || reason === ''){
		swal("", "请填写驳回原因", "error");
		return;
	}
	reason = stripencodescript(reason);
	var id = selectedList[0]["id"];
	var isSuccess = alertResult(sendAjax("/webapp/turnDownHandleNcrInfo",{'id':id,'reason':reason}));
	if(isSuccess){
		clearRefuseNcrDialog();
		$("#refuseNcrDialog").modal("hide");
		$("#unconfirmedTable-reflesh").trigger("click");
		$("#newNcrUnreplyedTable-reflesh").trigger("click");
		$("#executingTable-reflesh").trigger("click");
	}
}

/**
 * 绑定下载按钮点击事件
 * @returns
 */
function bindnHandlerUncomfirmDownloadBtn(){
	$("#ncrHandlerUncomfirmDownloadBtn").on("click",function(){
		var selectedList = unconfirmedTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		downloadFile(fileId);
	});
}
/**
 * 清空驳回界面
 * @returns
 */
function clearRefuseNcrDialog(){
	$("#refuseNcrDialogForm")[0].reset();
}