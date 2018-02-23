$(document).ready(function(){
	initTimeSerach("occurTime");
});


var userLogTable = new TableView('userLogTable');
userLogTable.url = '/TBNCRMS/getOperateLogList';
userLogTable.initHeader([
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'username',name:'用户名',width:15,align:'center'},
	{id:'name',name:'姓名',width:15,align:'center'},
	{id:'occurTime',name:'用户操作时间',width:15,align:'center'},
	{id:'action',name:'用户动作',width:15,align:'center'},
	{id:'operateObject',name:'动作对象(流水号/编号)',width:35,align:'center'}
]);
userLogTable.ajaxCallback = function(data){
	userLogTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		userLogTable.add({
			index: i+1, 
			id : data["rows"][i]["id"],
			username: data["rows"][i]["user"]["username"],
			name: data["rows"][i]["user"]["name"],
			occurTime: getFormatDate(data["rows"][i]["occurTime"]),
			action: data["rows"][i]["action"], 
			operateObject: data["rows"][i]["operateObject"]
		});
	}
};
userLogTable.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
userLogTable.clearQueryComp = function(){
};
userLogTable.render();
