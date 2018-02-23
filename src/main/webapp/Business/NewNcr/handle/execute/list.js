$(document).ready(function(){
});


var executingTable = new TableView('executingTable');
executingTable.url = '/TBNCRMS/getMeasureListByDepartment';
executingTable.initHeader([
	{id:'ico',name:'',width:2,align:'center'},
	{id:'marker',width:2,align:'right',type:'checkbox'},
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'measureNumber',name:'措施编号',width:6,align:'center'},
	{id:'serialNumber',name:'流水号/编号',width:17,align:'center'},
	{id:'ncrresource',name:'开具项来源',width:12,align:'center'},//漏了
	{id:'ncrtype',name:'开具项类型',width:10,align:'center'},
	{id:'department',name:'责任部门',width:8,align:'center'},
	{id:'createPersion',name:'开具人',width:6,align:'center'},
	{id:'planFinishTime',name:'措施计划完成日期',width:10,align:'center'},
	{id:'responsiblePerson',name:'内部处理人',width:8,align:'center'},
	{id:'mesureResult',name:'措施判定',width:8,align:'center'},
	{id:'describe',name:'详情',width:8,align:'center'}
]);
executingTable.ajaxCallback = function(data){
	executingTable.clear();
	var len = data["rows"].length;
	// 当前登录用户的部门
	var currUserDepartmentId = data["department"]["id"];
	for(var i=0;i<len;i++){
		var txfile = data["rows"][i]["ncrInfo"]["lastFile"];
		executingTable.add({
			ico:getExecutingTableIco(data["rows"][i]),
			index: i+1, 
			fileId : txfile==null?null:txfile["id"],
			ncrAnalyzeId : data["rows"][i]["ncrAnalyzeId"],
			measureNumber : data["rows"][i]["id"],
			serialNumber : data["rows"][i]["ncrInfo"]["serialNumber"],
			ncrInfoId : data["rows"][i]["ncrInfo"]["id"],
			ncrresource : data["rows"][i]["ncrInfo"]["ncrForm"]["source"]["sourceName"],
			ncrtype : data["rows"][i]["ncrInfo"]["ncrForm"]["type"]["type"],
			department : data["rows"][i]["department"]["departmentName"],
			createPersion : data["rows"][i]["ncrInfo"]["createPersion"]["name"],
			planFinishTime : getFormatDate(data["rows"][i]["planFinishTime"]),
			responsiblePerson : data["rows"][i]["responsiblePerson"]["name"],
			mesureResult : data["rows"][i]["lastCheckRecord"]==null?null:data["rows"][i]["lastCheckRecord"]["measureJudgeContext"],
			describe: '<a style="text-decoration:none;" onclick=showMeasuresDetailDialog(' + (i+1) + ') href="javascript:void(0);">查看</a>',
			planMeasure: data["rows"][i]["planMeasure"],
			addClass:data["rows"][i]["hasDelay"]==='y'?"danger":"",
			data:data["rows"][i]
		});
	}
	bindExecutingImageMessage();
};
executingTable.clearQueryComp = function(){
	clearSearchInput();
};
executingTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
executingTable.render();

function getExecutingTableIco(measure){
	if(measure["hasChanged"] === "y"){
		return '<span class="TXTableIcon-flag glyphicon glyphicon-flag"></span>';
	};
}
/**
 * 给图标添加悬浮气泡提示
 * @returns
 */
function bindExecutingImageMessage(){
	$(".glyphicon-flag").webuiPopover({
		placement:'top',
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

// 上传证据的表格
var evidenceDialogTable = new TableView('evidenceDialogTable');
evidenceDialogTable.url = '';
evidenceDialogTable.showPageComp = false;
evidenceDialogTable.initHeader([
	{id:'index',name:'序号',width:10,align:'center',key:true},
	{id:'evidenceFileName',name:'证据文件名称',width:70,align:'center'},
	{id:'removeFile',name:'操作',width:20,align:'center'}
]);
evidenceDialogTable.ajaxCallback = function(data){
};
evidenceDialogTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
evidenceDialogTable.render();

//涉及部门措施实施情况的表格
var allMeasuresDetailDialogTable = new TableView('TXAllMeasuresDetailDialogTable');
allMeasuresDetailDialogTable.url = '';
allMeasuresDetailDialogTable.showPageComp = false;
allMeasuresDetailDialogTable.initHeader([
	{id:'index',name:'序号',width:10,align:'center',key:true},
	{id:'measureNumber',name:'措施编号',width:20,align:'center'},
	{id:'department',name:'涉及部门',width:50,align:'center'},
	{id:'describe',name:'措施详情',width:20,align:'center'},
]);
allMeasuresDetailDialogTable.ajaxCallback = function(data){
};
allMeasuresDetailDialogTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
allMeasuresDetailDialogTable.render();

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