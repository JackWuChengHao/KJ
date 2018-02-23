<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
	<div class="tab-pane" id="unreplyed">
    	<br/>
    	<div class="TXWell well well-sm">
			<div class="TXBTNArea form-group">
				<button id="unreplyedDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button id="unreplyedAuditPassBtn" class="TXUserOperationBTN btn btn-success" type="button">审核通过</button>
				<button id="unreplyedAuditUnpassBtn" class="TXUserOperationBTN btn btn-danger" type="button">不通过</button>
				
				<input type="button" id="unreplyedSwitchBtn" class="TXPageSearchCancel-BTN btn btn-default" type="button" style="float:right;" value="只显示未审核"/>
			</div>
		</div>
		
		<div id="newNcrUnreplyedTable" class="TXTableContainer"></div>
		
		<jsp:include page="/JSP/TXNewNcr/unreplyed/TXUnreplyeUnpassDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="/JSP/TXNewNcr/unreplyed/TXReasonsAndMeasuresDetailDialog.jsp" flush="true"></jsp:include>
    </div>