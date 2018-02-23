$(document).ready(function(){
	initDepartmentSelect("departmentSelect");
	bindUserRoleBtn();
	bindUserRoleSubmitBtn();
	bindUserAuthorityBtn();
	bindUpdateUserAuthorityDialogBtn();
	clearSystemSearch();
	bindUserUpdateBtn();
	isNameValid("resetNcrSystemName");
});

function bindUserRoleBtn(){
	$("#userRoleBtn").click(function(){
		clearRoleDialog();
		var selectList = userInfoTable.getSelected();
		if(selectList.length !== 1){
			swal("", "请选择一个用户", "warning");
			return;
		}
		var namelogin = $("#currentUser").html();

		var user = selectList[0];
		$("#updateUserDialog").modal('show');
		$("#dialogName").html(user.name);
		
		if(user.name === namelogin){
			swal({title:"",text:'<strong style="color:#188ae2;">您不可以修改自己的用户角色信息</strong>',timer:3000,showConfirmButton:false,html:true});
			$("#dialogUpdateUserCancelBtn").hide();
			$("#dialogUpdateUserSubmitBtn").hide();
			$("#dialogUpdateUserCloseBtn").show();
		}else{
			$("#dialogUpdateUserCancelBtn").show();
			$("#dialogUpdateUserSubmitBtn").show();
			$("#dialogUpdateUserCloseBtn").hide();
		}
		initcheckBoxRoleDialog(selectList[0].id);
	});
}

function bindUserRoleSubmitBtn(){
	$("#dialogUpdateUserSubmitBtn").click(function(){
		doubleConfirmSystem();
	});
}

function dialogUpdateUserSubmit(){
	var selectList = userInfoTable.getSelected();
	if(selectList.length !== 1){
		return;
	}
	
	//获取复选框被选中的用户角色
	var roleList = [];
	$("#rolesGroup input").each(function(){
		if($(this).prop("checked")){
			roleList.push(Number($(this).val()));
		}
	});

	var isSuccess = alertResult(sendAjax("/TBNCRMS/updataUserRoles",{'userId':selectList[0].id,'roleList':roleList}));
	if(isSuccess){
		$("#updateUserDialog").modal('hide');
	}
}

/**
 * 清除更新用户角色弹出框数据
 * @returns
 */
function clearRoleDialog(){
	$("#dialogName").html("");
	$("#rolesGroup input").each(function(){
		$(this).prop("checked",false);
	});
}

/**
 * 初始化更新用户角色弹出框数据
 * @returns
 */
function initcheckBoxRoleDialog(userId){
	var data = sendAjax("/TBNCRMS/getRolesByUserId",{'userId':userId});
	var roleList = data.rows;
	for(var i in roleList){
		$("#rolesGroup input").each(function(){
			if($(this).val() == roleList[i].id){
				$(this).prop("checked",true);
			}
		});
	}
}

function bindUserAuthorityBtn(){
	$("#userAuthorityBtn").click(function(){
		clearRoleDialog();
		
		var selectList = userInfoTable.getSelected();
		if(selectList.length !== 1){
			swal("", "请选择一个用户", "warning");
			return;
		}
		
		var user = selectList[0];
		$("#updateUserAuthorityDialog").modal('show');
		$("#userauthority").html(user.name);
	});
}

function bindUpdateUserAuthorityDialogBtn(){
	$("#updateUserAuthorityDialogTrueBtn").click(function(){
		var selectList = userInfoTable.getSelected();
		if(selectList.length !== 1){
			return;
		}
		
		var user = selectList[0];
		submitUserAuthority(user["id"],0);
	});
	$("#updateUserAuthorityDialogFalseBtn").click(function(){
		var selectList = userInfoTable.getSelected();
		if(selectList.length !== 1){
			return;
		}
		
		var user = selectList[0];
		
		if(user["post"] === "经理"){
			
			swal({
				title: "",
				text: "只能对同事进行资质取消",
				type: "warning",
				showCancelButton: false,
				confirmButtonColor: "#223a5e",
				confirmButtonText: "确认",
				closeOnConfirm: true},
				function(confirm){
					if(confirm){
						
						$("#updateUserAuthorityDialog").modal("hide");
						$("#userInfoTable-reflesh").trigger("click");
					}
				});
			return
			}else{
				submitUserAuthority(user["id"],1);
			}
	});
}

function submitUserAuthority(userId,allowOperate){
	var isSuccess = alertResult(sendAjax("/TBNCRMS/updataUserAuthority",{"userId":userId,"authority":allowOperate}));
	if(isSuccess){
		$("#updateUserAuthorityDialog").modal("hide");
		$("#userInfoTable-reflesh").trigger("click");
	}
}

function clearSystemSearch(){
	$("#resetNcrSystem").click(function(){
		$("#resetNcrSystemName").val("");
		$("#departmentSelect").val("-1");
	});
}

function doubleConfirmSystem(){
	swal({
		title: "",
		text: "是否更新用户角色?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#223a5e",
		confirmButtonText: "是",
		cancelButtonText: "否",
		closeOnConfirm: false}, 
	function(confirm){
		if(confirm){
			dialogUpdateUserSubmit();
			$("#userInfoTable-reflesh").trigger("click");
		}else{
			return;
		}
	});
}
/**
 * 更新用户列表
 * @returns
 */
function bindUserUpdateBtn(){
	$("#userUpdateBtn").on("click",function(){
		var data = sendAjax("/TBNCRMS/updateUserInfo");
		if(data["code"] !== 0){
			swal("", data["msg"], "error");
		} else {
			$("#userInfoTable-reflesh").trigger("click");
			swal("", "操作成功", "success");
		}
	});
}