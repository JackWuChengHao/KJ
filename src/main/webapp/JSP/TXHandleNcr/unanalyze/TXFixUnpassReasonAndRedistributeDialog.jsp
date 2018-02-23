<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="fixUnpassReasonAndRedistribute" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">重新指派</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="fixUnpassReasonAndRedistributeForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-4">流水号/编号</label>
							<label id="fixUnpassReasonAndRedistributeSerialNumber" class="TXModalContents col-md-7"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-4">内部处理人</label>
							<div class="TXModalLabel col-md-7">
								<select id="fixUnpassReasonAndRedistributeInlinePersion" name="" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-4">部门经理审核意见</label>
							<div class="col-md-7">
								<textarea rows="6" class="TXModalCombo form-control" placeholder="部门经理审核意见" id="fixUnpassReasonAndRedistributeAudit" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="" type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="redistribute" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>