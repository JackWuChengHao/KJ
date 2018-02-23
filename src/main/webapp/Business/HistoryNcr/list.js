$(document).ready(function(){
});

var historyNcrTable = new TableView('historyNcrTable');
historyNcrTable.url = '/TBNCRMS/getHistoryNcrInfoList';
historyNcrTable.initHeader([
	{id:'marker',width:2,align:'right',type:'radio'},
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'serialNumber',name:'流水号/编号',width:18,align:'center'},
	{id:'ncrsource',name:'开具项来源',width:15,align:'center'},
	{id:'ncrtype',name:'开具项类型',width:14,align:'center'},
	{id:'createPersion',name:'开具人',width:6,align:'center'},
	{id:'departmemt',name:'主责部门',width:8,align:'center'},
	{id:'issueTime',name:'开具日期',width:8,align:'center'},
	{id:'closeTime',name:'关闭日期',width:8,align:'center'},
	{id:'effect',name:'措施有效性',width:8,align:'center'},
	{id:'describe',name:'不符合项描述',width:9,align:'center'}
]);
historyNcrTable.ajaxCallback = function(data){
	historyNcrTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		var txfile = data["rows"][i]["lastFile"];
		var entityMeasureValidityJudge = data["rows"][i]["ncrAnalyze"] == null?null:data["rows"][i]["ncrAnalyze"]["entityMeasureValidityJudge"];
		var entityMeasureValidityJudgeShow = '<span class="glyphicon glyphicon-ban-circle"></span>';
		if(entityMeasureValidityJudge===0){
			entityMeasureValidityJudgeShow = "措施有效";
		} else if(entityMeasureValidityJudge===1){
			entityMeasureValidityJudgeShow = "实施基本有效";
		} else if(entityMeasureValidityJudge===2){
			entityMeasureValidityJudgeShow = "措施无效";
		}
		historyNcrTable.add({
			index: i+1, 
			id : data["rows"][i]["id"],
			fileId : txfile==null?null:txfile["id"],
			serialNumber : data["rows"][i]["serialNumber"],
			ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
			ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
			createPersion: data["rows"][i]["createPersion"]["name"], 
			departmemt: data["rows"][i]["departmemt"]["departmentName"], 
			issueTime: getFormatDate(data["rows"][i]["createTime"]), 
			closeTime: getFormatDate(data["rows"][i]["closeTime"]), 
			effect: entityMeasureValidityJudgeShow, 
			describeContext: data["rows"][i]["ncrForm"]["describe"],
			describe: '<a style="text-decoration:none;" id="HistoryTableDescribe-' + (i+1) + '" href="javascript:void(0);"">查看</a>',
		});
		initHistoryTablePopover();
	}
};
historyNcrTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
historyNcrTable.clearQueryComp = function(){
	$("#sourceSelect").val(-1);
};
historyNcrTable.render();

function initHistoryTablePopover(){
	$('a[id^="HistoryTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = historyNcrTable.get(rowid);
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