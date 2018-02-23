<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="distributeDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document" style="width:500px;">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">指派</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="distributeDialogForm">
						<div class="form-group" id="distributeDialogAuditDiv">
							<label class="TXModalLabelWarning col-md-3">审核意见</label>
							<div class="col-md-8">
								<textarea rows="4" class="TXModalCombo form-control" id="distributeDialogAudit" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label id="distributeDialogSerialNumber" class="TXModalContents col-md-8"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">内部处理人</label>
							<div class="col-md-8">
								<select id="pointerSelect" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="distributeDialogCancelBtn" type="button" onclick=clearDistributeDialogForm() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="distributeDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>