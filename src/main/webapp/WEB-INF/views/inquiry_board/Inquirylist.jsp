<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>1:1 문의</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<!-- 1. 문의하기 -->
	<div>
		<h1 class="page-header"> <span class="text-point">1:1</span> 문의 </h1>
	</div>
	
	<!-- 2. 정보 제공 내용 -->
	<div class="heading-explanation">
		사용목적에 적합한 게시판 활용을 위하여 광고성 글이나 불법게시물(상업물, 음란물, 욕설)등<br>
		본 사이트와 무관한 게시물은 관리자 권한으로 통보 없이 임의 삭제될 수 있습니다.<br>
		아울러 질문과 답변을 하는 게시판이므로 성격에 맞지 않는 글을 삭제될 수 있음을 알려드립니다.
	</div>
	
	<!-- 3. 문의하기 버튼 -->
	<div class="panel-heading">
		<sec:authorize access="isAuthenticated()">
			<c:if test="${principal.member.nickname eq vo.writer}">
				<button type="button" class="btn_inquiry" id="registerBtn">문의하기</button>
			</c:if>	
		</sec:authorize>		
	</div>
	
	<!-- 4. 표 -->
	<div class="panel-body">
		<table style="text-align: center;">
			<thead>
				<tr>
					<th>상담유형</th>
					<th>처리결과</th>
					<th>제 목</th>
					<th>작성자</th>
					<th>날 짜</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="vo" items="${list }">
					<tr>
						<c:choose>
							<c:when test="${vo.inquiry_type eq 'A' }">
								<td>이용문의</td>
							</c:when>
							<c:when test="${vo.inquiry_type eq 'B' }">
								<td>파티문의</td>
							</c:when>
							<c:when test="${vo.inquiry_type eq 'C' }">
								<td>회원문의</td>
							</c:when>
							<c:when test="${vo.inquiry_type eq 'D' }">
								<td>입출금문의</td>
							</c:when>
							<c:when test="${vo.inquiry_type eq 'E' }">
								<td>기타</td>
							</c:when>
						</c:choose>
						<c:choose>
							<c:when test="${vo.status eq 'A'}">
								<td class="word-color1">대기</td>
							</c:when>
							<c:when test="${vo.status eq 'B'}">
								<td class="word-color2">완료</td>
							</c:when>
							<c:when test="${vo.status eq 'C'}">
								<td class="word-color3">확인중</td>
							</c:when>						
						</c:choose>
						<td><a href="${vo.i_idx }">${vo.title }</a></td>
						<td>${vo.writer }</td>
						<td>${vo.reg_date }</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	
		<!-- 5. 페이지 번호 -->
		<div class="page-wrap">
			<ul class="page-nation">
				<c:if test="${pageMaker.prev }">
					<li class="previous">
						<a href="${pageMaker.startPage-1 }"> &lt; </a>
					</li>
				</c:if>
				<c:forEach var="num" begin="${pageMaker.startPage }" end="${pageMaker.endPage }" step="1">
					<li>
						<a href="${num }" class="${pageMaker.cri.pageNum == num ? 'active' : '' }"> ${num } </a>
					</li>							<!-- 진하게 숫자에 내가 어디인지를 확인하는게 active -->
				</c:forEach>
				<c:if test="${pageMaker.next }">
					<li>
						<a href="${pageMaker.endPage+1 }"> &gt; </a>
					</li>
				</c:if>
			</ul>
		</div>
		
	</div>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/Inquiry/InquiryList.js"></script>
</body>
</html>