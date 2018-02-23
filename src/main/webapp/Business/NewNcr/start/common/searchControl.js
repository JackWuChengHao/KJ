$(document).ready(function(){
	bindSearchDisplay();
	initTimeSerach("newNcrTime");
	initTimeSerachH("ModalnewNcrTime");
	initTimeSerach("planFinishTime");
	bindSourceSelect("sourceSelect");
	bindTypeSelect("sourceSelect","typeSelect");
	initDepartmentSelect("ncrdepartment");
	initCreatePersionSelect("ncrstarter");
	isNumValid("serialNumberInput");
});

/**
 *初始化页面按钮
 */
$("#unconfirmedAndUnreplyedDepartmentSearch").show();
$("#ncrdepartment").show();

/**
 * 发起开具项页面的三个标签显示的搜索栏不同
 * @returns
 */
function bindSearchDisplay(){
	$("#unconfirmedTab").click(function(){
		$("#unconfirmedAndUnreplyedDepartmentSearch").show();
		$("#ncrdepartment").show();

		$("#unconfirmedSearchBtn").show();
		$("#unreplyedSearchBtn").hide();
		$("#unpassedSearchBtn").hide();
		
		$("#planFinishTime").val("");
		$("#newNcrTimeLabel").show();
		$("#newNcrTime").show();
		$("#planFinishTimeLabel").hide();
		$("#planFinishTime").hide();

	});
	$("#unreplyedTab").click(function(){
		$("#unconfirmedAndUnreplyedDepartmentSearch").show();
		$("#ncrdepartment").show();
		
		$("#unconfirmedSearchBtn").hide();
		$("#unreplyedSearchBtn").show();
		$("#unpassedSearchBtn").hide();
		
		$("#planFinishTime").val("");
		$("#newNcrTimeLabel").show();
		$("#newNcrTime").show();
		$("#planFinishTimeLabel").hide();
		$("#planFinishTime").hide();

	});
	$("#unpassedTab").click(function(){
		$("#unconfirmedAndUnreplyedDepartmentSearch").hide();
		$("#ncrdepartment").hide();

		$("#unconfirmedSearchBtn").hide();
		$("#unreplyedSearchBtn").hide();
		$("#unpassedSearchBtn").show();

		$("#newNcrTime").val("");
		$("#newNcrTimeLabel").hide();
		$("#newNcrTime").hide();
		$("#planFinishTimeLabel").show();
		$("#planFinishTime").show();

	});
}
/**
 * 清空搜索栏
 * @returns
 */
function clearSearchInput(){
	$("#serialNumberInput").val("");
	$("#sourceSelect").val("-1");
	$("#typeSelect").val("-1");
	$("#ncrdepartment").val("-1");
	$("#ncrstarter").val("-1");
	$("#newNcrTime").val("");
	$("#planFinishTime").val("");
	initTypeSelect("typeSelect");
}
