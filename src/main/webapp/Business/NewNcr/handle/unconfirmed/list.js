$(document).ready(function(){
});


var unconfirmedTable = new TableView('unconfirmedTable');
unconfirmedTable.url = '/TBNCRMS/getUnconfirmedHandleNcrInfoList';
unconfirmedTable.initHeader([
	{id:'ico',name:'',width:2,align:'center'},
	{id:'marker',width:2,align:'right',type:'radio'},
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'serialNumber',name:'流水号/编号',width:22,align:'center'},
	{id:'ncrsource',name:'开具项来源',width:15,align:'center'},
	{id:'ncrtype',name:'开具项类型',width:15,align:'center'},
	{id:'departmemt',name:'主责部门',width:12,align:'center'},
	{id:'starter',name:'开具人',width:8,align:'center'},
	{id:'issueTime',name:'开具日期',width:10,align:'center'},
	{id:'describe',name:'不符合项描述',width:11,align:'center'}
]);
unconfirmedTable.ajaxCallback = function(data){
	unconfirmedTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		var txfile = data["rows"][i]["lastFile"];
		unconfirmedTable.add({
			index: i+1, 
			id : data["rows"][i]["id"],
			fileId : txfile==null?null:txfile["id"],
			serialNumber : data["rows"][i]["serialNumber"],
			ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
			ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
			departmemt: data["rows"][i]["departmemt"]["departmentName"], 
			starter: data["rows"][i]["createPersion"]["name"],
			issueTime: getFormatDate(data["rows"][i]["createTime"]), 
			describe: '<a style="text-decoration:none;" id="unconfirmedTableDescribe-' + (i+1) + '" href="javascript:void(0);"">查看</a>',
			describeContext: data["rows"][i]["ncrForm"]["describe"]
		});
	}
	initUnconfirmedTablePopover();
};
unconfirmedTable.clearQueryComp = function(){
	clearSearchInput();
};
unconfirmedTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
unconfirmedTable.render();

/**
 * 给不符合项描述添加悬浮气泡提示
 * @returns
 */
function initUnconfirmedTablePopover(){
	$('a[id^="unconfirmedTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = unconfirmedTable.get(rowid);
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
