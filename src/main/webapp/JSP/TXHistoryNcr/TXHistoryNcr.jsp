<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>历史开具项</title>
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
						<img src="/TBNCRMS/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">历史开具项</span> 
					</div>
					<div class="form-inline">
						<label class="TXPage-searchlabel">流水号/编号</label>
						<!-- size -->
						<input id="serialNumber" name="serialNumber" type="text" class="TXPage-searchInput form-control tableview-query-input" style="width:260px"/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">开具项来源</label>
						<select id="sourceSelect" name="source" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">开具项类型</label>
						<select id="typeSelect" name="type" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">开具人</label>
						<select id="starter" name="userId" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">主责部门</label>
						<select id="departmentSelect" name="departmentId" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
					</div>
					<br/>
					<div class="form-inline">
						<label class="TXPage-searchlabel">开具日期</label>
						<input id="createTime" name="createTime" type="text" class="TXPage-searchCombo form-control tableview-query-input" readonly/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">关闭日期</label>
						<input id="closeTime" name="closeTime" type="text" class="TXPage-searchCombo form-control tableview-query-input" readonly/>
						<label class="TXBlank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<button class="TXPageSearch-BTN btn btn-default historyNcrTable-query-submit">查询</button>
						<label class="TXBlank">&nbsp;&nbsp;</label>
						<button id="ResetHistoryNcrlist" class="TXPageSearchCancel-BTN btn btn-default historyNcrTable-query-reset">重置</button>
					</div>
					<hr/>
					<div class="TXWell well well-sm">
						<div class="TXBTNArea form-group">
							<button id="downloadHistoryNcrBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
						</div>
					</div>
					<div id="historyNcrTable" class="TXTableContainer"></div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/TBNCRMS/Business/HistoryNcr/searchControl.js"></script>
	<script type="text/javascript" src="/TBNCRMS/Business/HistoryNcr/list.js"></script>
</body>
</html>