$(document).ready(function(){
});


var validCheckTable = new TableView('validCheckTable');
validCheckTable.url = '/TBNCRMS/getValidCheckNcrInfoList';
validCheckTable.initHeader([
	{id:'marker',width:2,align:'right',type:'radio'},
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'serialNumber',name:'流水号/编号',width:20,align:'center'},
	{id:'ncrsource',name:'开具项来源',width:16,align:'center'},
	{id:'ncrtype',name:'开具项类型',width:16,align:'center'},
	{id:'department',name:'主责部门',width:6,align:'center'},
	{id:'createPerson',name:'开具人',width:8,align:'center'},
	{id:'createTime',name:'开具日期',width:8,align:'center'},
	{id:'expectMeasureValidityTime',name:'计划验证时间',width:8,align:'center'},
	{id:'describe',name:'不符合项描述',width:8,align:'center'},
]);
validCheckTable.ajaxCallback = function(data){
	validCheckTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		var txfile = data["rows"][i]["lastFile"];
		validCheckTable.add({
			index: i+1, 
			id : data["rows"][i]["id"],
			fileId : txfile==null?null:txfile["id"],
			serialNumber : data["rows"][i]["serialNumber"],
			ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
			ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
			department: data["rows"][i]["departmemt"]["departmentName"], 
			createTime: getFormatDate(data["rows"][i]["createTime"]), 
			createPerson:data["rows"][i]["createPersion"]["name"],
			expectMeasureValidityTime: getFormatDate(data["rows"][i]["ncrAnalyze"]["expectMeasureValidityTime"]), 
			describe: '<a style="text-decoration:none;" id="validTableDescribe-' + (i+1) + '" href="javascript:void(0);">查看</a>',
			describeContext: data["rows"][i]["ncrForm"]["describe"],
			createPerson:data["rows"][i]["createPersion"]["name"],
		});
	}
	initValidTablePopover();
};
validCheckTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
validCheckTable.clearQueryComp = function(){
	clearSearchInput();
};
validCheckTable.render();


var validCheckDialogTable;
function initValidCheckDialogTable(ncrId){
	validCheckDialogTable = new TableView('validCheckDialogTable');
	validCheckDialogTable.putOneoffParam("ncrId",ncrId);
	validCheckDialogTable.url = '/TBNCRMS/getValidCheckHistoryByNcrId';
	validCheckDialogTable.showPageComp = false;
	validCheckDialogTable.initHeader([
		{id:'index',name:'序号',width:20,align:'center',key:true},
		{id:'checkPersion',name:'评审人员',width:30,align:'center'},
		{id:'checkTime',name:'评审时间',width:30,align:'center'},
		{id:'describe',name:'详情',width:20,align:'center'}
	]);
	validCheckDialogTable.ajaxCallback = function(data){
		validCheckDialogTable.clear();
		var len = data["rows"].length;
		for(var i=0;i<len;i++){
			validCheckDialogTable.add({
				index: i+1, 
				checkPersion : data["rows"][i]["checkPersion"]["name"],
				checkTime : getFormatDate(data["rows"][i]["checkTime"]),
				describe: '<a id="validCheckDialogTableDescribe-' + (i+1) + '" href="javascript:void(0);">查看</a>',
				describeContent:data["rows"][i]["checkRecord"]
			});
			initModalPopover();
		}
	};
	validCheckDialogTable.ajaxFailCallback = function(){};
	return validCheckDialogTable;
}


/**
 * 给不符合项描述添加悬浮气泡提示
 * @returns
 */
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
			width:"300",
			trigger:"hover",
		});
	});
}

function initModalPopover(){
	$('a[id^="validCheckDialogTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = validCheckDialogTable.get(rowid);
		var content = row["describeContent"];
		content = stripdecodescript(content);
		$(this).webuiPopover({
			placement:'right',
			title:"",
			html:true,
			content:content,
			animation:"fade", 
			delay:{
				show:null,
				hide:300
			},
			width:"300",
			trigger:"hover",
		});
	});
}

// 有效性验证-确认界面的表格
var validCheckCommitDialogTable = new TableView('validCheckCommitDialogTable');
validCheckCommitDialogTable.showPageComp = false;
validCheckCommitDialogTable.initHeader([
	{id:'index',name:'序号',width:10,align:'center',key:true},
	{id:'checkPersion',name:'评审人员',width:20,align:'center'},
	{id:'checkTime',name:'评审时间',width:20,align:'center'},
	{id:'describe',name:'评审记录',width:50,align:'center'}
]);
validCheckCommitDialogTable.ajaxCallback = function(data){};
validCheckCommitDialogTable.ajaxFailCallback = function(){};