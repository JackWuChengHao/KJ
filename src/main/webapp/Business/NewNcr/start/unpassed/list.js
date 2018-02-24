$(document).ready(function(){
	bindNewNcrUnpassedTableSearchButton();
});

	var newNcrUnpassedTable = new TableView('newNcrUnpassedTable');
	newNcrUnpassedTable.url = '/webapp/getUncheckMeasureList';
	newNcrUnpassedTable.initHeader([
		{id:'ico',name:'',width:2,align:'center'},
		{id:'marker',width:2,align:'right',type:'radio'},
		{id:'index',name:'序号',width:4,align:'center',key:true},
		{id:'measureNumber',name:'措施编号',width:6,align:'center'},
		{id:'serialNumber',name:'流水号/编号',width:18,align:'center'},
		{id:'ncrsource',name:'开具项来源',width:12,align:'center'},
		{id:'ncrtype',name:'开具项类型',width:12,align:'center'},
		{id:'department',name:'责任部门',width:8,align:'center'},
		{id:'planFinishTime',name:'措施计划完成日期',width:10,align:'center'},
		{id:'checkTime',name:'验证日期',width:8,align:'center'},
		{id:'mesureResult',name:'措施判定',width:8,align:'center'},
		{id:'createPersion',name:'开具人',width:6,align:'center'},
		{id:'describe',name:'详情',width:6,align:'center'}
	]);
	newNcrUnpassedTable.ajaxCallback = function(data){
		newNcrUnpassedTable.clear();
		var len = data["rows"].length;
		for(var i=0;i<len;i++){
			var txfile = data["rows"][i]["ncrInfo"]["lastFile"];
			newNcrUnpassedTable.add({
				index: i+1, 
				ico:getChangeMeasuresIco(data["rows"][i]),
				id : data["rows"][i]["id"],
				hasChange:data["rows"][i]["hasChanged"] === "y"?true:false,
				fileId : txfile==null?null:txfile["id"],
				measureNumber : data["rows"][i]["id"],
				serialNumber : data["rows"][i]["ncrInfo"]["serialNumber"],
				ncrsource: data["rows"][i]["ncrInfo"]["ncrForm"]["source"]["sourceName"],
				typeId: data["rows"][i]["ncrInfo"]["ncrForm"]["type"]["id"],
				ncrtype: data["rows"][i]["ncrInfo"]["ncrForm"]["type"]["type"],
				department: data["rows"][i]["department"]["departmentName"], 
				planFinishTime: getFormatDate(data["rows"][i]["planFinishTime"]),
				planMeasure:data["rows"][i]["planMeasure"],
				checkTime: data["rows"][i]["lastCheckRecord"]==null?"":getFormatDate(data["rows"][i]["lastCheckRecord"]["checkTime"]), 
				mesureResult: data["rows"][i]["lastCheckRecord"]==null?"":data["rows"][i]["lastCheckRecord"]["measureJudgeContext"], 
				createPersion: data["rows"][i]["ncrInfo"]["createPersion"]["name"], 
				describe:'<a style="text-decoration:none;" onclick=showMeasuresDetailDialog(' + (i+1) + ') href="javascript:void(0);">查看</a>',
				addClass:data["rows"][i]["hasDelay"]==='y'?"danger":"",
				data:data["rows"][i]
			});
		}
		bindChangeMeasureMessage();
	};
	newNcrUnpassedTable.ajaxFailCallback = function(){
		swal("提示", "网络故障", "error");
	};
	newNcrUnpassedTable.clearQueryComp = function(){
		clearSearchInput();
	};
	newNcrUnpassedTable.render();

/**
 *措施变更标志
 *@returns 
 */
function getChangeMeasuresIco(measure){
	if(measure["hasChanged"] === "y"){
		return '<span class="TXTableIcon-flag glyphicon glyphicon-flag"></span>';
	};
}

function bindChangeMeasureMessage(){
	$(".glyphicon-flag").webuiPopover({
		placement:'bottom',
		html:true,
		content:"措施有变更",
		style:"",
		animation:"fade",
		delay:{
			show:null,
			hide:300
		},
		trigger:"hover"
	});
}	
	
/**
 *更新开具项 带验证新开项 的搜索重置
 *@returns 
 */
function bindNewNcrUnpassedTableSearchButton(){
	$("#Tab3TXStartNcrSearchButton").on("click",function(){
		document.getElementById("TXStartNcrForm").reset();
		$("#newNcrUnpassedTable-reflesh").trigger("click");
	});
}

//措施变更表格
var measuresDetailDialogTable = new TableView('TXMeasuresDetailDialogTable');
measuresDetailDialogTable.url = '';
measuresDetailDialogTable.showPageComp = false;
measuresDetailDialogTable.initHeader([
	{id:'index',name:'序号',width:10,align:'center',key:true},
	{id:'file',name:'变更文件',width:60,align:'center'},
	{id:'changeTime',name:'变更时间',width:30,align:'center'},
]);
measuresDetailDialogTable.ajaxCallback = function(data){};
measuresDetailDialogTable.ajaxFailCallback = function(){};
measuresDetailDialogTable.render();