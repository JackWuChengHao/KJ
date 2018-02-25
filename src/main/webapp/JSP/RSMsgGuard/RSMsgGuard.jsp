<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>群消息监控</title>
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
						<img src="/webapp/imgs/line.png">&nbsp;&nbsp;<span>群消息监控</span> 
					</div>
					<div class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-info-sign"></span>可设置多条欢迎语内容，当有新成员入群时，系统会随机推送一条欢迎语</div>
					<hr/>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
</body>
</html>