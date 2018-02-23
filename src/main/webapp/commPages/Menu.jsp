<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="sidebar" id="sidebar" style="font-family:'华文细黑';">
	<ul class="nav nav-list">
<!-- 		<li><a>  -->
<!-- 			<span class="glyphicon glyphicon-list-alt"></span>  -->
<!-- 			<span class="menu-text">菜单</span> -->
<!-- 		</a></li> -->
	
		<li><a href="/TBNCRMS/index.jsp"> 
			<span class="glyphicon glyphicon-home"></span> 
			<span class="menu-text">首页</span>
		</a></li>

		<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,INSIDE_USER,DEPARTMENT_MANAGER,NORMAL_USER">
			<li id="NewNcrMain-menu"><a href="#" class="dropdown-toggle"> 
				<span class="glyphicon glyphicon-certificate"></span>
				<span class="menu-text">现行开具项 </span></a>
				<ul class="submenu">
					<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,INSIDE_USER">
						<li id="startNcr-menu"><a href="/TBNCRMS/JSP/TXNewNcr/TXStartNcr.jsp">开具项发起</a></li>
					</auth:needPermission>
					<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,INSIDE_USER,DEPARTMENT_MANAGER,NORMAL_USER">
						<li id="handleNcr-menu"><a href="/TBNCRMS/JSP/TXHandleNcr/TXHandleNcr.jsp">开具项处理</a></li>
					</auth:needPermission>
					<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,INSIDE_USER">
						<li id="validNcr-menu"><a href="/TBNCRMS/JSP/TXValidCheckNcr/TXTestNcr.jsp">有效性验证</a></li>
					</auth:needPermission>
				</ul>
			</li>
		</auth:needPermission>

		<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,INSIDE_USER">
			<li id="historyNcr-menu"><a href="/TBNCRMS/JSP/TXHistoryNcr/TXHistoryNcr.jsp" class="dropdown-toggle">
				<span class="glyphicon glyphicon-folder-close"></span> 
				<span class="menu-text">历史开具项</span>
			</a></li>
		</auth:needPermission>

		<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,INSIDE_USER">
			<li id="Report-menu"><a href="/TBNCRMS/JSP/TXReportForms/TXNcrReportForms.jsp" class="dropdown-toggle">
				<span class="glyphicon glyphicon-signal"></span> 
				<span class="menu-text">报表</span>
			</a></li>
		</auth:needPermission>

		<auth:needPermission name="QUALITY_MANAGER,QUALITY_USER,ADMIN">
			<li id="Log-menu"><a href="/TBNCRMS/JSP/TXLog/TXNcrLog.jsp" class="dropdown-toggle">
				<span class="glyphicon glyphicon-calendar"></span>
				<span class="menu-text">日志</span>
			</a></li>
		</auth:needPermission>

		<auth:needPermission name="ADMIN">
			<li id="System-menu"><a href="/TBNCRMS/JSP/TXSystem/TXNcrSystem.jsp" class="dropdown-toggle"> 
				<span class="glyphicon glyphicon-cog"></span>
				<span class="menu-text">系统 </span>
			</a></li>
		</auth:needPermission>
	</ul>
	
	<div class="sidebar-collapse" id="sidebar-collapse">
		<i id="fold_button" class="glyphicon glyphicon-arrow-left"
			data-icon1="glyphicon glyphicon-arrow-left"
			data-icon2="glyphicon glyphicon-arrow-right"></i>
	</div>
</div>