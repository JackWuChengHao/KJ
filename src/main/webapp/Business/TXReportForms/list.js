$(document).ready(function(){
});


var reportFormsTable = new TableView('reportFormsTable');
reportFormsTable.url = '/webapp/getNcrInfoReportList';
reportFormsTable.initHeader([
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'serialNumber',name:'流水号/编号',width:18,align:'center'},
	{id:'ncrsource',name:'开具项来源',width:15,align:'center'},
	{id:'ncrtype',name:'开具项类型',width:15,align:'center'},
	{id:'createPersion',name:'开具人',width:6,align:'center'},
	{id:'department',name:'主责部门',width:10,align:'center'},
	{id:'createTime',name:'开具日期',width:8,align:'center'},
	{id:'isClose',name:'是否关闭',width:6,align:'center'},
	{id:'describe',name:'不符合项描述',width:10,align:'center'},
]);
reportFormsTable.ajaxCallback = function(data){
	reportFormsTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		var txfile = data["rows"][i]["ncrForm"]["file"];
		reportFormsTable.add({
			index: i+1, 
			id : data["rows"][i]["id"],
			fileId:txfile==null?null:txfile["id"],
			serialNumber : data["rows"][i]["serialNumber"],
			ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
			ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
			createPersion: data["rows"][i]["createPersion"]["name"], 
			department: data["rows"][i]["departmemt"]["departmentName"], 
			createTime: getFormatDate(data["rows"][i]["createTime"]), 
			isClose: data["rows"][i]["activitiStatus"]===100?"是":"否", 
			createTime: getFormatDate(data["rows"][i]["createTime"]), 
			describeContext: data["rows"][i]["ncrForm"]["describe"], 
			describe: '<a style="text-decoration:none;" id="reportFormsTableDescribe-' + (i+1) + '" href="javascript:void(0);"">查看</a>',
		});
		initReportFormsTablePopover();
	}
};
reportFormsTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
reportFormsTable.render();


function initReportFormsTablePopover(){
	$('a[id^="reportFormsTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = reportFormsTable.get(rowid);
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