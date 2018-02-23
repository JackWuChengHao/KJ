<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="unconfirmedChangeNcrDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">修改不符合项</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="unconfirmedChangeNcrDialogForm">
						<div class="form-group">
							<label class="TXModalLabelWarning col-md-3">驳回原因</label>
							<div class="col-md-9">
								<textarea rows="5" class="TXModalCombo form-control" id="unconfirmedChangeNcrDialogTurndownReasion" readonly></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">数据来源</label>
							<div class="col-md-8">
								<select id="unconfirmedChangeNcrDialogSource" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unconfirmedChangeNcrDialogAuditObjectDiv" style="display: none;">
							<label class="TXModalLabel col-md-3">审核对象</label>
							<div class="col-md-8">
								<input id="unconfirmedChangeNcrDialogAuditObject" type="text" id="Ncrobject" class="TXModalCombo form-control">
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group">	
							<label class="TXModalLabel col-md-3">开具项类型</label>
							<div class="col-md-8">
								<select id="unconfirmedChangeNcrDialogType" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unconfirmedChangeNcrDialogUploadDiv">
							<label class="TXModalLabel col-md-3">上传表单</label>
							<div class="col-md-8">
								<input type="file" name="" id="unconfirmedChangeNcrUpload" multiple class="file-loading">
								<input type="hidden" name="" id="unconfirmedChangeNcrDialogUploadFile" class="TXFileId">
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unconfirmedChangeNcrDialogDescriptionGroup" style="display: none;">
							<label class="TXModalLabel col-md-3">不符合项描述</label>
							<div class="col-md-8">
								<textarea rows="3" class="TXModalCombo form-control" placeholder="不符合描述" id="unconfirmedChangeNcrDialogDescribe" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">主责部门</label>
							<label class="TXModalContents col-md-8" id="unconfirmedChangeNcrDialogDepartment"></label>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="unconfirmedChangeNcrDialogCancelBtn" onclick=clearUnconfirmedChangeNcrDialog() class="TXModalBTNCancel btn btn-default" type="button" data-dismiss="modal" >取消</button>
					&nbsp;
					<button id="unconfirmedChangeNcrDialogSubmitBtn" class="TXModalBTNSubmit btn btn-success" type="button">确定</button>
				</div>		
			</div>
		</div>
	</div>