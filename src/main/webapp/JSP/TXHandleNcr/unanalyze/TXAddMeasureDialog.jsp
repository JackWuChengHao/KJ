<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="addMeasureDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">添加措施</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="addMeasureDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">原计划措施</label>
							<div class="col-md-8">
								<textarea rows="4" class="TXModalCombo form-control" id="addMeasureDialogPlanMeasure" maxlength="500"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">计划完成日期</label>
							<div class="col-md-8">
								<input id="addMeasureDialogPlanFinishTime" type="text" class="TXModalCombo form-control" readonly/>
								<input id="addMeasureDialogPlanFinishTimeVal" type="hidden" />
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">责任部门</label>
							<div class="col-md-8">
								<select id="addMeasureDialogDepartment" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="addMeasureDialogCancelBtn" type="button" onclick=clearAddMeasureDialogForm() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="addMeasureDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>