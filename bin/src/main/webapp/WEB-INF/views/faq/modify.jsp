<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>FAQ 수정</title>
<link rel="stylesheet" href="/resources/css/faq/register.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">FAQ 수정</h1>
       	</div>
           <div id="form-container">
			<form id="registerform" method="post">
				<table id="registertable">
					<tr>
						<th>유형</th>
						<td width="700">
							<select id="primary-category" name="faq_type" class="form-select" aria-label="Default select example">
							  <option value="">질문유형 선택</option>
							  <option value="A" ${vo.faq_type == 'A' ? 'selected' : ''}>이용안내</option>
							  <option value="B" ${vo.faq_type == 'B' ? 'selected' : ''}>파티문의</option>
							  <option value="C" ${vo.faq_type == 'C' ? 'selected' : ''}>회원가입 및 정보</option>
							  <option value="D" ${vo.faq_type == 'D' ? 'selected' : ''}>입출금 및 환불</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input class="form-control" type="text" name="title" placeholder="제목을 입력해주세요." aria-label="default input example" value="${vo.title }"></td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
						  <textarea class="form-control" name="content">${vo.content }</textarea>
						</td>
					</tr>
					<tr>
						<td id="registerBtn" colspan="2">
							<input type="hidden" name="f_idx" value="${vo.f_idx }">	
							<input type="button" id="faqModify" value="수정">
							<input type="button" id="faqList" value="목록">
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/faq/modify.js"></script>
</html>