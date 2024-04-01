<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/main.css">
<script type="text/javascript" src="/resources/js/member/memberprincipal.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<div class="wrap">
    <div class="header">
    	<div class="top">
		    <div class="width-menu">
			    <div class="top-menu">
				    <a href="#" onclick="inquiryChk()">1:1 문의</a>
			    </div>
		    </div>
	    </div>
	    <div class="header-menu">
	   		<div class="width-menu">
	   			<div class="logo">
	   				<a href="/">
	   					<img alt="메인로고" src="/resources/images/prj_logo.png">
	   				</a>
	   			</div>
	   			<div class="login">
	   				<sec:authentication property="principal" var="principal"/>
					<sec:authorize access="isAuthenticated()">			
						<div class="header-user">
							<span class="picture">
								<a href="/alarm/alarm"><img alt="picture" src="/resources/images/get_sun.png">
								<span id="badge" class="position-absolute translate-middle badge rounded-pill bg-danger" style="top: 32px; right: 10px;">
								</span></a>
  							</span>
							<span class="arrow"><img alt="arrow" src="/resources/images/mymenu-arrow.png"></span>
							<div class="header-profile">
								<div class="block">
									<div class="name">
										${principal.member.nickname }
										<a href="#" onclick="mainLogout()" class="header-logout">
											<img alt="close" src="/resources/images/close-option.png">
										</a>
									</div>
									<c:if test="${principal.member.level eq 'C'}">
										<div class="grade">일반회원</div>
										<div class="party-btn"><a href="/page/partner">파티장신청</a></div>
									</c:if>
									<c:if test="${principal.member.level eq 'B'}">
										<div class="grade">파트너</div>
										<div class="party-btn"><a href="javascript:moveManage()">파티관리</a></div>
									</c:if>
									<c:if test="${principal.member.level eq 'A'}">
										<div class="grade">관리자</div>
										<div class="party-btn"><a href="/admin/home">관리자</a></div>
									</c:if>
								</div>
								<div class="block">
									<ul class="profile-menu">
										<li>
											<div class="point">
												<a href="/member/myPoint">
												<span class="icon"><img alt="icon" src="/resources/images/point.png"></span>
												<span class="point-text">POINT</span>
												<span class="right" id="memberPoint"></span>
												</a>
											</div>
										</li>
									</ul>
								</div>
								<div class="block">
									<ul class="profile-menu">
										<li><a href="/shop/participating" style="color: #43a051;">참여중인 파티</a></li>
										<li><a href="/member/mypage">회원정보확인</a></li>
										<li><a href="/payment/orderinquiry">결제내역 조회</a></li>
									</ul>
								</div>
								<div class="block">
									<ul class="profile-menu">
										<li><a href="/page/faq?i_type=A">FAQ</a></li>
										<li><a href="/inquiry_board/Inquirylist">1:1 문의</a></li>
									</ul>
								</div>
							</div>
						</div>			
					</sec:authorize>
					<sec:authorize access="isAnonymous()">
						<a href="/member/login" class="header-btn">로그인</a>
					</sec:authorize>
	   			</div>
	   		</div>
	   		<div class="shop-menu">
	   			<div class="menu">
	   				<ul style="padding-left:0">
	   					<li>
	   						<a href="/shop/list/10" class="menu-a">영상</a>
	   						<div class="sub-menu">
	   							<div class="sub-width">
	   								<ul id="codeone-10">
	   								</ul>
	   							</div>
	   						</div>
	   					</li>
	   					<li>
	   						<a href="/shop/list/20" class="menu-a">도서/음악</a>
	   						<div class="sub-menu">
	   							<div class="sub-width">
	   								<ul id="codeone-20">
	   								</ul>
	   							</div>
	   						</div>
	   					</li>
	   					<li>
	   						<a href="/shop/list/30" class="menu-a">게임</a>
	   						<div class="sub-menu">
	   							<div class="sub-width">
	   								<ul id="codeone-30">
	   								</ul>
	   							</div>
	   						</div>
	   					</li>
	   					<li>
	   						<a href="/shop/list/40" class="menu-a">기타</a>
	   						<div class="sub-menu">
	   							<div class="sub-width">
	   								<ul id="codeone-40">
	   								</ul>
	   							</div>
	   						</div>
	   					</li>
	   				</ul>
	   			</div>
	   		</div>
	    </div>
    </div>
    <div class="main">
    	<div class="width-container">
