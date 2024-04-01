<%@page import="java.net.URLEncoder"%>
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
<title>Insert title here</title>
</head>
<body>

</body>
<script type="text/javascript">
<%
	String paramType = request.getParameter("type");
	String typeChk = "";
	if(paramType != null){
		typeChk = paramType;
	}
	String clientId = "KLaOm3GoJkeH8xTjLT9y"; //애플리케이션 클라이언트 아이디값";
	String redirectURI = URLEncoder.encode("http://localhost:8081/" + typeChk, "UTF-8");
	SecureRandom random = new SecureRandom();
	String state = new BigInteger(130, random).toString();
	String apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
	apiURL += "&client_id=" + clientId;
	apiURL += "&redirect_uri=" + redirectURI;
	apiURL += "&state=" + state;
	session.setAttribute("state", state);
%>
<c:choose>
	<c:when test="${setText == null}">
		<c:if test = "${PopCheck == null and (type eq 'kakao_login' or type eq 'kakao_callback' or type eq 'kakao_update')}">
			location.href = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1eafea66efb2c408d53924fa52fd0839&redirect_uri=http://localhost:8081/${type}";
		</c:if>
		<c:if test = "${PopCheck == null and (type eq 'naver_login' or type eq 'naver_callback' or type eq 'naver_update')}">
			location.href = "<%=apiURL%>"
		</c:if>		
		<c:if test = "${PopCheck == 1 }"> //계정 미존재, 회원가입 페이지로 이동
			opener.location = "/member/join?sns";
			self.close();
		</c:if>
		<c:if test = "${PopCheck == 2 }">	//계정 존재, 로그인되어 메인페이지로 이동
			opener.location = "/";
			self.close();
		</c:if>
		<c:if test = "${PopCheck == 5 }">	//마이페이지 sns 연결 
		opener.location.reload();
		self.close();
		alert("SNS 계정이 연결되었습니다.");
		</c:if>
	</c:when>
	<c:otherwise> 
		alert("${setText}");
		<c:if test = "${PopCheck == 3 }">
			self.close();
			opener.location='/member/login';	
		</c:if>
		<c:if test = "${PopCheck == 4 }">
			location.href='/member/login';		
		</c:if>	
		<c:if test = "${PopCheck == 6 }">
		location.href='/member/logout';		
		</c:if>		
	</c:otherwise>
</c:choose>
</script>
</html>