<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.io.InputStream" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/shop/get.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	<sec:authentication property="principal" var="principal"/>
	
	<div id="menu-title">
		<span id="category">${vo.c_primary }</span>
		<input type="button" id="makeparty" value="파티 만들기"> 
	</div>
	
	<div id="title-container">
		<c:set var="servicecode" value="${vo.codeone }${vo.codetwo}" />
		<c:choose>
			<c:when test="${servicecode eq 100 || servicecode eq 200 || servicecode eq 300 || vo.codeone eq 400}">
				<img src="/resources/images/sun.png" id="etclogo">
			</c:when>
			<c:otherwise>
				<c:set var="imageFileName" value="/resources/images/servicelogo/${servicecode}.jpg" />
				<c:set var="defaultImageFileName" value="/resources/images/sun.png" />
				<%
				    String imageFileName = (String)pageContext.getAttribute("imageFileName");
				    String defaultImageFileName = (String)pageContext.getAttribute("defaultImageFileName");
				    InputStream inputStream = request.getServletContext().getResourceAsStream(imageFileName);
				%>
				<img src="<%= (inputStream != null) ? imageFileName : defaultImageFileName %>" id="servicelogo">
			</c:otherwise>
		</c:choose>
		<div id="title-area">
			<span id="servicename">${vo.c_secondary }</span>
			<span id="pidx" pidx="${vo.p_idx }">파티번호 : ${vo.p_idx }</span>
			<span id="title">${vo.title }</span>
		</div>
	</div>
	
	<div id="partyinfo">
		<span id="nick" nick="${vo.nickname }" pid="${vo.id }">${vo.nickname }</span>
		<!-- 파티장, 파티원들만 보이게 함 -->
		<sec:authorize access="isAuthenticated()">
			<c:if test="${principal.member.nickname eq vo.nickname}">
				<input type="button" id="partnerInfo" value="아이디/패스워드 보기">
			</c:if>
			<c:forEach var="mvo" items="${paymembers }">
				<c:if test="${principal.member.nickname eq mvo.nickname}">
					<input type="button" id="partnerInfo" value="아이디/패스워드 보기">
				</c:if>
			</c:forEach>
		</sec:authorize>
		
		<div>
			<c:choose>
				<c:when test="${vo.datediff <= 0 || vo.status=='N' }">
					<span style="font-weight: bold; color:red;">모집 마감</span>
				</c:when>
				<c:otherwise>
					<span id="end-date">종료일 : ${vo.end_date } (${vo.datediff }일 / 1일 ${vo.price }원)</span>
					<span id="price">&nbsp; | &nbsp;&nbsp;참여비용 : <fmt:formatNumber value="${vo.totalprice }" pattern="#,###" />원</span>
				</c:otherwise>
			</c:choose>
		</div>
	</div>
	
	<!-- 모달 창 -->
	<div id="modal" class="modal-overlay">
        <div class="modal-window">
        	<div class="close-area">Ⅹ</div>
            <div class="title">
                <h5><span>계정</span> 정보</h5>
            </div>
            <div class="content">
                <table>
                	<tr>
                		<td class="center">아이디</td>
                		<td>${vo.share_id }</td>
                	</tr>
                	<tr>
                		<td class="center">비밀번호</td>
                		<td>${vo.share_pw }</td>
                	</tr>
                	<tr>
                		<td class="center">문의처</td>
                		<td>${vo.phone }</td>
                	</tr>
                </table>
            </div>
        </div>
    </div>
	
	
	<div id="partystatus">
		<c:if test="${vo.curr_party > 0 }">
			<c:choose>
				<c:when test="${vo.curr_party == vo.party_num }">
					<c:forEach var="mvo" items="${paymembers }">
						<div class="partymeminfo">
							<img src="/resources/images/get_sun.png" class="participation"><br>
							<span id="mnickname" mnickname="${mvo.nickname }" >${mvo.nickname }</span><br>
							<span class="approved_at">${mvo.approved_at } 참여</span>
						</div>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<c:forEach var="mvo" items="${paymembers }">
						<div class="partymeminfo">
							<img src="/resources/images/get_sun.png" class="participation"><br>
							<span id="mnickname" mnickname="${mvo.nickname }" >${mvo.nickname }</span><br>
							<span class="approved_at">${mvo.approved_at } 참여</span>
						</div>
					</c:forEach>
					<c:forEach var="i" begin="0" end="${vo.party_num - vo.curr_party - 1}">
						<div class="partymeminfo">
							<img src="/resources/images/get_sun.png" class="non-participation">
						</div>
					</c:forEach>
				</c:otherwise>
			</c:choose>
		</c:if>
		<c:if test="${vo.curr_party == 0 }">
			<c:forEach var="i" begin="0" end="${vo.party_num -1}">
				<img src="/resources/images/get_sun.png" class="non-participation">
			</c:forEach>
		</c:if>	
	</div>
	<div id="announcement">
		<div id="rules" rule="${vo.rule }"></div>
		<div id="comment"><pre>${vo.comment }</pre></div>
	</div>
	
	<!-- 익명 사용자의 경우(로그인 X) -->
	<sec:authorize access="isAnonymous()">
		<form method="post" id="participateForm">
			<div id="checkform">
				<input type="checkbox" id="agree">
				<label class="form-check-label" for="agree"> 파티 규칙에 대한 내용 확인 및 파티 알림 수신에 동의합니다.</label>
			</div>
			<div class="btnarea">
				<input type="hidden" name="pn" value="${vo.p_idx }">
				<input type="hidden" name="party_num" value="${vo.party_num }">
				<input type="hidden" name="curr_party" value="${vo.curr_party }">
				<input type="hidden" name="status" value="${vo.status }">
				
				<input type="button" value="참여" id="participate">
				<input type="button" value="목록" id="getpartylist">
			</div>
		</form>
	</sec:authorize>
	
	<!-- 인증된 사용자 (로그인 O) -->
	<sec:authorize access="isAuthenticated()">
		<c:choose>
			<c:when test="${principal.member.nickname eq vo.nickname}">
				<div class="btnarea" id="partnerBtns">
					<input type="button" value="관리" id="myPartyManage">
					<input type="button" value="목록" id="getpartylist">
				</div>
			</c:when>
			<c:otherwise>
				<form method="post" id="participateForm">
					<div id="checkform">
						<input type="checkbox" id="agree">
						<label class="form-check-label" for="agree"> 파티 규칙에 대한 내용 확인 및 파티 알림 수신에 동의합니다.</label>
					</div>
					<div class="btnarea">
						<input type="hidden" name="pn" value="${vo.p_idx }">
						<input type="hidden" name="party_num" value="${vo.party_num }">
						<input type="hidden" name="curr_party" value="${vo.curr_party }">
						<input type="hidden" name="status" value="${vo.status }">
						
						<input type="button" value="참여" id="participate">
						<input type="button" value="목록" id="getpartylist">
					</div>
				</form>
			</c:otherwise>
		</c:choose>
	</sec:authorize>
	
	<hr>
	
	<!-- 댓글 영역 -->
	<div id="reply-title">댓글</div>
	<div id="replyArea">
		<form id="replyform" method="post">
		<div id="reply-select">
			<select id="comment-to" name="comment_to" class="form-select">
			</select>
			
			<div id="checkprivate">
				<input class="form-check-input" type="checkbox" name="private_chk" value="Y" id="private">
				<label class="form-check-label" for="private"> 비밀글</label>
			</div>
		</div>
		<div id="replycontainer">
			<textarea class="form-control" name="comment"></textarea>
		</div>
		<div id="replybtn">
			<input type="hidden" name="p_idx" value="${vo.p_idx }">
		
			<input type="hidden" name="writer" value="">
			<input type="button" value="등록" id="replyregister">
		</div>
		</form>
	</div>
	
	<div id="chatarea">
	</div>
	
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/shop/partyreply.js"></script>
	<script type="text/javascript" src="/resources/js/shop/get.js"></script>
</body>
</html>
