<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>       
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>1:1 문의 수정</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="panel-body">
		<form method="post">
			<div class="mw-800 form-signup">
				<div class="h3">
					<span class="title-point">1:1</span> 문의 수정
				</div>
					<div class="form-round signup">
						<ul class="form-list">
							<li>
								<span class="subject">ㆍ 문의유형</span>
								<select name="inquiry_type">
										<option value="A">이용문의</option>
										<option value="B">파티문의</option>
										<option value="C">회원문의</option>
										<option value="D">입출금문의</option>
										<option value="E">기타</option>
								</select>
							</li>
							<li>
								<span class="subject">ㆍ 이름</span>
								<input type="text" name="writer" style="background-color: #e9ecef;" value="${vo.writer }" readonly="readonly">
							</li>
							<li>
								<span class="subject">ㆍ 제목</span> 
								<input type="text" name="title" value="${vo.title }">
							</li>
							<li>
								<span class="subject">ㆍ 내용</span>
								<textarea rows="10" cols="75" name="content">${vo.content }</textarea>
								<input type="hidden" name="i_idx" value="${vo.i_idx }">
							</li>
							<li>
								<span class="subject">ㆍ 파일 첨부</span> 
								<span class="uploadDiv"><input type="file" name="uploadFile" multiple="multiple"></span>
								<div class="uploadResult">
									<ul></ul>
								</div>
							</li>
						</ul>
					</div>
					
				<div class="panel-body-btns">
					<button type="button" class="button button-point btn" id="modifyBtn">수정</button>
					<button type="button" class="button button-point-1 btn" id="removeBtn">삭제</button>
					<button type="button" class="button btn" id="indexBtn">목록으로 이동</button>
				</div>
			</div>
		</form>
	</div>
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/Inquiry/Inquiryupload.js"></script>
	<script type="text/javascript" src="/resources/js/Inquiry/InquiryModify.js"></script>		
</body>
</html>