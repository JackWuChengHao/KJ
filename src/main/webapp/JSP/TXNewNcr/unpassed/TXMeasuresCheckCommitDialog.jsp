<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="TXMeasuresCheckCommitDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">详情</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">验证时间</label>
							<label class="TXModalContents col-md-8" id="TXMeasuresCheckCommitDialogTime"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">验证人员</label>
							<label class="TXModalContents col-md-8" id="TXMeasuresCheckCommitDialogPersion"></label>
							<input type="hidden" id="TXMeasuresCheckCommitDialogPersonId"/>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">措施判定</label>
							<label class="TXModalContents col-md-8" id="TXMeasuresCheckCommitDialogResult"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">验证记录</label>
							<div class="col-md-9">
								<textarea rows="3" class="TXModalCombo form-control" id="TXMeasuresCheckCommitDialogContext" readonly></textarea>
							</div>
						</div>
					</form>
				</div>
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button type="button" class="TXModalBTNCancel btn TXCancel" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="" class="TXModalBTNSubmit btn btn-success" onclick=commitUnpassedCommitNcrDialog() type="button" data-dismiss="modal">提交</button>
				</div>		
			</div>
		</div>
	</div>