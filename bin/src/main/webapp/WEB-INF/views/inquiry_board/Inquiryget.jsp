<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>        
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>1:1 문의</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>

	<sec:authentication property="principal" var="principal"/>
	
	<form>
		<div class="mw-800 form-signup">
			<div class="h3">
				<span class="title-point">1:1</span> 문의
			</div>
			<div class="form-round signup">
				<ul class="form-list">
					<li>
						<span class="subject">ㆍ 문의유형</span>
						<span class="text">
							<c:if test="${vo.inquiry_type eq 'A'}">
								이용문의
							</c:if>
							<c:if test="${vo.inquiry_type eq 'B'}">
								파티문의
							</c:if>
							<c:if test="${vo.inquiry_type eq 'C'}">
								회원문의
							</c:if>
							<c:if test="${vo.inquiry_type eq 'D'}">
								입출금문의
							</c:if>
							<c:if test="${vo.inquiry_type eq 'E'}">
								기타
							</c:if>
						</span> 
					</li>
					<li>
						<span class="subject">ㆍ 이름</span>
						<span class="text">${vo.writer}</span> 
					</li>				
					<li>
						<span class="subject">ㆍ 제목</span>
						<span class="text">${vo.title }</span> 
					</li>
					<li>
						<span class="subject">ㆍ 내용</span>
						<span class="text">${vo.content }</span> 
						<input type="hidden" name="i_idx" value="${vo.i_idx }">
						<input type="hidden" name="reg_date" value="${vo.reg_date }">
					</li>
					<li>
						<span class="subject">ㆍ 파일 첨부</span>
						<span class="text">
							<div class="uploadResult">
								<ul></ul>
							</div>
						</span> 	
					</li>
				</ul>
			</div>
			
			<div class="panel-body-btns">
				<sec:authorize access="isAuthenticated()">	<!-- 로그인이 되었냐? -->
					<c:if test="${principal.member.nickname eq vo.writer}">
						<button type="button" class="button button-point" id="modifyBtn">수정</button>
						<button type="button" class="button button-point2" id="removeBtn">삭제</button>
					</c:if>
				</sec:authorize>		
				<button type="button" class="button" id="indexBtn">목록으로 이동</button>	
			</div>
		</div>
	</form>

	<div class="panel-footer">
		<from method="post">
<%-- 		<div class="mw-800 form-signup">
				<div class="h3">
					<span class="title-point">댓글 등록</span>
				</div>
				<div class="form-round signup">
					<ul class="form-list">
						<li>
							<span class="subject">ㆍ 처리상태</span>
							<select name="status" class="status-st">
								<option value="A">대기</option>
								<option value="B">완료</option>
								<option value="C">확인중</option>
							</select> 
						</li>	
						<li>
							<span class="subject">ㆍ 작성자</span>
							<input type="text" name="id" style="background-color: #e9ecef;" value="${principal.member.nickname }" readonly="readonly">
						</li>	
						<li>
							<span class="subject">ㆍ 내용</span>
							<textarea rows="3" cols="80" name="content" class="text11"></textarea>
							<input type="hidden" name="i_idx" value="${vo.i_idx }">
							<input type="hidden" name="reg_date" value="${vo.reg_date }"> 
						</li>				
					</ul>
				</div> 
				
				<div class="panel-body-btns">
					<input type="button" value="등록" class="btn-a" id="addReplyBtn">
				</div>
			</div> --%>
		
			<!-- 화면에 나타나는 영역 -->
			<div class="mw-800 form-signup">
				<div class="h3">
					<span class="title-point">댓글</span>
				</div>
				<div class="form-round signup">
					<ul class="chat">
					</ul>
				</div>
			</div>
		</from>
	</div>

	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/Inquiry/Inquiryreply.js"></script>		<!-- 댓글 관련 통신만 수행 할 것이다.(API 호출 하는 것) -->
	<script type="text/javascript" src="/resources/js/Inquiry/InquiryGet.js"></script>	<!-- 동적인 일을 처리 할때는 이것 만 -->	
</body>
</html>