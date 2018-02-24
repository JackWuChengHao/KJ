<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="updateUserAuthorityDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-sm" role="document">
			<div class="TXModal modal-content">
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<div class="TXModalContentsSpecial col-md-12"><img src="/webapp/imgs/authority.png"></div>
						</div>
						<div class="form-group">
							<label class="TXModalContentsSpecialtitle col-md-12" id='userauthority'></label>
						</div>
						<div class="form-group">
							<label class="TXModalContentsSpecialcontent col-md-12">质量体系资质认证授权</label>
						</div>
						<div class="TXModalContentsSpecial form-group">
							<button id="updateUserAuthorityDialogTrueBtn" type="button" class="TXModalBTNSubmit btn btn-success">授权</button>
							<button id="updateUserAuthorityDialogFalseBtn" type="button" class="TXModalBTNBusiness btn btn-warning">取消授权</button>
							<button id="updateUserAuthorityDialogCancelBtn" type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
						</div>
					</form>
				</div>
				
			</div>
		</div>
	</div>