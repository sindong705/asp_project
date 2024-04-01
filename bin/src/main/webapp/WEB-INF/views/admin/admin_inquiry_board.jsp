<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 1:1 문의</title>
</head>
<body>

	<jsp:include page="../layout/admin_header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div id="content-container">
		<div id="service-container">
			<h3 id="inquiryboard-tab-title">관리자 1:1문의</h3>
			
			<div id="inquiryboard-search">
				<form method="post" id="inquiryboard-form">
					<select id="category" class="form-select" aria-label="Default select example">
					  <option value="all" selected>문의</option>
					  <option value="inquiry_type2">이용문의</option>
					  <option value="inquiry_type3">파티문의</option>
					  <option value="inquiry_type4">회원문의</option>
					  <option value="inquiry_type5">입출금문의</option>
					  <option value="inquiry_type6">기 타</option>					
					</select>
					
					<select id="detailSearch" class="form-select" aria-label="Default select example">
					  <option value="status" selected>상태</option>
					  <option value="status2">대기</option>
					  <option value="status3">완료</option>
					  <option value="status4">확인중</option>
					</select>
								
					<input type="button" id="search" value="검색">
					<input type="button" id="reset" value="초기화">
					<input type="hidden" name="id" value="${principal.member.id}">
					<input type="hidden" name="content" value="${vo.content }">
					<input type="hidden" name="phone" value="${vo.phone }">
					<input type="hidden" name="with_status" value="${vo.with_status }">
					<input type="hidden" name="m_idx" value="${vo.m_idx }">
					<input type="hidden" name="i_idx" value="${vo.i_idx }">
					<input type="hidden" name="c_idx" value="${vo.c_idx }">
				</form>		
			</div>
			
			<div id="inquiryboardList">
				<table>
					<thead>
						<tr>
							<th>상담유형</th>
							<th>처리결과</th>
							<th>제 목</th>
							<th>작성자</th>
							<th>날 짜</th>
							<th>관 리</th>
						</tr>
					</thead>
					<tbody class="aa">
					
					</tbody>
				</table>
			</div>				

			<!-- page -->
			<div class="page-wrap">
				<ul class="page-nation">
				
				</ul>
			</div>
			
		</div>
	</div>

	<!-- 모달창  -->
	<div id="modal" class="modal-overlay">
        <div class="modal-window">
        	<div class="close-area">Ⅹ</div>
            <div class="title">
                <h5><span class="writer"></span> 님의 문의</h5>
            </div>
            <div class="content">
                <table>
                	<tr>
                		<td class="center">제목</td>
                		<td id="title"></td>
                	</tr>
                	<tr>
                		<td class="center">댓글내용</td>
                		<td id="contents"></td>
                	</tr>
                </table>
            </div>
            
            <!-- 여기부터 모달창 답변 내용 -->
            
            <div class="title">
                <h5><span>답변</span> 작성</h5>
            </div>
            <div class="content">
            	<form method="post" id=replyfrom>
	            	<table>
	                	<tr>
	                		<td><textarea class="form-control" name="content"></textarea></td>
	                	</tr>
	                </table>
            		<div class="status">
	                <span class="subject">ㆍ 처리상태</span>
						<select name="status" class="status-st">
						<option value="A">대기</option>
						<option value="B">완료</option>
						<option value="C">확인중</option>
						</select> 
            		</div>
            		<div>
            			<input type="button" id="answerRegister" value="등록">	
            		</div>
            		<input type="hidden" name="phone" value="">
            		<input type="hidden" name="i_idx" value="${vo.i_idx }">
            		<input type="hidden" name="writer" value="${principal.member.nickname }">
            		<input type="hidden" name="c_idx" value="">
            		<input type="hidden" name="m_idx" value="">
            		<input type="hidden" name="inquiry_type" value="">
            	</form>
            </div>
        </div>
    </div>
	
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/Inquiry/Inquiryreply.js"></script>
<script type="text/javascript" src="/resources/js/admin/admin_inquiry_board.js"></script>
</html>