<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<sec:authorize access="isAuthenticated()">
	<sec:authentication property="principal" var="principal" />
</sec:authorize>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지 비밀번호 확인</title>
<link rel="stylesheet" href="/resources/css/member/mypageLogin.css">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<div class="wrapper">

		<div class="form-signin w-100 m-auto">
			<form id="mypageLogin_form" method="post">
				<input type="hidden" name="${_csrf.parameterName}"
					value="${_csrf.token}"> <input type="hidden"
					name="deletechk" value="${param.deletechk}">
				<h2 style="margin-bottom: 1.5rem;">비밀번호 확인</h2>
				<div class="form-floating">
					<input type="text" class="form-control" name="id" id="id"
						value="${principal.member.id }" readonly> <label for="id">아이디</label>
				</div>
				<div class="form-floating">
					<input type="password" class="form-control" name="password"
						id="password" placeholder="패스워드를 입력하세요"> <label
						for="password">패스워드를 입력하세요</label>
				</div>
				<c:if test="${isPasswordMatch == false }">
					<div class="login_warn">비밀번호를 잘못 입력하셨습니다.</div>
				</c:if>

				<button class="btn btn-primary w-100 py-2 fs-3"
					id="mypageLogin_button" type="submit"
					style="font-size: 22px !important; margin: 1rem 0;">로그인</button>

				<c:if test="${isPasswordMatch == null }">
					<div class="form-text fs-6">
						<span class="text-point">회원님의 정보를 안전하게 보호하기 위해 <br>비밀번호를
							한번 더 확인합니다.
						</span>
					</div>
				</c:if>
			</form>
		</div>
	</div>

	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/member/mypageLogin.js"></script>
</html>