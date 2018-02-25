<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="sidebar" id="sidebar" style="font-family:'华文细黑';">
	<ul class="nav nav-list">
	
		<li><a href="/webapp/index.jsp"> 
			<span class="glyphicon glyphicon-home"></span> 
			<span class="menu-text">首页</span>
		</a></li>
		
		<li id=""><a href="#" class="dropdown-toggle"> 
			<span class="glyphicon glyphicon-thumbs-up"></span> 
			<span class="menu-text">助手管理</span></a>
			<ul class="submenu">
				<li id=""><a href="">助手列表</a></li>
				<li id=""><a href="">入群欢迎语</a></li>
				<li id=""><a href="">素材管理</a></li>
			</ul>
		</li>
		
		<li id=""><a href="#" class="dropdown-toggle"> 
			<span class="glyphicon glyphicon-th"></span>
			<span class="menu-text">微信群管理</span></a>
			<ul class="submenu">
				<li id=""><a href="">批量操作</a></li>
				<li id=""><a href="">群信息详情</a></li>
			</ul>
		</li>
		
		<li id=""><a href="#" class="dropdown-toggle"> 
			<span class="glyphicon glyphicon-fullscreen"></span>
			<span class="menu-text">群发信息</span></a>
			<ul class="submenu">
				<li id=""><a href="">普通群发</a></li>
				<li id=""><a href="/webapp/JSP/RSTimedReminder/RSTimeReminder.jsp">定时群发</a></li>
			</ul>
		</li>
		
		<li id=""><a href="/webapp/JSP/RSMegGuard/RSMegGuard.jsp" class="dropdown-toggle">
			<span class="glyphicon glyphicon-eye-open"></span> 
			<span class="menu-text">群消息监控</span>
		</a></li>
		
		<li id=""><a href="/webapp/JSP/RSDataCount/RSDataCount.jsp" class="dropdown-toggle">
			<span class="glyphicon glyphicon-stats"></span> 
			<span class="menu-text">数据统计</span>
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