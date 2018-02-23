<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="TXAllMeasuresDetailDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">其他责任部门措施实施情况</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<label class="TXModalLabelWizard col-md-3">措施列表</label>
						</div>
						<div class="form-group">
							<div id="TXAllMeasuresDetailDialogTable" class="TXTableContainer col-md-12"></div>
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