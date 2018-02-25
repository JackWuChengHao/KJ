$(document).ready(function(){
});

var WelcomeList = new TableView('WelcomeList');
WelcomeList.url = '/webapp/WelcomeList';
WelcomeList.initHeader([
	{id:'index',name:'序号',width:5,align:'center',key:true},
	{id:'name',name:'入群欢迎语',width:10,align:'center'},
]);

WelcomeList.ajaxCallback = function(data){
	userInfoTable.clear();
	var len = data["rows"].length;
	for(var i=0;i<len;i++){
		userInfoTable.add({
			index: i+1, 
			id : data["rows"][i]["id"],
			name : data["rows"][i]["name"],
		});
	}
};

WelcomeList.ajaxFailCallback = function(){
	swal("提示", "网络故障", "error");
};
WelcomeList.clearQueryComp = function(){
};
WelcomeList.render();

