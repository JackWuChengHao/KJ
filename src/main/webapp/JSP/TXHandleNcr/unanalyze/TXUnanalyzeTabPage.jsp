<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

	<div class="tab-pane" id="unreplyed">
    	<br/>
    	<div class="TXWell well well-sm">
			<div class="TXBTNArea form-group">
				<button id="ncrHandlerUnanalyzeAnalyzeBtn" class="TXBusinessBTN btn btn-primary" type="button">分析原因和制定措施</button>
				<button id="ncrHandlerUnanalyzeDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
				<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
				<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
				<auth:needPermission name="QUALITY_MANAGER,DEPARTMENT_MANAGER">
					<button id="unanalyzePointBtn" class="TXUserOperationBTN btn btn-warning" type="button">指派</button>
					<button id="finalizeBtn" class="TXUserOperationBTN btn btn-success" type="button">定稿</button>
				</auth:needPermission>
			</div>
		</div>
		
		<div id="newNcrUnreplyedTable" class="TXTableContainer"></div>
		
		<jsp:include page="./TXDistributeDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXAnalyzeDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXAnalyzeAuditDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXAddMeasureDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXFixUnpassReasonAndRedistributeDialog.jsp" flush="true"></jsp:include>
    </div>