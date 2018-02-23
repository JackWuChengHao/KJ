<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
	<div class="tab-pane" id="unpassed">
    	<br/>
    	<div class="TXWell well well-sm">
			<div class="TXBTNArea form-group">
				<button id="downloadEvidencesBtn" class="TXBusinessBTN btn btn-primary" type="button">下载证据文件</button>
				<button id="unpassedCommitAuditBtn" class="TXBusinessBTN btn btn-primary" type="button">提交验证意见</button>
				<button id="unpassedTabDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
				
				<input type="button" id="unpassedSwitchBtn" class="TXPageSearchCancel-BTN btn btn-default" type="button" style="float:right;" value="显示全部"/>
			</div>
		</div>
		
		<div id="newNcrUnpassedTable" class="TXTableContainer"></div>
		
		<jsp:include page="/JSP/TXNewNcr/unpassed/TXUnpassedCommitNcrDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="/JSP/TXNewNcr/unpassed/TXMeasuresDetailDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="/JSP/TXNewNcr/unpassed/TXMeasuresCheckCommitDialog.jsp" flush="true"></jsp:include>
	</div>
