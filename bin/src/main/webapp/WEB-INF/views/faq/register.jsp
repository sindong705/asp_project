<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>FAQ 등록</title>
<link rel="stylesheet" href="/resources/css/faq/register.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">FAQ 등록</h1>
       	</div>
           <div id="form-container">
			<form id="registerform" method="post">
				<table id="registertable">
					<tr>
						<th>유형</th>
						<td width="700">
							<select id="primary-category" name="faq_type" class="form-select" aria-label="Default select example">
							  <option value="" selected>질문유형 선택</option>
							  <option value="A">이용안내</option>
							  <option value="B">파티문의</option>
							  <option value="C">회원가입 및 정보</option>
							  <option value="D">입출금 및 환불</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input class="form-control" type="text" name="title" placeholder="제목을 입력해주세요." aria-label="default input example"></td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
						  <textarea class="form-control" name="content"></textarea>
						</td>
					</tr>
					<tr>
						<td id="registerBtn" colspan="2">
							<input type="hidden" name="writer" value="${principal.member.name }">	
							<input type="button" id="faqRegister" value="등록">
							<input type="button" id="faqList" value="목록">
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/faq/register.js"></script>
</html>