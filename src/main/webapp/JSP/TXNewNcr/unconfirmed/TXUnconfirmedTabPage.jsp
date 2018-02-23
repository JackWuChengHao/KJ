<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
	<div class="tab-pane active" id="unconfirmed">
    	<br/>
    	<div class="TXWell well well-sm">
			<div class="TXBTNArea form-group">
				<button id="StartNewNcr" class="TXBusinessBTN btn btn-primary" type="button" onclick=initNewNcrModal() data-toggle="modal" data-target="#unconfirmedNewNcrDialog">开具新不符合项</button>
				<button id="unconfirmedTabDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
				<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include> 
				<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
				<button id="ncrInfoChangeBtn" class="TXUserOperationBTN btn btn-success" type="button">修改</button>
				<button id="abandonNewNcrBtn" class="TXUserOperationBTN btn btn-danger" type="button">作废</button>
			</div>
		</div>
		<div id="newNcrUnconfirmedTable" class="TXTableContainer"></div>
    </div>
    
    <jsp:include page="/JSP/TXNewNcr/unconfirmed/TXUnconfirmedNewNcrDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="/JSP/TXNewNcr/unconfirmed/TXUnconfirmedChangeNcrDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="/JSP/TXNewNcr/unconfirmed/TXUnconfirmedAbandonNcrDialog.jsp" flush="true"></jsp:include>
	<jsp:include page="/JSP/TXNewNcr/unconfirmed/TXEnsureNewSheetInfoDialog.jsp" flush="true"></jsp:include>
