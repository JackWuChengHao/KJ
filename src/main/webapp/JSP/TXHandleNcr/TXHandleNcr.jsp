<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/commPages/commCSS.jsp" flush="true"></jsp:include>
<title>开具项处理</title>
</head>
<body>
	<jsp:include page="/commPages/Navbar.jsp" flush="true"></jsp:include>
	<div class="main-container" id="main-container">
		<div class="main-container-inner">
			<jsp:include page="/commPages/Menu.jsp" flush="true"></jsp:include>
			<div class="main-content">
				<div class="container"><br/>
					<div class="form-group">
						<img src="/webapp/imgs/line.png">&nbsp;&nbsp;<span class="TXPage-title">开具项处理</span> 
					</div>
					<div class="form-inline">
						<label class="TXPage-searchlabel">流水号/编号</label>
						<input id="serialNumberInput" style='width:260px' name="serialNumber" type="text" class="TXPage-searchCombo form-control tableview-query-input" />
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<label class="TXPage-searchlabel">开具项来源</label>
						<select id="sourceSelect" name="source" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="TXPage-searchlabel">开具项类型</label>
						<select id="typeSelect" name="type" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
					</div><br/>
					<div class="form-inline">
					<label class="TXPage-searchlabel" id="">开具人</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<select id="ncrstarter" name="createPersionId" class="TXPage-searchSelect form-control tableview-query-select">
							<option value="-1">--请选择--</option>
						</select>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<!-- 未确认、待回复 -->
						<label class="TXPage-searchlabel" id="startTime">开具日期</label>
						<input id="newNcrTime" type="text" name="createTime" class="TXPage-searchCombo form-control tableview-query-input" readonly/>
						<!-- 实施中 -->
						<label class="TXPage-searchlabel" id="ClosePlanTimelabel">措施计划完成日期</label>
						<input id="NcrClosePlanTime" name="planFinishTime" type="text" class="TXPage-searchCombo form-control tableview-query-input" readonly/>
						<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
						<span id="handledepartmentDiv">
							<label class="TXPage-searchlabel" id="HandleDepartmentSearch">责任部门</label>
							<select id="handledepartment" name="referDepartmentId" class="TXPage-searchSelect form-control tableview-query-select">
								<option value="-1">--请选择--</option>
							</select>
						</span>
						<input type="hidden" id="isChangeInput" name="isChange" class="tableview-query-input" />
						<span id="unconfirmedSearchDiv" style="display: none;">
							<button class="TXPageSearch-BTN btn btn-default unconfirmedTable-query-submit">查询</button>
							<label class="TXBlank">&nbsp;&nbsp;</label>
							<button id="unconfirmedReset" class="TXPageSearchCancel-BTN btn btn-default unconfirmedTable-query-reset">重置</button>
						</span>
						<span id="unanalyzeSearchDiv" style="display: none;">
							<button class="TXPageSearch-BTN btn btn-default newNcrUnreplyedTable-query-submit">查询</button>
							<label class="TXBlank">&nbsp;&nbsp;</label>
							<button id="unanalyzeReset" class="TXPageSearchCancel-BTN btn btn-default newNcrUnreplyedTable-query-reset">重置</button>
						</span>
						<span id="executeSearchDiv">
							<button id="executeSearchDivSearch" class="TXPageSearch-BTN btn btn-default executingTable-query-submit">查询</button>
							<label class="TXBlank">&nbsp;&nbsp;</label>
							<button id="executeReset" class="TXPageSearchCancel-BTN btn btn-default executingTable-query-reset">重置</button>
						</span>
					</div>
					<hr/>
					<div class="form-group">
						<ul class="nav nav-tabs">
							<auth:needPermission name="QUALITY_MANAGER,DEPARTMENT_MANAGER">
								<li><a id="unconfirmedTab" href="#unconfirmed" data-toggle="tab">未确认</a></li>
							</auth:needPermission>
							<li><a id="unreplyedTab" href="#unreplyed" data-toggle="tab">待回复</a></li>
							<li class="active"><a id="execute" href="#executing" data-toggle="tab">实施中</a></li>
						</ul>
						<div class="tab-content">
							<auth:needPermission name="QUALITY_MANAGER,DEPARTMENT_MANAGER">
								<jsp:include page="/JSP/TXHandleNcr/unconfirmed/TXUnconfirmedTabPage.jsp" flush="true"></jsp:include>
							</auth:needPermission>
							<jsp:include page="/JSP/TXHandleNcr/unanalyze/TXUnanalyzeTabPage.jsp" flush="true"></jsp:include>
							<jsp:include page="/JSP/TXHandleNcr/execute/TXExecutingTabPage.jsp" flush="true"></jsp:include>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/JSP/TXHandleNcr/execute/TXAllMeasuresDetailDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/Foot.jsp" flush="true"></jsp:include>
	<jsp:include page="/commPages/commJS.jsp" flush="true"></jsp:include>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/common/searchControl.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/unconfirmed/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/unconfirmed/list.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/unanalyze/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/unanalyze/list.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/execute/init.js"></script>
	<script type="text/javascript" src="/webapp/Business/NewNcr/handle/execute/list.js"></script>
</body>
</html>