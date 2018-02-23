<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="validCheckDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">有效性验证</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<input id="validCheckDialogNcrInfoId" type="hidden" />
						<div class="form-group">
							<label class="TXModalLabel col-md-3">流水号/编号</label>
							<label class="TXModalContents col-md-7" id="validCheckDialogNumber"></label>
							<div class="col-md-2"><button type="button" id="validCheckDialogAddBtn" class="TXBusinessBTN btn btn-primary">验证</button></div>
						</div>
						<div id="validCheckDialogTable" class=""></div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal" >关闭</button>
				</div>		
			</div>
		</div>
	</div>