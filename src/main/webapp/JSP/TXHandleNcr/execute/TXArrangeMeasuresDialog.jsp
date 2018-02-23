<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="distributeExeDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-sm" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">措施指派</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="distributeDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-5">措施编号</label>
							<label id="distributemeasureDialogSerial" class="TXModalContents col-md-7"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-5">内部处理人</label>
							<div class="col-md-7">
								<select id="distributeExeDialogPointerSelect" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="" type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="" type="button" onclick=distributeExeDialogPoint() class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>