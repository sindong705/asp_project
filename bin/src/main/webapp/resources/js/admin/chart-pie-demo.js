// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

//파티생성 비율 계산
makePartyRatio();
function makePartyRatio(){
	fetch('/admin/partyratio')
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
			let data = json.map(vo => vo.ratio);
            drawChart(data);
		})
	})
	.catch(err => console.log(err));
}

// Pie Chart Example
function drawChart(data) {
	var ctx = document.getElementById("myPieChart");
	var myPieChart = new Chart(ctx, {
	  type: 'doughnut',
	  data: {
	    labels: ["영상", "도서/음악", "게임", "기타"],
	    datasets: [{
	      data: data,
	      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', "#006D77"],
	      hoverBackgroundColor: ['#3B57A8', '#17a673', '#2c9faf', "#00545C"],
	      hoverBorderColor: "rgba(234, 236, 244, 1)",
	    }],
	  },
	  options: {
	    maintainAspectRatio: false,
	    tooltips: {
	      backgroundColor: "rgb(255,255,255)",
	      bodyFontColor: "#858796",
	      borderColor: '#dddfeb',
	      borderWidth: 1,
	      xPadding: 15,
	      yPadding: 15,
	      displayColors: false,
	      caretPadding: 10,
	    },
	    legend: {
	      display: false
	    },
	    cutoutPercentage: 80,
	  },
	});
}
