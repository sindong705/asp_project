<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/shop/list.css">
<link href="/resources/css/admin/all.min.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
<link href="/resources/css/admin/sb-admin-2.min.css" rel="stylesheet">
<script src="/resources/js/admin/jquery.min.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<c:if test="${not empty video }">
		<div class="video">
			<div class="container-title">
				추천 <span class="text-point">영상</span>
			</div>
			<div class="container-box">
				<div class="video-container">
					<c:choose>
						<c:when test="${not empty video }">
							<c:forEach var="video" items="${video }" begin="0" end="3">
								<div class="video-box">
									<a href="#" class="thumb" data-toggle="modal" data-target="#moaModal${video.idx}">
										<img src="https://img.youtube.com/vi/${video.videoid}/mqdefault.jpg">
									</a>
								</div>
													
								<div class="modal fade" id="moaModal${video.idx}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
										<div class="modal-content">
											<div class="modal-header">
												<button class="btn video-close" type="button" data-dismiss="modal">
													<i class="fas fa-fw fa-xmark"></i>
												</button>
											</div>
											<div class="modal-body">
												<iframe src="https://www.youtube.com/embed/${video.videoid}" frameborder="0" allowfullscreen></iframe>
											</div>
										</div>
									</div>
								</div>
							</c:forEach>
						</c:when>
						<c:otherwise>
							데이터가 없습니다.
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</div>
	</c:if>
	
	<div id="menu-title">
		<span id="category" c1="${codeone }" c2="${codetwo }">${category }</span>
		<input type="button" id="makeparty" value="파티 만들기"> 
	</div>
	<div id="partyinfo-container">
		
	</div>
	
	<button id="load-more-btn">더 보기</button>
	
	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/shop/list.js"></script>
<!-- Bootstrap core JavaScript-->
<script src="/resources/js/admin/bootstrap.bundle.min.js"></script>
<script src="/resources/js/admin/sb-admin-2.min.js"></script>
</html>