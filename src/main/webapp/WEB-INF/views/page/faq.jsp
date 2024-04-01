<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>faq</title>
<link rel="stylesheet" href="/resources/css/page/page.css">
<link rel="stylesheet" href="/resources/css/faq/faqPage.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="page-wrap">
		<div class="page-content">
			<div class="faq-title">
				<img alt="faq-img" src="/resources/images/prj_logo.png" class="faq-img">에 대해 궁금하시다고요?
			</div>
			<div class="faq-sub-title">
				사용자가 이용하고 있는 <span class="title-point">공유형 구독 서비스</span>를 허용된 범위 안에서
				<br>
				경제적이고 <span class="title-point">안전하게 모집 및 참여</span> 할 수 있도록 도와주는 서비스입니다.
				<br><br>
				또한 기프트상품권, 이용권, 상품권 등의 <span class="title-point">디지털 코드의 안전하고 편리한 거래</span>를 도와줍니다.
			</div>
			
			<div class="faq-tab">
				<a href="/page/faq?i_type=A" class="active">이용안내</a>
				<a href="/page/faq?i_type=B">파티문의</a>
				<a href="/page/faq?i_type=C">회원가입 및 정보</a>
				<a href="/page/faq?i_type=D">입출금 및 환불</a>
			</div>
			
			<div class="faq-content">
				<c:forEach var="vo" items="${list }" varStatus="status">
					<div class="accordion accordion-flush" id="accordionFlushExample">
						<div class="accordion-item">
							<div class="accordion-header">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${status.count}" aria-expanded="false" aria-controls="flush-collapse${status.count}">
									${vo.title }
								</button>
							</div>
							<div id="flush-collapse${status.count}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
								<div class="accordion-body"><pre>${vo.content }</pre></div>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>
	</div>
	
	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/faq/page.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</html>