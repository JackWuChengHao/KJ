<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>有效性验证</title>
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
						<img src="/webapp/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">有效性验证</span> 
					</div>
					<div class="form-inline">
						<label class="TXPage-searchlabel">流水号/编号</label>
						<!-- size -->
						<input id="serialNumberInput" name="serialNumber" type="text" class="TXPage-searchInput form-control tableview-query-input" style="width:260px"/>&nbsp;&nbsp;
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">开具项来源</label>
						<select id="sourceSelect" name="source"  class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>&nbsp;&nbsp;
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">开具项类型</label>
						<select id="typeSelect" name="type" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
					</div>
					<br/>
					<div class="form-inline">
						<label class="TXPage-searchlabel">主责部门</label>
						<select id="ncrdepartment" name="departmentId" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>&nbsp;&nbsp;
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel" id="unpassedncrstart">开具人 </label>
						<select id="ncrstarter" name="createPersionId" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>&nbsp;&nbsp;
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel ">开具日期</label>
						<input id="newNcrTime" type="text" name="createTime"  class="TXPage-searchCombo form-control tableview-query-input" readonly/>&nbsp;&nbsp;
						<button class="TXPageSearch-BTN btn btn-default validCheckTable-query-submit">查询</button>
						<label class="TXBlank">&nbsp;&nbsp;</label>
						<button id="TXTestNcrReset" class="TXPageSearchCancel-BTN btn btn-default validCheckTable-query-reset">重置</button>
					</div>
					<hr/>
					<div class="TXWell well well-sm">
						<div class="TXBTNArea form-group">
							<button id="verityBtn" class="TXBusinessBTN btn btn-primary" type="button">有效性验证</button>
							<button id="verityDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
						</div>
					</div>
					
					<div id="validCheckTable" class="TXTableContainer"></div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="./TXValidCheckDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="./TXAddNewVaildCheckDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="./TXValidCheckCommitDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/webapp/Business/NewNcr/verity/searchControl.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/verity/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/verity/list.js"></script>
</body>
</html>