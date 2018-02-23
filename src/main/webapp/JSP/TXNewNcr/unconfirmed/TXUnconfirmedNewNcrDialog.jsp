<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="unconfirmedNewNcrDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<p class="TXModalTitle modal-title">开具不符合项</p>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="unconfirmedNewNcrDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">数据来源</label>
							<div class="col-md-8">
								<select id="unconfirmedNewNcrDialogSourceSelect" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unconfirmedNewNcrDialogAuditObjectDiv" style="display: none;">
							<label class="TXModalLabel col-md-3">审核对象</label>
							<div class="col-md-8">
								<input type="text" id="unconfirmedNewNcrDialogAuditObject" class="TXModalCombo form-control">
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">开具项类型</label>
							<div class="col-md-8">
								<select id="unconfirmedNewNcrDialogTypeSelect" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unconfirmedNewNcrUploadGroup">
							<label class="TXModalLabel col-md-3">上传表单</label>
							<div class="col-md-8">
								<input type="file" name="" id="unconfirmedNewNcrUpload" multiple class="file-loading">
								<input type="hidden" id="unconfirmedNewNcrDialogUploadFileId" class="TXFileId">
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unconfirmedNewNcrDialogDescriptionGroup">
							<label class="TXModalLabel col-md-3" id="unconfirmedNewNcrDialogDescriptionLabel">不符合项描述</label>
							<div class="col-md-8">
								<textarea rows="3" class="TXModalCombo form-control" placeholder="不符合描述" id="unconfirmedNewNcrDialogDescription" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1" id="unconfirmedNewNcrDialogDescriptionLabelIco">*</label>
						</div>
						<div class="form-group" style="display: none;" id="unconfirmedNewNcrDialogDepartmentGroup">
							<label class="TXModalLabel col-md-3">主责部门</label>
							<div class="col-md-8">
								<select id="unconfirmedNewNcrDialogDepartment" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">应回复时间</label>
							<div class="col-md-8">
								<input id="ModalnewNcrTime" type="text" class="TXModalCombo form-control" readonly/>
								<input id="ModalnewNcrTimeVal" type="hidden" />
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="unconfirmedNewNcrDialogCancelBtn" onclick=clearUnconfirmedNewNcrDialog() class="TXModalBTNCancel btn btn-default" type="button" data-dismiss="modal" >取消</button>
					&nbsp;
					<button id="unconfirmedNewNcrDialogSubmitBtn" class="TXModalBTNSubmit btn btn-success" type="button">确定</button>
				</div>		
			</div>
		</div>
	</div>