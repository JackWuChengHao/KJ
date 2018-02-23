$(document).ready(function(){
});


	var newNcrUnreplyedTable = new TableView('newNcrUnreplyedTable');
	newNcrUnreplyedTable.url = '/TBNCRMS/getUnreplyedStartNcrInfoList';
	newNcrUnreplyedTable.initHeader([
		{id:'marker',width:2,align:'right',type:'radio'},
		{id:'index',name:'序号',width:5,align:'center',key:true},
		{id:'serialNumber',name:'流水号/编号',width:24,align:'center'},
		{id:'ncrsource',name:'开具项来源',width:15,align:'center'},
		{id:'ncrtype',name:'开具项类型',width:15,align:'center'},
		{id:'departmemt',name:'主责部门',width:10,align:'center'},
		{id:'creator',name:'开具人',width:8,align:'center'},
		{id:'issueTime',name:'开具日期',width:8,align:'center'},
		{id:'describe',name:'详情',width:10,align:'center'}
	]);
	newNcrUnreplyedTable.ajaxCallback = function(data){
		newNcrUnreplyedTable.clear();
		var len = data["rows"].length;
		for(var i=0;i<len;i++){
			var txfile = data["rows"][i]["lastFile"];
			newNcrUnreplyedTable.add({
				index: i+1,
				activitiStatus:data["rows"][i]["activitiStatus"],
				id : data["rows"][i]["id"],
				ncrAnalyzeId:data["rows"][i]["ncrAnalyze"]==null?null:data["rows"][i]["ncrAnalyze"]["id"],
				fileId:txfile==null?null:txfile["id"],
				serialNumber : data["rows"][i]["serialNumber"],
				ncrsource: data["rows"][i]["ncrForm"]["source"]["sourceName"],
				ncrtype: data["rows"][i]["ncrForm"]["type"]["type"],
				departmemt: data["rows"][i]["departmemt"]["departmentName"], 
				creator: data["rows"][i]["createPersion"]["name"], 
				issueTime: getFormatDate(data["rows"][i]["createTime"]), 
				analyzeContext: data["rows"][i]["ncrAnalyze"]==null?null:data["rows"][i]["ncrAnalyze"]["analyzeContext"], 
				describe:'<a style="text-decoration:none;" href="javascript:void(0)" onclick=showNcrReasonAndMessage('+(i)+')>详情</a>',
				addClass:data["rows"][i]["ncrForm"]["hasDelay"]==='y'?"danger":"",
				data:data["rows"][i]
			});
		}
	};
	newNcrUnreplyedTable.ajaxFailCallback = function(){
		swal("提示", "网络故障", "error");
	};
	/**
	 * 重置按钮
	 */
	newNcrUnreplyedTable.clearQueryComp = function(){
		clearSearchInput();
	};
	newNcrUnreplyedTable.render();
