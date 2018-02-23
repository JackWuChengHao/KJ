<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="commitMeasureChangeDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">变更措施</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="commitMeasureChangeDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label id="commitMeasureChangeDialogMeasureNumber" class="TXModalContents col-md-8"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">变更类型</label>
							<div class="TXModalContents col-md-9">
								<div class="form-group">
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" id="MeasureTimeChange" type="checkbox"/>措施延期</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" id="MeasureActionChange" type="checkbox"/>措施变更</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">上传表单</label>
							<div class="col-md-9">
								<input type="file" name="" id="commitMeasureChangeDialogUpload" multiple class="file-loading">
								<input type="hidden" name="" id="commitMeasureChangeDialogUploadFile" class="TXFileId"/>
							</div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="commitMeasureChangeDialogCancelBtn" type="button" onclick=clearCommitMeasureChangeDialog() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="commitMeasureChangeDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>