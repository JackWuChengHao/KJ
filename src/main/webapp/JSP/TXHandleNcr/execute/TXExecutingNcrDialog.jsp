<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="modal" id="unpassedCommitNcrDialog" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<!-- 头部 -->
				<div class="modal-header">
					<h4 class="modal-title">提交验证意见</h4>
				</div>
				<!-- 主体 -->
				<div class="modal-body">
					<form class="form-horizontal" id="">
						<div class="form-group">
							<label class="col-md-offset-1 col-md-2">措施编号</label>
							<label class="col-md-8">5645647</label>
						</div>
						<div class="form-group">
							<label class="col-md-offset-1 col-md-2">实施进度</label>
							<div class="col-md-8">
								<select id="" class="form-control">
									<option value="-1">--请选择--</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-offset-1 col-md-2">验证意见</label>
							<div class="col-md-8">
								<textarea rows="3" class="form-control" placeholder="验证意见" id=""></textarea>
							</div>
						</div>
					</form>
				</div>
				
				<!-- 尾部 -->
				<div class="modal-footer">
					<button id="newPrintCancelBtn" type="button" class="btn TXCancel" data-dismiss="modal">取消</button>
					&nbsp;
					<button id="newPrintSubmitBtn" type="button" class="btn TXConfrim">确定</button>
				</div>		
			</div>
		</div>
	</div>