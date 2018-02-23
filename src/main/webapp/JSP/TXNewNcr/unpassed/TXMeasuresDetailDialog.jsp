<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="TXMeasuresDetailDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
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
							<label class="TXModalLabelWizard col-md-3">措施内容</label>
							<div class="col-md-9">
								<textarea rows="3" class="TXModalCombo form-control" id="measuresDetailDialogContext" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">措施变更记录</label>
						</div>
						<div class="form-group">
							<!-- 措施变更单列表 -->
							<div id="TXMeasuresDetailDialogTable" class="TXTableContainer col-md-12"></div>
						</div>
					</form>
				</div>
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button type="button" class="TXModalBTNCancel btn TXCancel" data-dismiss="modal">关闭</button>
				</div>		
			</div>
		</div>
	</div>