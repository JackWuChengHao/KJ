<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>用户信息</title>
</head>
<body>
	<jsp:include page="/commPages/Navbar.jsp" flush="true"></jsp:include>
	<div class="main-container" id="main-container">
		<div class="main-container-inner">
			<jsp:include page="/commPages/Menu.jsp" flush="true"></jsp:include>
			<div class="main-content">
				<div class="container">
					<br>
					<div class="form-group">
						<img src="/webapp/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">用户信息</span> 
					</div>
					<div class="form-inline">
						<label class="TXPage-searchlabel">姓名</label>
						<input id="resetNcrSystemName" name="name" type="text" class="TXPage-searchCombo form-control tableview-query-input"/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">部门</label>
						<select name="departmentId" id="departmentSelect" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
						<label class="TXBlank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<button class="TXPageSearch-BTN btn btn-default userInfoTable-query-submit">查询</button>
						<label class="TXBlank">&nbsp;&nbsp;</label>
						<button id="resetNcrSystem" class="TXPageSearchCancel-BTN btn btn-default userInfoTable-query-reset">重置</button>
					</div>
					<hr/>
					<div class="TXWell well well-sm">
						<div class="TXBTNArea form-group">
							<button id="userRoleBtn" class="TXBusinessBTN btn btn-primary" type="button">用户角色</button>
							<button id="userUpdateBtn" class="TXBusinessBTN btn btn-primary" type="button">更新用户列表</button>
							<button id="userAuthorityBtn" class="TXBusinessBTN btn btn-primary" type="button">人员资质配置</button>
						</div>
					</div>
					<div id="userInfoTable" class="TXTableContainer"></div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="./TXUpdateUserDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="./TXUpdateUserAuthorityDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/webapp/Business/System/list.js"></script>
	<script type="text/javascript" src="/webapp/Business/System/control.js"></script>
</body>
</html>