<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="sidebar" id="sidebar" style="font-family:'华文细黑';">
	<ul class="nav nav-list">
<!-- 		<li><a>  -->
<!-- 			<span class="glyphicon glyphicon-list-alt"></span>  -->
<!-- 			<span class="menu-text">菜单</span> -->
<!-- 		</a></li> -->
	
		<li><a href="/webapp/index.jsp"> 
			<span class="glyphicon glyphicon-home"></span> 
			<span class="menu-text">菜单</span>
		</a></li>

		<li id="NewNcrMain-menu"><a href="#" class="dropdown-toggle"> 
			<span class="glyphicon glyphicon-certificate"></span>
			<span class="menu-text">批量开群 </span></a>
			<ul class="submenu">
				<li id="startNcr-menu"><a href="/webapp/JSP/TXNewNcr/TXStartNcr.jsp">群管理</a></li>
				<li id="handleNcr-menu"><a href="/webapp/JSP/TXHandleNcr/TXHandleNcr.jsp">助手管理</a></li>
			</ul>
		</li>

		<li id="historyNcr-menu"><a href="/webapp/JSP/RSDataCount/RSDataCount.jsp" class="dropdown-toggle">
			<span class="glyphicon glyphicon-folder-close"></span> 
			<span class="menu-text">群数据统计</span>
		</a></li>

		<li id="Report-menu"><a href="/webapp/JSP/TXReportForms/TXNcrReportForms.jsp" class="dropdown-toggle">
			<span class="glyphicon glyphicon-signal"></span> 
			<span class="menu-text">报表</span>
		</a></li>

		<li id="Log-menu"><a href="/webapp/JSP/TXLog/TXNcrLog.jsp" class="dropdown-toggle">
			<span class="glyphicon glyphicon-calendar"></span>
			<span class="menu-text">日志</span>
		</a></li>

		<li id="System-menu"><a href="/webapp/JSP/TXSystem/TXNcrSystem.jsp" class="dropdown-toggle"> 
			<span class="glyphicon glyphicon-cog"></span>
			<span class="menu-text">系统 </span>
		</a></li>
	</ul>
	
	<div class="sidebar-collapse" id="sidebar-collapse">
		<i id="fold_button" class="glyphicon glyphicon-arrow-left"
			data-icon1="glyphicon glyphicon-arrow-left"
			data-icon2="glyphicon glyphicon-arrow-right"></i>
	</div>
</div>