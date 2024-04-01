<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/resources/js/member/memberprincipal.js"></script>
<link rel="stylesheet" href="/resources/css/partner/partner_header.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<sec:authentication property="principal" var="principal"/>

	<div id="partner-header">
		<a href="/"><img alt="메인로고" src="/resources/images/prj_logo.png"></a>
		<ul id="partner-nav">
			<li><a href="/member/mypage">${principal.member.name }</a></li>
			<li><a href="/">메인</a></li>
			<li><a href="#" onclick="partnerLogout()">로그아웃</a></li>
		</ul>
	</div>
	<div id="partner-menu">
		<ul class="list-group">
		  <li class="list-group-item"><a href="/partner/manage">파티관리</a></li>
		  <li class="list-group-item"><a href="/partner/replymanage">댓글보기</a></li>
		  <li class="list-group-item"><a href="/partner/partyinfo">참여정보</a></li>
		  <li class="list-group-item"><a href="/partner/partycancel">취소내역</a></li>
		  <li class="list-group-item"><a href="/partner/withdraw">출금관리</a></li>
		  <li class="list-group-item"><a href="/partner/partnerinfo">정보수정</a></li>
		</ul>
	</div>
	
	
	