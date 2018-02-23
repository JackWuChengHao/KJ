<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="analyzeDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-lg" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">原因分析和措施制定</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="analyzeDialogForm">
						<div class="form-group" id="analyzeDialogAuditGroup" style="display: none">
							<label class="TXModalLabelWarning col-md-3">审核意见</label>
							<div class="col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" placeholder="开具人审核意见" id="analyzeDialogAudit" readonly></textarea>
							</div>
						</div>
						<div class="form-group" id="analyzeDialogDelayReasonDiv">
							<label class="TXModalLabelWarning col-md-3">延期回复原因</label>
							<div class="col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" placeholder="延期回复原因" id="analyzeDialogDelayReason" maxlength="500"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">问题分类</label>
							<div class="TXModalContents col-md-9">
								<div class="form-group">
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" id="analyzeDialogCheck5" type="checkbox" />/</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" id="analyzeDialogCheck1" type="checkbox" name="common"/>无流程</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" id="analyzeDialogCheck3" type="checkbox" name="common" />流程不合理</label>
								</div>
								<div class="form-group">
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" id="analyzeDialogCheck4" type="checkbox" name="common"/>流程不完善</label>
									<label class="TXCheckBoxContents col-md-8"><input class="TXCheckBox" id="analyzeDialogCheck2" type="checkbox" name="common"/>流程执行不到位</label>
								</div>
							</div>
						</div>
						<div class="form-group" id="analyzeDialogUploadDiv">
							<label class="TXModalLabel col-md-3">上传表单</label>
							<div class="col-md-9">
								<input type="file" name="" id="analyzeNcrUpload" multiple class="file-loading">
								<input type="hidden" name="" id="analyzeNcrUploadFileId" class="TXFileId"/>
							</div>
						</div>
						
						<div class="form-group" style="display: none;" id="analyzeDialogNcrReasonDiv">
							<label class="TXModalLabel col-md-3">原因分析</label>
							<div class="col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" id="analyzeDialogNcrReason" maxlength="500"></textarea>
							</div>
						</div>
						<div class="form-group" id="analyzeDialogEvidenceDiv" style="display: none;">
							<div id="analyzeDialogEvidenceTable" class="TXTableContainer col-md-12"></div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button style="float:left;" id="analyzeDialogAddBtn" type="button" class="TXModalBTNBusiness btn btn-warning" >措施 +</button>
					<button style="float:left;" onclick=clearMeasureTable() type="button" class="TXModalBTNBusiness btn btn-warning" >清空</button>
					<button id="analyzeDialogCancelBtn" type="button" onclick=clearAnalyzeDialog() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="analyzeDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>