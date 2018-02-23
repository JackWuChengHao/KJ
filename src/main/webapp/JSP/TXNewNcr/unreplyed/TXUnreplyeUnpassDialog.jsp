<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="unreplyeUnpassDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">提交审核意见</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="unreplyeUnpassDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label id="unreplyeUnpassDialogSerialNumber" class="TXModalContents col-md-8"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">审核意见</label>
							<div class="col-md-8">
								<textarea rows="3" class="TXModalCombo form-control" placeholder="审核意见" id="unreplyeUnpassDialogAudit" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="unreplyeUnpassDialogCancelBtn" onclick=clearUnreplyeUnpassDialogForm() type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal" >取消</button>
					&nbsp;
					<button id="unreplyeUnpassDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>