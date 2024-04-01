<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<sec:authorize access="isAuthenticated()">
   <sec:authentication property="principal" var="principal"/>
</sec:authorize>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="stylesheet" href="/resources/css/member/mypage.css"> 
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup">
		<div class="h3">알림정보</div>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 아이디</span>
					<span id="id" >${principal.member.id }</span> 
				</li>
				<li>
					<span class="subject">ㆍ 닉네임</span>
					<span id="nickname">${principal.member.nickname }</span> 
				</li>				
				<li>
					<span class="subject">ㆍ 휴대폰 번호</span>
					<span id="phone">${principal.member.phone }</span> 
				</li>
				<li>
					<span class="subject">ㆍ 이메일</span>
					<span id="email">${principal.member.email }</span> 
				</li>
				<li>
					<span class="subject">ㆍ 가입일</span>
					<span id="reg_date">${principal.member.reg_date }</span> 
				</li>
			</ul>
		</div>
		<div class="button-align center">
			<button type="submit" id="btn_submit" class="button button-point" accesskey="s" onclick="modify(this.form)">정보수정</button>
			<button type="submit" id="btn_submit" class="button" accesskey="s" onclick="deletes(this.form, ${principal.member.m_idx })">탈퇴</button>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/mypage.js"></script>
</html>
