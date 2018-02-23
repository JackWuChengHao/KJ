<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="refuseNcrDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">驳回原因</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="refuseNcrDialogForm">
						<div class="form-group">
							<div class="col-md-11">
								<textarea rows="4" class="TXModalCombo form-control" placeholder="驳回原因" id="turndownReason" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
					</form>
				</div>
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="refuseNcrDialogCancelBtn" type="button" onclick=clearRefuseNcrDialog() class="TXModalBTNCancel btn btn-default" data-dismiss="modal" >取消</button>
					&nbsp;
					<button id="refuseNcrDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>