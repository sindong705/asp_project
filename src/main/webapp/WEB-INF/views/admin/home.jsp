<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 홈</title>
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">관리자 홈</h1>
        </div>

        <!-- Content Row -->
        <div class="row">

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-2 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-uppercase mb-1" style="color: #4e73df">
                                   	 member</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="usernum"></div>
                            </div>
                            <div class="col-auto">
                                 <i class="fas fa-solid fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-2 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">payment (Annual)</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalearning"></div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-won-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-2 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        	<div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">new refund</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="refundreq"></div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-hand-holding-usd fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-2 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        	<div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">new withdraw</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="withdrawreq"></div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-solid fa-wallet fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Requests Card Example -->
            <div class="col-xl-2 col-md-6 mb-4">
                <div class="card border-left-danger shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">new inquiry</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="inquirynum"></div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Row -->

        <div class="row">

            <!-- Area Chart -->
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div
                        class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">이용자 결제 총액 (원)</h6>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="chart-area">
                            <canvas id="myAreaChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pie Chart -->
            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div
                        class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">카테고리별 파티 비율 (%)</h6>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="chart-pie pt-4 pb-2">
                            <canvas id="myPieChart"></canvas>
                        </div>
                        <div class="mt-4 text-center small">
                            <span class="mr-2">
                                <i class="fas fa-circle" style="color: #4e73df"></i> 영상
                            </span>
                            <span class="mr-2">
                                <i class="fas fa-circle" style="color: #1cc88a"></i> 도서/음악
                            </span>
                            <span class="mr-2">
                                <i class="fas fa-circle" style="color: #36b9cc"></i> 게임
                            </span>
                            <span class="mr-2">
                                <i class="fas fa-circle" style="color: #006D77"></i> 기타
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->
    
    <!-- Page level plugins -->
    <script src="/resources/js/admin/Chart.min.js"></script>
    
    <!-- Page level custom scripts -->
    <script src="/resources/js/admin/chart-area-demo.js"></script>
    <script src="/resources/js/admin/chart-pie-demo.js"></script>
    
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
</html>