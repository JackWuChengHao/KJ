<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>群聊管理</title>
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
						<img src="/webapp/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">开具项发起</span> 
					</div>
					<form action="#" id="TXStartNcrForm">
						<div class="form-inline">
							<label class="TXPage-searchlabel">流水号/编号 </label>
							<input type="text" id="serialNumberInput" name="serialNumber" class="TXPage-searchCombo form-control tableview-query-input" style="width:260px"/>
							<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
							<label class="TXPage-searchlabel">开具项来源 </label>
							<select id="sourceSelect" name="source" class="TXPage-searchSelect form-control tableview-query-select">
							</select>
							<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
							<label class="TXPage-searchlabel">开具项类型 </label>
							<select id="typeSelect" name="type" class="TXPage-searchSelect form-control tableview-query-select">
								<option value="-1">--请选择--</option>
							</select>
							<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
							<label class="TXPage-searchlabel" id="unpassedncrstart">开具人 </label>
							<select id="ncrstarter" name="createPersionId" class="TXPage-searchSelect form-control tableview-query-select">
								<option value="-1">--请选择--</option>
							</select>
							<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
							<label id="planFinishTimeLabel" class="TXPage-searchlabel" style="display:none">措施计划完成日期 </label>
							<input id="planFinishTime" type="text" name="planFinishTime" style="display:none" class="TXPage-searchCombo form-control tableview-query-input" readonly/>
						</div>
						<br/>
						<div class="form-inline">
							<!-- 未确认、待回复 -->
							<label class="TXPage-searchlabel" id="unconfirmedAndUnreplyedDepartmentSearch">主责部门 </label>
							<select id="ncrdepartment" name="departmentId" class="TXPage-searchSelect form-control tableview-query-select">
								<option value="-1">--请选择--</option>
							</select>
							
							<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
							<label id="newNcrTimeLabel" class="TXPage-searchlabel">开具日期 </label>
							<input id="newNcrTime" type="text" name="createTime" class="TXPage-searchCombo form-control tableview-query-input" readonly/>
							
							<span id="unconfirmedSearchBtn">
								<button type="button" id="UnconfirmedSearch" class="TXPageSearch-BTN btn btn-default newNcrUnconfirmedTable-query-submit">查询</button>
								<label class="TXBlank">&nbsp;&nbsp;</label>
								<button type="button" id="UnconfirmedReset" class="TXPageSearchCancel-BTN btn btn-default newNcrUnconfirmedTable-query-reset">重置</button>
							</span>
							<span id="unreplyedSearchBtn" style="display: none;">
								<button type="button" id="UnreplyedSearch" class="TXPageSearch-BTN btn btn-default newNcrUnreplyedTable-query-submit">查询</button>
								<label class="TXBlank">&nbsp;&nbsp;</label>
								<button type="button" id="UnreplyedReset" class="TXPageSearchCancel-BTN btn btn-default newNcrUnreplyedTable-query-reset">重置</button>
							</span>
							<span id="unpassedSearchBtn" style="display: none;">
								<button type="button" id="UnpassedSearch" class="TXPageSearch-BTN btn btn-default newNcrUnpassedTable-query-submit">查询</button>
								<label class="TXBlank">&nbsp;&nbsp;</label>
								<button type="button" id="UnpassedReset" class="TXPageSearchCancel-BTN btn btn-default newNcrUnpassedTable-query-reset">重置</button>
							</span>
						</div>
							<select id="Select" name="mold" class="tableview-query-select" style="display:none" >
								<option value="-1">all</option>
								<option selected="selected" value="0">unaudited</option>
								<option value="1">unanswered</option>
							</select>
							
						<input type="hidden" id="hasDelayInput" name="hasDelay" class="tableview-query-input" />
					</form>
					<hr/>
					<div class="form-group">
						<ul class="nav nav-tabs">
							<li class="active"><a id="unconfirmedTab" href="#unconfirmed" data-toggle="tab">未确认</a></li>
							<li><a id="unreplyedTab" href="#unreplyed" data-toggle="tab">待回复</a></li>
							<li><a id="unpassedTab" href="#unpassed" data-toggle="tab">待验证</a></li>
						</ul>
						<div class="tab-content">
							<jsp:include page="/JSP/TXNewNcr/unconfirmed/TXUnconfirmedTabPage.jsp" flush="true"></jsp:include>
							<jsp:include page="/JSP/TXNewNcr/unreplyed/TXUnreplyedTabPage.jsp" flush="true"></jsp:include>
							<jsp:include page="/JSP/TXNewNcr/unpassed/TXUnpassedTabPage.jsp" flush="true"></jsp:include>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/common/searchControl.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/unconfirmed/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/unconfirmed/list.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/unreplyed/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/unreplyed/list.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/unpassed/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/start/unpassed/list.js"></script>
</body>
</html>