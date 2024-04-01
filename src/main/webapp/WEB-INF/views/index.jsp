<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>모여라</title>
<link href="/resources/css/index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/admin/all.min.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
<link href="/resources/css/admin/sb-admin-2.min.css" rel="stylesheet">
<script src="/resources/js/admin/jquery.min.js"></script>
</head>
<body>
	<jsp:include page="layout/header.jsp"/>
	<div class="container2">
		<div class="container-title">
			<span class="text-point">모여라</span> 파티
		</div>
		
		<div class="container2-box">
			<div class="slide-container">
				<c:if test="${party.size() >= 10 }">
					<a class="slide-prev navi" style="display: inline;"></a>
					<a class="slide-next navi" style="display: inline;"></a>
				</c:if>
				<div class="slide-boundary">
					<div class="slide-list">
						<c:choose>
							<c:when test="${not empty party }">
								<c:forEach var="party" items="${party }">
									<div id="partyinfo" class="slide-row" codeone="${party.codeone}" codetwo="${party.codetwo}" p_idx="${party.p_idx}" datediff="${party.datediff}">
										<div id="service">${party.c_secondary}</div>
										<div id="title" class="ellipsis">${party.title}</div>
													
										<div id="curr-party">
											<c:if test="${party.curr_party > 0}">
												<c:choose>
													<c:when test="${party.curr_party == party.party_num}">
														<c:forEach begin="0" end="${party.party_num - 1}">
															<img src="/resources/images/sun.png" class="participation">
														</c:forEach>
													</c:when>
													<c:otherwise>
														<c:forEach begin="0" end="${party.curr_party - 1}">
															<img src="/resources/images/sun.png" class="participation">
														</c:forEach>
														
														
														<c:forEach begin="0" end="${party.party_num - party.curr_party - 1}">
															<img src="/resources/images/sun.png" class="non-participation">
														</c:forEach>
													</c:otherwise>
												</c:choose>
											</c:if>
														
											<c:if test="${party.curr_party == 0}">
												<c:forEach begin="0" end="${party.party_num - 1}">
													<img src="/resources/images/sun.png" class="non-participation">
												</c:forEach>
											</c:if>
										</div>
													
										<div id="enddate">~ ${party.end_date}<span id="period">(${party.datediff}일)</span></div>
										<div id="price"><fmt:formatNumber value="${party.totalprice}" type="number" />원</div>
									</div>
								</c:forEach>
							</c:when>
							<c:otherwise>
								데이터가 없습니다.
							</c:otherwise>
						</c:choose>
					</div>	
				</div>	
				<div class="indicator"></div>
			</div>
		</div>	
	</div>
		
	<div class="container3">
		<div class="container-title">
			추천 <span class="text-point">컨텐츠!</span>
		</div>
		<div class="container3-box">
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
	<jsp:include page="layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/index.js"></script>
<!-- Bootstrap core JavaScript-->
<script src="/resources/js/admin/bootstrap.bundle.min.js"></script>
<script src="/resources/js/admin/sb-admin-2.min.js"></script>
</html>