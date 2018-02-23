$(document).ready(function(){
	bindSourceSelect("sourceSelect");
	initTimeSerach("newNcrTime");
	bindTypeSelect("sourceSelect","typeSelect");
	bindHandleNcrListReset();
	initTimeSerach("NcrClosePlanTime");
	bindSearchDisplay();
	initCreatePersionSelect("ncrstarter");
	isNumValid("serialNumberInput");
	initDepartmentSelect("handledepartment");

});

function bindHandleNcrListReset(){
	$("#reset").click(function(){
		$("#serial").val("");
		$("#resource").val("-1");
		$("#ncrtype").val("-1");
		$("#starter").val("-1");
		$("#newNcrTime").val("");
	});
}

$("#ClosePlanTimelabel").show();
$("#NcrClosePlanTime").show();
$("#startTime").hide();
$("#newNcrTime").hide();

function bindSearchDisplay(){
	$("#execute").click(function(){
		$("#ClosePlanTimelabel").show();
		$("#NcrClosePlanTime").show();
		$("#handledepartmentDiv").show();
		$("#startTime").hide();
		$("#newNcrTime").hide();

		$("#unconfirmedSearchDiv").hide();
		$("#unanalyzeSearchDiv").hide();
		$("#executeSearchDiv").show();
	});
	$("#unconfirmedTab").click(function(){
		$("#ClosePlanTimelabel").hide();
		$("#NcrClosePlanTime").hide();
		$("#handledepartmentDiv").hide();
		$("#startTime").show();
		$("#newNcrTime").show();
		
		$("#unconfirmedSearchDiv").show();
		$("#unanalyzeSearchDiv").hide();
		$("#executeSearchDiv").hide();
	});
	$("#unreplyedTab").click(function(){
		$("#ClosePlanTimelabel").hide();
		$("#NcrClosePlanTime").hide();
		$("#handledepartmentDiv").hide();
		$("#startTime").show();
		$("#newNcrTime").show();
		
		$("#unconfirmedSearchDiv").hide();
		$("#unanalyzeSearchDiv").show();
		$("#executeSearchDiv").hide();
	});
}

function clearSearchInput(){
	$("#serialNumberInput").val("");
	$("#sourceSelect").val("-1")
	$("#typeSelect").val("-1")
	$("#ncrdepartment").val("-1")
	$("#ncrstarter").val("-1")
	$("#handledepartment").val("-1")
	$("#newNcrTime").val("");
	$("#NcrClosePlanTime").val("");
	initTypeSelect("typeSelect");
}