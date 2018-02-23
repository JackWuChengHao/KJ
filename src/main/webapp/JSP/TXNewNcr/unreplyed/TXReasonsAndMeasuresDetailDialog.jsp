<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="TXReasonsAndMeasuresDetailDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-lg" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">详情</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">不符合项描述</label>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<textarea rows="5" class="TXModalCombo form-control" id="TXReasonsAndMeasuresDetailDialogDescribe" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">原因</label>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<textarea rows="5" class="TXModalCombo form-control" id="reasonsAndMeasuresDetailDialogReason" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">措施列表</label>
						</div>
						<div class="form-group">
							<div id="reasonsAndMeasuresDetailDialogTable" class=""></div>
						</div>
					</form>
				</div>
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button type="button" class="TXModalBTNCancel btn TXCancel" data-dismiss="modal" >关闭</button>
				</div>		
			</div>
		</div>
	</div>