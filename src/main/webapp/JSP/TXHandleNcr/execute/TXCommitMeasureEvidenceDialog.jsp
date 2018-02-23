<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="commitMeasureEvidenceDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">完成措施</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="commitMeasureEvidenceDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">措施编号</label>
							<label id="evidenceDialogMeasureNumber" class="TXModalContents col-md-8"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">措施内容</label>
							<div class="col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" placeholder="措施内容" id="evidenceDialogMeasureContext" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">上传文件</label>
							<div class="col-md-9">
								<input type="file" name="" id="evidenceUpload" multiple class="file-loading">
							</div>
						</div>
						<div class="form-group">
							<div id="evidenceDialogTable" class="TXTableContainer col-md-12"></div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="evidenceDialogCancelBtn" type="button" onclick=clearCommitMeasureEvidenceDialog() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="evidenceDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>