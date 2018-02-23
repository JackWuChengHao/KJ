/**
 * 开具项发起-未确认
 */
$(document).ready(function(){
	bindNewNcrUnconfirmedTableSearchButton();
});

	var newNcrUnconfirmedTable = new TableView('newNcrUnconfirmedTable');
	newNcrUnconfirmedTable.url = '/TBNCRMS/getUnconfirmedStartNcrInfoList';
	newNcrUnconfirmedTable.initHeader([
		{id:'ico',name:'',width:2,align:'center'},
		{id:'marker',width:2,align:'right',type:'radio'},
		{id:'index',name:'序号',width:5,align:'center',key:true},
		{id:'serialNumber',name:'流水号/编号',width:22,align:'center'},
		{id:'ncrsource',name:'开具项来源',width:15,align:'center'},
		{id:'ncrtype',name:'开具项类型',width:15,align:'center'},
		{id:'departmemt',name:'主责部门',width:12,align:'center'},
		{id:'creator',name:'开具人',width:8,align:'center'},
		{id:'issueTime',name:'开具日期',width:10,align:'center'},
		{id:'describe',name:'不符合项描述',width:11,align:'center'}
	]);
	
	newNcrUnconfirmedTable.ajaxCallback = function(data){
		
		newNcrUnconfirmedTable.clear();
		var len = data["rows"].length;
		for(var i=0;i<len;i++){
			var txfile = data["rows"][i]["lastFile"];
			newNcrUnconfirmedTable.add({
				ico:getUnconfirmedTableIco(data["rows"][i]),
				index: i+1, 
				id : data["rows"][i]["id"],
				fileId:txfile==null?null:txfile["id"],
				serialNumber : data["rows"][i]["serialNumber"],
				ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
				ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
				departmemt: data["rows"][i]["departmemt"]["departmentName"], 
				issueTime: getFormatDate(data["rows"][i]["createTime"]), 
				describe: '<a style="text-decoration:none;" id="newNcrUnconfirmedTableDescribe-' + (i+1) + '" href="javascript:void(0);"">查看</a>',
				describeContext: data["rows"][i]["ncrForm"]["describe"],
				creator: data["rows"][i]["createPersion"]["name"],
				activitiStatus:data["rows"][i]["activitiStatus"],
				turndownReason:data["rows"][i]["ncrForm"]["turndownReason"],
				data:data["rows"][i]
			});
		}
		initNewNcrUnconfirmedTablePopover();
		bindUnconfirmedImageMessage();
	};
	newNcrUnconfirmedTable.ajaxFailCallback = function(){
		swal("提示", "网络故障", "error");
	};
	newNcrUnconfirmedTable.clearQueryComp = function(){
		clearSearchInput();
	}
	newNcrUnconfirmedTable.render();

/**
 * 开具项被驳回的图标
 * @param ncrInfo
 * @returns
 */
function getUnconfirmedTableIco(ncrInfo){
	if(ncrInfo["activitiStatus"] === 1){
		return '<img class="img img-turndown" alt="提示" src="/TBNCRMS/imgs/u99.png">';
	};
}
/**
 * 给图标添加悬浮气泡提示
 * @returns
 */
function bindUnconfirmedImageMessage(){
	$(".img-turndown").webuiPopover({
		placement:'bottom',
		html:true,
		content:"开具项被驳回",
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
function initNewNcrUnconfirmedTablePopover(){
	$('a[id^="newNcrUnconfirmedTableDescribe-"]').each(function(){
		var idStr = $(this).attr("id").split("-")[1];
		var rowid = parseInt(idStr);
		var row = newNcrUnconfirmedTable.get(rowid);
		var content = row["describeContext"];
		content = stripdecodescript(content);
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

/**
 *更新开具项 新不符合项的搜索重置
 *@returns 
 */
function bindNewNcrUnconfirmedTableSearchButton(){
	$("#TXStartNcrSearchButton").on("click",function(){
		document.getElementById("TXStartNcrForm").reset();
		$("#newNcrUnconfirmedTable-reflesh").trigger("click");
	});
}