<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

    
	<div class="tab-pane active" id="executing">
    	<br/>
    	<div class="TXWell well well-sm">
			<div class="TXBTNArea form-group">
				<button id="uploadEvidenceBtn" class="TXBusinessBTN btn btn-primary" type="button">上传证据</button>
				<auth:needPermission name="QUALITY_MANAGER,DEPARTMENT_MANAGER">
					<button id="changeMeasureBtn" class="TXBusinessBTN btn btn-primary" type="button">变更措施</button>
				</auth:needPermission>
				<button id="downloadEvidencesBtn" class="TXBusinessBTN btn btn-primary" type="button">下载证据文件</button>
				<button id="executingDownloadBtn" class="TXBusiness-AssistBTN btn btn-default" type="button"><span class="glyphicon glyphicon-download-alt"></span>下载</button>
				<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
				<jsp:include page="/commPages/blankspace.jsp" flush="true"></jsp:include>
				<auth:needPermission name="QUALITY_MANAGER,DEPARTMENT_MANAGER">
					<button id="executingBtn" class="TXUserOperationBTN btn btn-warning" type="button">指派</button>
				</auth:needPermission>
				<input type="button" id="ExecuteSwitchBtn" class="TXPageSearchCancel-BTN btn btn-default" type="button" style="float:right;" value="显示全部"/>
			</div>
		</div>
		<div id="executingTable" class="TXTableContainer"></div>
		<jsp:include page="./TXCommitMeasureEvidenceDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXMeasuresDetailDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXCommitMeasureChangeDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXArrangeMeasuresDialog.jsp" flush="true"></jsp:include>
		<jsp:include page="./TXMeasureChangeBeforeUploadDialog.jsp" flush="true"></jsp:include>
	</div>
