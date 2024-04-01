<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>password find</title>
<link rel="stylesheet" href="/resources/css/member/find_auth.css">
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<input type="hidden" name="num" value="${num}">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h4"><span class="text-purple">비밀번호</span> 찾기</div>
		<div class="divbold">이메일로 받으신 인증번호를 입력해 주세요.</div> 
		<div class="divbold">비밀번호 변경을 안내해드립니다.</div>
		<div class="form-round signup">
			<ul class="form-list">
				<li id="li_AuthenticationNumber">
					<span class="subject">ㆍ 인증번호</span>
					<input type="text" id="AuthenticationNumber" name="AuthenticationNumber" value="" placeholder="인증번호" size="10">
					<button type="button" id="AuthenticationChk" class="button round button-purple phone" onclick="validate(this.form)">인증번호확인</button>
				</li>
		
				<li id="li_newPassword" style="display: none;">
					<span class="subject">ㆍ 새 비밀번호</span>
					<input type="password" class="newPassword_input" name="newPassword" id="newPassword" placeholder="새 비밀번호">
					<span class="lightgrey inline-break pw_input_3" id="pw" style="display: none;">새 비밀번호 사용이 가능합니다.</span>
				</li>
				<li id="li_newPasswordCk" style="display: none;">
					<span class="subject">ㆍ 새 비밀번호 확인</span>
					<input type="password" class="newPasswordCk_input" name="newPasswordCk" id="newPasswordCk" placeholder="새 비밀번호 확인">
					<span class="lightgrey inline-break pw_input_1" style="display: none;">새 비밀번호가 일치합니다.</span>
				<span class="lightgrey inline-break pw_input_2" style="display: none;">새 비밀번호가 일치하지 않습니다.</span>
				</li>				
			</ul>
			
		</div>
		<div class="button-align center" id="div_button" style="display: none;">
			<button type="submit" id="btn_submit" class="button button-purple" accesskey="s" onclick="findSubmit(this.form)">확인</button>
			<button type="button" id="cancel" class="button" onclick="location.href='/member/login'" style="cursor:pointer;">취소</button>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>	
</body>
<script type="text/javascript" src="/resources/js/member/find_auth.js"></script>
</html>