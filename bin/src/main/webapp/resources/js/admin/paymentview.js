//폼 정보
window.onload = function(){
	//일 /금액 계산
	totalperiodprice();
}

function totalperiodprice(){
	let perEle = document.querySelector("#period");
	let priEle = document.querySelector("#price");
	let commEle = document.querySelector("#commission");
	let sumEle = document.querySelector("#sum");
	
	//시작날짜
	let sArr = myTime(perEle.getAttribute("startdate")).split('-');
	let sDate = new Date(sArr[0], sArr[1], sArr[2]);
	
	
	//종료날짜
	let eArr = myTime(perEle.getAttribute("enddate")).split('-');
	let eDate = new Date(eArr[0], eArr[1], eArr[2]);
	
	let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
	
	//일 수 (1일금액)
	perEle.innerHTML += '<br><span class="sub-title">(총 ' + diffDate + '일)</span>';
	
	//판매가
	priEle.innerHTML = priEle.getAttribute("price").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	document.querySelector("#payprice").innerHTML = priEle.getAttribute("price").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	//수수료
	commEle.innerHTML = commEle.getAttribute("commission").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	document.querySelector("#paycommission").innerHTML = commEle.getAttribute("commission").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	//합계
	sumEle.innerHTML = sumEle.getAttribute("sum").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	document.querySelector("#paysum").innerHTML = sumEle.getAttribute("sum").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
	document.querySelector("#paytotal").innerHTML = sumEle.getAttribute("sum").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}
