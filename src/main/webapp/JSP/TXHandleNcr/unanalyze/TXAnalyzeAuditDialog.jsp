<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="analyzeAuditDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-lg" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">原因分析和措施制定</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group" id="analyzeAuditDialogAuditDiv">
							<label class="TXModalLabelWarning col-md-3">审核意见</label>
							<div class="col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" placeholder="审核意见" id="analyzeAuditDialogAudit" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">内部责任人</label>
							<label class="TXModalContents col-md-8" id="analyzeAuditDialogPointer"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">问题分类</label>
							<label class="TXModalContents col-md-8" id="analyzeAuditDialogProblemType"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">原因分析</label>
							<div class="col-md-9">
								<textarea rows="4" class="TXModalCombo form-control" id="analyzeAuditDialogReason" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">措施列表</label>
						</div>
						<div class="form-group">
							<div id="analyzeAuditDialogMeasureTable" class="col-md-12"></div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="analyzeAuditDialogCancelBtn" type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="analyzeAuditDialogChangeBtn" type="button" class="TXModalBTNBusiness btn btn-warning">审核不通过</button>
					&nbsp;
					<button id="analyzeAuditDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">审核通过</button>
				</div>		
			</div>
		</div>
	</div>