<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="measureChangeBeforeUploadDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">信息确认</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">变更前措施</label>
							<div class="TXModalContents col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" id="dialogBeforeMeasure" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">变更单No.</label>
							<div class="TXModalContents col-md-9">
								<label id="dialogMeasureChangeNo"></label>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">变更后措施</label>
							<div class="TXModalContents col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" id="dialogAfterMeasure" readonly></textarea>
							</div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="measureChangeBeforeUploadDialogCancelBtn" type="button" onclick=clickMeasureChangeBeforeUploadDialogCancelBtn() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">重新上传</button>
					&nbsp;
					<button id="measureChangeBeforeUploadDialogSubmitBtn" type="button" onclick=clickMeasureChangeBeforeUploadDialogSubmitBtn() class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>