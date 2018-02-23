<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="updateUserDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="TXModal modal-content">
				<!-- 头部 -->
				<div class="TXModalHeadLine modal-header">
					<h4 class="TXModalTitle modal-title">更新用户角色</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<label class="TXModalLabel col-md-2">姓名</label>
							<label class="TXModalContents col-md-8" id='dialogName'></label>
						</div>
						<div class="form-group">
							<label class="TXModalLabel col-md-2">用户角色</label>
							<div class="TXModalContents col-md-10" id="rolesGroup">
								<div class="form-group">
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" value='1'/>&nbsp;质量部经理</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" value='2'/>&nbsp;质量专员</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" value='3'/>&nbsp;内审员</label>
								</div>
								<div class="form-group">
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" value='4'/>&nbsp;部门经理</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" value='5'/>&nbsp;普通用户</label>
									<label class="TXCheckBoxContents col-md-4"><input class="TXCheckBox" type="checkbox" value='6'/>&nbsp;系统管理员</label>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="TXModalFootLine modal-footer">
					<button id="dialogUpdateUserCancelBtn" type="button" class="TXModalBTNCancel btn btn-default" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="dialogUpdateUserSubmitBtn" type="button" class="TXModalBTNSubmit btn btn-success">确定</button>
					<button id="dialogUpdateUserCloseBtn" type="button" class="TXModalBTNCancel btn btn-default" style="display:none;" data-dismiss="modal">关闭</button>
				</div>		
			</div>
		</div>
	</div>