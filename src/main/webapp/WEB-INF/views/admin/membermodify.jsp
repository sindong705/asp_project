<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/admin/partymodify.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">회원 정보</h1>
        </div>
        
        <div id="form-container">
			<form id="registerform" method="post">
				<table id="registertable">
					<tr>
						<th>이름</th>
						<td><input class="form-control" type="text" name="name" value="${vo.name }" aria-label="default input example" readonly></td>
						<th>회원 등급</th>
						<td>
							<select class="form-select" name="level" style="width: 150px;" aria-label="Default select example">
								<option value="A" ${vo.level == 'A' ? 'selected' : ''}>관리자(A)</option>
								<option value="B" ${vo.level == 'B' ? 'selected' : ''}>파트너(B)</option>
								<option value="C" ${vo.level == 'C' ? 'selected' : ''}>일반(C)</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>아이디</th>
						<td><input class="form-control" type="text" name="id" value="${vo.id }" aria-label="default input example" readonly></td>
						<th>계좌 정보</th>
						<td>
							<select class="form-select" name="bank" style="width: 150px;" aria-label="Default select example">
								<option value="">선택</option>
								<option value="국민은행" ${vo.bank == '국민은행' ? 'selected' : ''}>국민은행</option>
								<option value="기업은행" ${vo.bank == '기업은행' ? 'selected' : ''}>기업은행</option>
								<option value="농협은행" ${vo.bank == '농협은행' ? 'selected' : ''}>농협은행</option>
								<option value="신한은행" ${vo.bank == '신한은행' ? 'selected' : ''}>신한은행</option>
								<option value="산업은행" ${vo.bank == '산업은행' ? 'selected' : ''}>산업은행</option>
								<option value="우리은행" ${vo.bank == '우리은행' ? 'selected' : ''}>우리은행</option>
								<option value="한국씨티은행" ${vo.bank == '한국씨티은행' ? 'selected' : ''}>한국씨티은행</option>
								<option value="하나은행" ${vo.bank == '하나은행' ? 'selected' : ''}>하나은행</option>
								<option value="SC제일은행" ${vo.bank == 'SC제일은행' ? 'selected' : ''}>SC제일은행</option>
								<option value="경남은행" ${vo.bank == '경남은행' ? 'selected' : ''}>경남은행</option>
								<option value="광주은행" ${vo.bank == '광주은행' ? 'selected' : ''}>광주은행</option>
								<option value="대구은행" ${vo.bank == '대구은행' ? 'selected' : ''}>대구은행</option>
								<option value="부산은행" ${vo.bank == '부산은행' ? 'selected' : ''}>부산은행</option>
								<option value="저축은행" ${vo.bank == '저축은행' ? 'selected' : ''}>저축은행</option>
								<option value="수협은행" ${vo.bank == '수협은행' ? 'selected' : ''}>수협은행</option>
								<option value="우체국" ${vo.bank == '우체국' ? 'selected' : ''}>우체국</option>
								<option value="전북은행" ${vo.bank == '전북은행' ? 'selected' : ''}>전북은행</option>
								<option value="제주은행" ${vo.bank == '제주은행' ? 'selected' : ''}>제주은행</option>
								<option value="카카오뱅크" ${vo.bank == '카카오뱅크' ? 'selected' : ''}>카카오뱅크</option>
								<option value="케이뱅크" ${vo.bank == '케이뱅크' ? 'selected' : ''}>케이뱅크</option>		
								<option value="토스뱅크" ${vo.bank == '토스뱅크' ? 'selected' : ''}>토스뱅크</option>				
							</select>
							<input class="form-control" type="text" name="bank_number" value="${vo.bank_number }" aria-label="default input example">
						</td>
					</tr>
					<tr>
						<th>닉네임</th>
						<td><input class="form-control" type="text" name="nickname" value="${vo.nickname }" aria-label="default input example" readonly></td>
						<th>출금 가능 금액</th>
						<td><input class="form-control" type="text" name="with_amount" value="${vo.with_amount }" aria-label="default input example"> 원</td>
					</tr>
					<tr>
						<th>휴대폰 번호</th>
						<td>
							<input class="form-control" type="text" name="phone" value="${vo.phone }" aria-label="default input example" readonly>
						</td>
						<th>포인트</th>
						<td>${vo.point } P</td>
					</tr>
					<tr>
						<th>이메일</th>
						<td>
							<input class="form-control" type="text" name="email" value="${vo.email }" aria-label="default input example">
						</td>
						<th style="padding-bottom: 10px;">가입일</th>
						<td style="padding-bottom: 10px;">${vo.reg_date }</td>
					</tr>
					<tr>
						<th style="padding-bottom: 25px; padding-top: 5px">SNS 연동 여부</th>
						<td style="padding-bottom: 25px; padding-top: 5px">
							<c:if test="${vo.naverid != null }">
								<span id="naver">NAVER <input type="button" id="naverDelete" m_idx="${vo.m_idx}" value="X"></span>
							</c:if>
							<c:if test="${vo.kakaoid != null}">
								<span id="kakao">KAKAO <input type="button" id="kakaoDelete" m_idx="${vo.m_idx}" value="X"></span>
							</c:if>
							<c:if test="${vo.naverid == null and vo.kakaoid == null}">
								<span>-</span>
							</c:if>
						</td>
						<th>마지막 정보 수정일</th>
						<td>${vo.update_date }</td>
					</tr>
					<tr>
						<td id="registerBtn" colspan="4" style="padding-top: 30px">
							<input type="hidden" name="m_idx" value="${vo.m_idx }">	
							<input type="hidden" name="auth" value="">
							
							<input type="button" id="memberModify" value="수정">
							<input type="button" id="memberList" value="목록">
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/admin/membermodify.js"></script>
</html>