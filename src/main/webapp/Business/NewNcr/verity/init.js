$(document).ready(function(){
	bindVerityDownloadBtn();
	bindVerityBtn();
	bindNewCheckDialogSubmitBtn();
	bindValidCheckDialogAddBtn();
	clearUploadController();
});

function bindVerityDownloadBtn(){
	$("#verityDownloadBtn").on("click",function(){
		var selectedList = validCheckTable.getSelected();
		if(selectedList.length !== 1){
			swal("", "请选择一条记录", "warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		downloadFile(fileId);
	});
}

function initValidTablePopover(){
	$('a[id^="validTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = validCheckTable.get(rowid);
		var content = row["describeContext"];
		
		$(this).webuiPopover({
			placement:'left',
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

function bindVerityBtn(){
	$("#verityBtn").on("click",function(){
		var selectedList = validCheckTable.getSelected();
		if(selectedList.length !== 1){
			swal("","请选择一条记录","warning");
			return;
		}
		var createPerson = selectedList[0]["createPerson"];
		var currentUser = $("#currentUser").html();
		if(createPerson !== currentUser){
			swal("", "您不是此开具项的开具人", "warning");
			return;
		}
		var fileId = selectedList[0]["fileId"];
		$("#validCheckDialogNcrInfoId").val(selectedList[0]["id"]);
		$("#validCheckDialogNumber").text(selectedList[0]["serialNumber"]);
		initValidCheckDialogTable(selectedList[0]["id"]);
		$("#validCheckDialog").modal("show");
	});
}
/**
 * 有效性验证-验证按钮点击事件
 * @returns
 */
function bindValidCheckDialogAddBtn(){
	$("#validCheckDialogAddBtn").on("click",function(){
		var count = validCheckDialogTable.rowCount()+1;
		$("#newCheckIndex").text(count);
		$("#newCheck").modal("show");
	});
}

/**
 * 第X次有效性验证界面确定按钮点击事件
 * @returns
 */
function bindNewCheckDialogSubmitBtn(){
	$("#newCheckDialogSubmitBtn").on("click",function(){
		var ncrId = Number($("#validCheckDialogNcrInfoId").val());
		var isLast = $("#newCheckDialogIsLast").prop("checked");
		var fileId = $("#newCheckDialogUploadFile").val();
		
		var wordData = sendAjax("/webapp/readWord",{"fileId":fileId,"code":3,"ncrId":ncrId});
		if(wordData["code"] !== 0){
			swal("提示", wordData["msg"], "error");
			return;
		}

		validCheckCommitDialogTable.clear();
		var record = wordData["data"];
		validCheckCommitDialogTable.add({
			index: 1, 
			checkPersion:record["checkPersion"]["name"],
			checkTime:getFormatDate(record["checkTime"]),
			describe:record["checkRecord"]
		});
		$("#TXValidCheckCommitDialogNumber").text($("#validCheckDialogNumber").text());
		
		if(isLast){
			wordData = sendAjax("/webapp/readWord",{"fileId":fileId,"code":4,"ncrId":ncrId});
			if(wordData["code"] !== 0){
				swal("提示", wordData["msg"], "error");
				return;
			}
			var measureJudgeCode = wordData["data"]["ncrEntityMeasureJudgeCode"];
			if(measureJudgeCode === 0){
				$("#TXValidCheckCommitDialogCheck0").prop("checked",true);
				$("#TXValidCheckCommitDialogCheck1").prop("checked",false);
				$("#TXValidCheckCommitDialogCheck2").prop("checked",false);
			} else if(measureJudgeCode === 1){
				$("#TXValidCheckCommitDialogCheck0").prop("checked",false);
				$("#TXValidCheckCommitDialogCheck1").prop("checked",true);
				$("#TXValidCheckCommitDialogCheck2").prop("checked",false);
			} else if(measureJudgeCode === 2){
				$("#TXValidCheckCommitDialogCheck0").prop("checked",false);
				$("#TXValidCheckCommitDialogCheck1").prop("checked",false);
				$("#TXValidCheckCommitDialogCheck2").prop("checked",true);
			}
			$("#dialogEntityMeasureInvalidWay").val(wordData["data"]["ncrEntityMeasureJudgeInvalidWay"]);
			$("#finfishCheckDiv").show();
		} else {
			$("#finfishCheckDiv").hide();
		}
		$("#TXValidCheckCommitDialog").modal("show");
	});
}

function clearNewCheckForm(){
	$("#newCheckForm")[0].reset();
	$(".fileinput-remove-button").trigger("click");
	$("#newCheckDialogUploadFile").val("");
}
/**
 * 开具项有效性验证-信息确认的取消按钮点击事件
 * @returns
 */
function clickValidCheckCommitDialogCancel(){
	$("#TXValidCheckCommitDialog").modal("hide");
	$(".fileinput-remove-button").trigger("click");
	clearNewCheckForm();
}
/**
 * 开具项有效性验证-信息确认的确定按钮点击事件
 * @returns
 */
function clickValidCheckCommitDialogSubmit(){
	var ncrId = Number($("#validCheckDialogNcrInfoId").val());
	var isLast = $("#newCheckDialogIsLast").prop("checked");
	var fileId = $("#newCheckDialogUploadFile").val()
	var isSuccess = alertResult(sendAjax("/webapp/insertValidCheck",{"ncrId":ncrId,"fileId":fileId,"isLast":isLast}));
	
	if(isSuccess){
		clearNewCheckForm();
		$("#newCheck").modal("hide");
		$("#TXValidCheckCommitDialog").modal("hide");
		$("#validCheckTable-reflesh").trigger("click");
		if(!isLast){
			$("#validCheckDialog").modal("show");
			initValidCheckDialogTable(ncrId);
		} else {
			$("#validCheckDialog").modal("hide");
		}
	}
}
/**
 * 清空搜索栏
 * @returns
 */
function clearSearchInput(){
	$("#serialNumberInput").val("");
	$("#sourceSelect").val("-1")
	$("#typeSelect").val("-1")
	$("#ncrdepartment").val("-1")
	$("#ncrstarter").val("-1")
	$("#newNcrTime").val("");
	initTypeSelect("typeSelect");
}