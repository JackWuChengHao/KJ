<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="TXValidCheckCommitDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">信息确认</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
					<fieldset disabled>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label class="TXModalContents col-md-9" id="TXValidCheckCommitDialogNumber"></label>
						</div>
						
						<div id="finfishCheckDiv">
							<div class="form-group">
								<label class="TXModalLabel col-md-3">整体措施有效性判定</label>
								<div class="col-md-9">
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" id="TXValidCheckCommitDialogCheck0"/>措施有效 </label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" id="TXValidCheckCommitDialogCheck1" />实施基本有效 </label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" id="TXValidCheckCommitDialogCheck2" />措施无效 </label>
								</div>
							</div>
							<div class="form-group">
								<label class="TXModalLabel col-md-3">整体措施无效处置方式</label>
								<div class="col-md-9">
									<textarea id="dialogEntityMeasureInvalidWay" rows="5" class="TXModalCombo form-control" readonly></textarea>
								</div>
							</div>
						</div>
						<div id="validCheckCommitDialogTable" class="col-md-12"></div>
					</fieldset>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="" onclick=clickValidCheckCommitDialogCancel() class="TXModalBTNCancel btn btn-default" type="button" data-dismiss="modal" >取消</button>
					&nbsp;
					<button id="" onclick=clickValidCheckCommitDialogSubmit() class="TXModalBTNSubmit btn btn-success" type="button">确认</button>
				</div>			
			</div>
		</div>
	</div>