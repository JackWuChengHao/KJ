$(document).ready(function(){
});

var unanalyzeTable = new TableView('newNcrUnreplyedTable');
unanalyzeTable.url = '/webapp/getUnanalyzeHandleNcrInfoList';
unanalyzeTable.initHeader([
	{id:'ico',name:'',width:2,align:'center'},
	{id:'marker',width:2,align:'right',type:'radio'},
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'serialNumber',name:'流水号/编号',width:19,align:'center'},
	{id:'ncrsource',name:'开具项来源',width:15,align:'center'},
	{id:'ncrtype',name:'开具项类型',width:15,align:'center'},
	{id:'createPersion',name:'开具人',width:8,align:'center'},
	{id:'issueTime',name:'开具日期',width:8,align:'center'},
	{id:'pointPersion',name:'内部处理人',width:10,align:'center'},
	{id:'describe',name:'不符合项描述',width:10,align:'center'}
]);
unanalyzeTable.ajaxCallback = function(data){
	unanalyzeTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		var txfile = data["rows"][i]["lastFile"];
		var pointPersion = data["rows"][i]["pointPersion"] == null?'':data["rows"][i]["pointPersion"]["name"];
		unanalyzeTable.add({
			ico:getUnanalyzeTableIco(data["rows"][i]),
			index: i+1, 
			id : data["rows"][i]["id"],
			fileId : txfile==null?null:txfile["id"],
			activitiStatus:data["rows"][i]["activitiStatus"],
			auditContext:data["rows"][i]["ncrAnalyze"]==null?null:data["rows"][i]["ncrAnalyze"]["auditContext"],
			serialNumber : data["rows"][i]["serialNumber"],
			ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
			ncrtypeId: data["rows"][i]["ncrForm"]["type"]["id"],
			ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
			createPersion: data["rows"][i]["createPersion"]["name"],
			departmemt: data["rows"][i]["departmemt"]["departmentName"], 
			issueTime: getFormatDate(data["rows"][i]["createTime"]), 
			pointpersonId:data["rows"][i]["pointPersion"]["id"],
			pointPersion: pointPersion,
			describe: '<a style="text-decoration:none;" id="unanalyzeTableDescribe-' + (i+1) + '" href="javascript:void(0);"">查看</a>',
			describeContext: data["rows"][i]["ncrForm"]["describe"],
			problemType:data["rows"][i]["ncrAnalyze"]==null?null:data["rows"][i]["ncrAnalyze"]["problemType"],
			addClass:data["rows"][i]["ncrForm"]["hasDelay"]==='y'?"danger":"",
			hasDelay:data["rows"][i]["ncrForm"]["hasDelay"]==='y',
			analyzeId:data["rows"][i]["ncrAnalyze"]==null?null:data["rows"][i]["ncrAnalyze"]["id"],
			analyzeContext:data["rows"][i]["ncrAnalyze"]==null?null:data["rows"][i]["ncrAnalyze"]["analyzeContext"]
		});
	}
	bindImageMessage();
	initUnanalyzeTablePopover();
};
unanalyzeTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
unanalyzeTable.clearQueryComp = function(){
	clearSearchInput();
};
unanalyzeTable.render();

function getUnanalyzeTableIco(ncrInfo){
	var activitiStatus = ncrInfo["activitiStatus"]
	if(activitiStatus === 8){
		return '<img class="img img-refuse" alt="提示" src="/webapp/imgs/u2295.png">';
	};
	if(activitiStatus === 6){
		return '<img class="img img-finish" alt="提示" src="/webapp/imgs/u2356.png">';
	}
	if(activitiStatus === 4){
		return '<img class="img img-audit" alt="提示" src="/webapp/imgs/u2236.png">';
	}
	if(activitiStatus === 3){
		return '<img class="img img-new" alt="提示" src="/webapp/imgs/u95.png">';
	}
}

/**
 * 给图标添加悬浮气泡提示
 * @returns
 */
function bindImageMessage(){
	$(".img-new").webuiPopover({
		placement:'top',
		html:true,
		content:"部门新被开具的不符合项",
		style:"",
		animation:"fade",
		delay:{
			show:null,
			hide:300
		},
		trigger:"hover"
	});
	$(".img-audit").webuiPopover({
		placement:'top',
		html:true,
		content:"部门制定的原因和措施正在被部门经理审核",
		style:"",
		animation:"fade",
		delay:{
			show:null,
			hide:300
		},
		trigger:"hover"
	});
	$(".img-refuse").webuiPopover({
		placement:'top',
		html:true,
		content:"部门提交的原因和措施被开具人打回修改",
		style:"",
		animation:"fade",
		delay:{
			show:null,
			hide:300
		},
		trigger:"hover"
	});
	$(".img-finish").webuiPopover({
		placement:'top',
		html:true,
		content:"可以定稿",
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
 * 给不符合项描述添加悬浮气泡提示
 * @returns
 */
function initUnanalyzeTablePopover(){
	$('a[id^="unanalyzeTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = unanalyzeTable.get(rowid);
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

// 原因分析和措施制定-措施表
var analyzeDialogEvidenceTable = new TableView('analyzeDialogEvidenceTable');
analyzeDialogEvidenceTable.showPageComp=false;
analyzeDialogEvidenceTable.initHeader([
	{id:'index',name:'序号',width:10,align:'center',key:true},
	{id:'department',name:'责任部门',width:10,align:'center'},
	{id:'planFinishTime',name:'计划完成时间',width:15,align:'center'},
	{id:'planMeasure',name:'计划措施',width:65,align:'center'}
]);
analyzeDialogEvidenceTable.ajaxCallback = function(data){};
analyzeDialogEvidenceTable.ajaxFailCallback = function(){};
analyzeDialogEvidenceTable.render();

// 原因分析和措施制定审核-措施表
var analyzeAuditDialogMeasureTable = new TableView('analyzeAuditDialogMeasureTable');
analyzeAuditDialogMeasureTable.showPageComp=false;
analyzeAuditDialogMeasureTable.initHeader([
	{id:'index',name:'序号',width:10,align:'center',key:true},
	{id:'department',name:'责任部门',width:10,align:'center'},
	{id:'planFinishTime',name:'计划完成时间',width:15,align:'center'},
	{id:'planMeasure',name:'计划措施',width:65,align:'center'}
]);
analyzeAuditDialogMeasureTable.ajaxCallback = function(data){};
analyzeAuditDialogMeasureTable.ajaxFailCallback = function(){};
analyzeAuditDialogMeasureTable.render();