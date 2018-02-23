<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="unconfirmedAbandomNcrDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">作废开具项</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="unconfirmedAbandomNcrDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label id="unconfirmedAbandomNcrDialogSerialNumber" class="TXModalContents col-md-8"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">作废原因</label>
							<div class="col-md-8">
								<textarea rows="3" class="TXModalCombo form-control" placeholder="作废原因" id="abandonReason" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="unconfirmedAbandomNcrDialogCancelBtn" onclick=clearUnconfirmedAbandomNcrDialog() type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>&nbsp;
					<button id="unconfirmedAbandomNcrDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>