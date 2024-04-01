<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/member/find.css">
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="findForm" id="findForm" name="findForm" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h4"><span class="text-purple">아이디</span> 찾기</div>
		<h4>회원가입 시 등록하신 이름 및 이메일 주소를 입력해 주세요.</h4> 
		<h4>가입하신 아이디 정보를 안내해드립니다.</h4>
		<div class="form-round signup">
			<ul class="form-list">
				<c:if test ="${result == 1 }">
					<div class = "login_warn">아이디 : ${resultId}</div>
				</c:if>
				<c:if test ="${result == 0 or result == null}">
					<li>
						<span class="subject">ㆍ 이름</span>
						<input type="text" id="name" name="name" value="" placeholder="이름" size="10">
					</li>
					<li>
						<span class="subject">ㆍ 이메일</span>
						<input type="text" class="email_input" name="email" id="email" placeholder="이메일">
						<span class="lightgrey inline-break" id="emailText" style="display: none;">이메일 사용이 가능합니다.</span>
					</li>
					
					<c:if test ="${result == 0 }">
					<li>
						<span class="lightgrey inline-break">일치하는 회원 정보가 없습니다. 다시 확인해주세요.</span>
					</li>
					</c:if>
				</c:if>			
			</ul>		
		</div>
		<div class="button-align center">
		<c:if test ="${result == 1 }">
			<button type="button" id="btn_submit" class="button button-purple" accesskey="s" onclick="location.href='/member/login'">확인</button>
		</c:if>
		<c:if test ="${result == 0 or result == null}">
			<button type="submit" id="btn_submit" class="button button-purple" accesskey="s" onclick="findSubmit1(this.form)">확인</button>
			<button type="button" id="cancel" class="button" onclick="location.href='/member/login'" style="cursor:pointer;">취소</button>
		</c:if>
		</div>
	</div>
</form>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h4"><span class="text-purple">비밀번호</span> 찾기</div>
		<h4>회원가입 시 등록하신 아이디, 이름 및 이메일 주소를 입력해 주세요.</h4> 
		<h4>비밀번호 변경을 안내해드립니다.</h4>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 아이디</span>
					<input type="text" id="id" name="id" value="" placeholder="아이디" size="10">
				</li>			
				<li>
					<span class="subject">ㆍ 이메일</span>
					<input type="text" class="email_input" name="email" id="email" placeholder="이메일">
					<span class="lightgrey inline-break" id="emailText" style="display: none;">이메일 사용이 가능합니다.</span>
				</li>
				<c:if test ="${result1 == 0 }">
					<li>
						<span class="lightgrey inline-break">일치하는 회원 정보가 없습니다. 다시 확인해주세요.</span>
					</li>
				</c:if>				
			</ul>			
		</div>
		<div class="button-align center">
			<button type="submit" id="btn_submit1" class="button button-purple" accesskey="s" onclick="findSubmit2(this.form)">확인</button>
			<button type="button" id="cancel1" class="button" onclick="location.href='/member/login'" style="cursor:pointer;">취소</button>
		</div>
	</div>
</form>
<script type="text/javascript">
<c:if test ="${result1 == 0 }">
window.scrollTo({top: 500, behavior : 'smooth'});
</c:if>
</script>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/find.js"></script>
</html>