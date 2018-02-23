<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>开具项统计简表</title>
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
						<img src="/TBNCRMS/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">开具项统计简表</span> 
					</div>
					<div class="TXWell well well-sm">
						<div class="TXBTNArea form-group">
							<button id="downloadExcelBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-export"></span>&nbsp;导出统计表</button>
						</div>
					</div>
					
					<div id="reportFormsTable" class="TXTableContainer" style="height:600px;"></div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/TBNCRMS/Business/TXReportForms/init.js"></script>
	<script type="text/javascript" src="/TBNCRMS/Business/TXReportForms/list.js"></script>
</body>
</html>