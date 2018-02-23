<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="unpassedCommitNcrDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">提交验证意见</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="unpassedCommitNcrDialogForm">
						<div class="form-group">
							<label class="TXModalLabel col-md-3">措施编号</label>
							<label class="TXModalContents col-md-8" id="unpassedCommitNcrDialogMeasureNumber"></label>
						</div>
						<div class="form-group" id="unpassedCommitNcrDialogUploadDiv">
							<label class="TXModalLabel col-md-3">上传表单</label>
							<div class="col-md-8">
								<input type="file" name="" id="unpassedCommitNcrDialogUpload" multiple class="file-loading">
								<input type="hidden" id="unpassedCommitNcrDialogFileId" class="TXFileId"/>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unpassedCommitNcrDialogJudgeDiv">
							<label class="TXModalLabel col-md-3">实施进度</label>
							<div class="col-md-8">
								<select id="measureJudge" class="TXModalSelect form-control">
									<option value="-1">--请选择--</option>
									<option value="0">延期关闭</option>
									<option value="1">按期关闭</option>
									<option value="2">延期未完成</option>
									<option value="3">未到期待观察</option>
								</select>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
						<div class="form-group" id="unpassedCommitNcrDialogAuditDiv">
							<label class="TXModalLabel col-md-3">验证意见</label>
							<div class="col-md-8">
								<textarea rows="3" class="TXModalCombo form-control" placeholder="验证意见" id="unpassedCommitNcrDialogAudit" maxlength="500"></textarea>
							</div>
							<label class="TXNecessaryItem col-md-1">*</label>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="unpassedCommitNcrDialogCancelBtn" onclick=clearUnpassedCommitNcrDialogForm() type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal" >取消</button>
					&nbsp;
					<button id="unpassedCommitNcrDialogSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
					<button id="unpassedCommitNcrDialogWordSubmitBtn" onclick=showUnpassedCommitNcrDialogWordSubmitBtn() type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
				</div>		
			</div>
		</div>
	</div>