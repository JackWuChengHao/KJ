<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>质量开具项管理系统</title>
<script type="text/javascript" src="/webapp/Static/jQuery/jquery-3.1.0.min.js"></script>
</head>
<body>
<iframe id="logoutFrame" frameborder="0" width="100%" src="#"></iframe>
</body>
<script type="text/javascript">
	function logout(){
		setIframeHeight();
		var casLogoutUrl = "${casServerLogoutUrl}";
		$("#logoutFrame").attr("src",casLogoutUrl);
		setTimeout(redirectUrl, 2000);
	}
	function redirectUrl(){
		window.location.href="/webapp";
	}
	function setIframeHeight(){
		var height = window.innerHeight;
		$("#logoutFrame").attr("height",height);
	}
	$(document).ready(logout());
</script>
</html>