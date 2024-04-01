<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.security.SecureRandom" %>
<%@ page import="java.math.BigInteger" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 화면</title>
<link rel="stylesheet" href="/resources/css/member/login.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" ></script>
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<div class="wrapper">
	
<div class="form-signin w-100 m-auto">
  <form id="login_form" method="post" onsubmit="return false;" >
  	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
    <img class="mb-4" src="/resources/images/prj_logo.png" alt="" width="250px">

    <div class="form-floating">
      <input type="text" class="form-control" name="id" id="id" placeholder="아이디를 입력하세요">
      <label for="id">아이디를 입력하세요</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" name="password" id="password" placeholder="패스워드를 입력하세요">
      <label for="password">패스워드를 입력하세요</label>
    </div>
     <c:if test = "${error == 0 }">
		<div class = "login_warn">사용자 ID 또는 비밀번호를 잘못 입력하셨습니다.</div>
	</c:if>
    <div class="form-check text-start my-3">
		<input class="form-check-input" type="checkbox" id="remember-me" name="remember-me">
		<label class="form-check-label" for="remember-me">자동 로그인</label>
		<span class="float-end">
			<a href="/member/joinAgree" class="find-info-text" >회원가입</a> &nbsp;|&nbsp;
			<a href="/member/find" class="find-info-text">아이디/비밀번호 찾기</a>
		</span>
    </div>
    <button class="btn btn-primary w-100 py-2 fs-3" id="login_button" type="submit" style="font-size: 22px !important;">로그인</button>
	<div class="form-text fs-6">
		<span class="text-point">회원이 아닌가요? 첫가입 시 500포인트!</span>
	</div>	
	<div class="form-sns-join">
		<a href="javascript:;" style="margin-top:20px; width:100%; font-weight: 500;" class="naver sns-naver" title="네이버" onclick="window.open('/member/registerAlert?type=naver_login', 'naver Login', 'width=500,height=600,top=200,left=500');">
			<img src="/resources/images/naver_logo.png" alt="">네이버 계정으로 로그인 하기
		</a>	
		<!-- <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1eafea66efb2c408d53924fa52fd0839&redirect_uri=	
			http://localhost:8081/kakao_login" style="margin-left:0px; margin-top:5px; width:100%; font-weight: 500;" class="kakao sns-kakao" title="카카오">
			<img src="/resources/images/kakao_logo.png" alt="">카카오 계정으로 로그인 하기			
		</a> -->
		<a href="javascript:;" style="margin-left:0px; margin-top:5px; width:100%; font-weight: 500;" class="kakao sns-kakao" title="카카오" onclick="window.open('/member/registerAlert?type=kakao_login', 'kakao Login', 'width=500,height=600,top=200,left=500');">
			<img src="/resources/images/kakao_logo.png" alt="">카카오 계정으로 로그인 하기	
		</a>
	</div>
	
  </form>
</div>
</div>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/login.js"></script>
</html>