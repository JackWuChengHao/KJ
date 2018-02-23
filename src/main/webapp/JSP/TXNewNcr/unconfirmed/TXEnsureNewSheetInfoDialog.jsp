<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="ensureNewSheet" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<p class="TXModalTitle modal-title">信息确认</p>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label id="ensureNewSheetNO" class="TXModalContents col-md-9"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">主责部门</label>
							<label id="ensureNewSheetDepartment" class="TXModalContents col-md-9"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">数据来源</label>
							<label id="ensureNewSheetSource" class="TXModalContents col-md-9"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">开具项类型</label>
							<label id="ensureNewSheetType" class="TXModalContents col-md-9"></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">不符合项描述</label>
							<div class="col-md-9">
								<textarea id="ensureNewSheetDescribe" rows="5" class="TXModalCombo form-control" readonly></textarea>
							</div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="" class="TXModalBTNCancel btn btn-default" type="button" data-dismiss="modal" data-toggle="modal" data-target="#unconfirmedNewNcrDialog"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;返回</button>
					&nbsp;
					<button id="ensureNewSheetNewBtn" class="TXModalBTNSubmit btn btn-success" onclick=clickNewNcrBeforeComitDialogSubmitBtn() type="button">确认开具</button>
					<button id="ensureNewSheetChangeBtn" style="display: none;" class="TXModalBTNSubmit btn btn-success" onclick=clickChangeNcrBeforeComitDialogSubmitBtn() type="button">确认开具</button>
				</div>		
			</div>
		</div>
	</div>