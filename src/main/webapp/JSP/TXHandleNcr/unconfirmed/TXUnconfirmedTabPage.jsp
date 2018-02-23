<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
	<div class="tab-pane" id="unconfirmed">
    	<br/>
    	<div class="TXWell well well-sm">
			<div class="TXBTNArea form-group">
				<button id="ncrHandlerUncomfirmDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button id="ncrHandlerComfirmBtn" class="TXBusinessBTN btn btn-success" type="button">认定</button>
				<button id="ncrHandlerTurndownBtn" class="TXBusinessBTN btn btn-danger" type="button">驳回</button>
			</div>
		</div>
		<div id="unconfirmedTable" class="TXTableContainer"></div>
		
		<jsp:include page="/JSP/TXHandleNcr/unconfirmed/TXRefuseNcrDialog.jsp" flush="true"></jsp:include>
    </div>