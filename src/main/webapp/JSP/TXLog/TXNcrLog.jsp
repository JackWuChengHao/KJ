<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>用户操作日志</title>
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
						<img src="/TBNCRMS/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">用户操作日志</span> 
					</div>
					<div class="form-inline">
						<label class="TXPage-searchlabel">姓名</label>
						<input name="user.name" id="name" class="TXPage-searchInput form-control tableview-query-input" type="text" 
						/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">用户动作</label>
						<select name="action" id="action" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
							<option value="开具">开具</option>
							<option value="确认">确认</option>
							<option value="审核">审核</option>
							<option value="上传">上传</option>
							<option value="验证">验证</option>
							<option value="导出">导出</option>
							<option value="关闭">关闭</option>
						</select>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">用户操作时间</label>
						<input name="occurTime" id="occurTime" class="TXPage-searchCombo form-control tableview-query-input" type="text" readonly/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">动作对象(流水号/编号)</label>
						<input style="width:260px" id="serialNumber" name="operateObject" class="TXPage-searchInput form-control tableview-query-input" type="text"/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						
						<label class="TXBlank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<button class="TXPageSearch-BTN btn btn-default userLogTable-query-submit">查询</button>
						<label class="TXBlank">&nbsp;&nbsp;</label>
						<button id="TXNcrLogReset" class="TXPageSearchCancel-BTN btn btn-default userLogTable-query-reset">重置</button>
					</div>
					<hr/>
					<div id="userLogTable" class="TXTableContainer"></div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/TBNCRMS/Business/Log/init.js"></script>
	<script type="text/javascript" src="/TBNCRMS/Business/Log/list.js"></script>
</body>
</html>