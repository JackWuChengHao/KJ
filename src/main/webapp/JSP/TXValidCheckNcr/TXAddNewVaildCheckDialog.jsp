<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="newCheck" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">第<span id="newCheckIndex"></span>次有效性验证</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="newCheckForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">末次验证</label>
							<div class="TXModalContents col-md-8" id="">
								<label class="TXCheckBoxContents col-md-4"><input id="newCheckDialogIsLast" name="point" class="TXCheckBox" type="radio" value='1'/>&nbsp;是</label>
								<label class="TXCheckBoxContents col-md-4"><input name="point" class="TXCheckBox" type="radio" value='2' checked/>&nbsp;否</label>
							</div>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-3">上传表单</label>
							<div class="TXModalContents col-md-8" id="">
								<input type="file" name="" id="addNewVaildCheckDialogUpload" multiple class="file-loading">
								<input type="hidden" id="newCheckDialogUploadFile" class="TXFileId">
							</div>
						</div>
					</form>
				</div>
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button type="button" onclick=clearNewCheckForm() class="TXModalBTNCancel btn btn-default" data-dismiss="modal">关闭</button>
					<button id="newCheckDialogSubmitBtn" class="TXModalBTNSubmit btn btn-success" type="button">确定</button>
				</div>		
			</div>
		</div>
	</div>