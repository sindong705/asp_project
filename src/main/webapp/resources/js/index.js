
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}

window.onload = function(){
	// 게시글 클릭이벤트
	getDetailInfo();
}

// 게시글 상세
function getDetailInfo(){
let partyinfo = document.querySelectorAll("#partyinfo");
	partyinfo.forEach(party => {
		party.addEventListener('click', () => {
			
			let codeone = party.getAttribute('codeone');
			let codetwo = party.getAttribute('codetwo');
			let p_idx = party.getAttribute('p_idx');
			let datediff = party.getAttribute('datediff');
			
			if(datediff <= 0){
				alert('이미 마감된 파티입니다.');
			}else{
				location.href = '/shop/get?c1=' + codeone + '&c2=' + codetwo + '&pn=' + p_idx;
			}
		})
	})
}

var itemPartyRow = document.querySelectorAll('.slide-row');

// 메인 슬라이드
if (itemPartyRow.length >= 10) {
	$(document).ready(function() {
		var $itemSlideParty = $('.slide-container'),
			$itemPartyList = $itemSlideParty.find('.slide-list'),
			$itemPartyRow = $itemSlideParty.find('.slide-row');
			($itemPartyNavi = $itemSlideParty.find('.navi')),
			($itemPartyIndicator = $itemSlideParty.find('.indicator')),
			($itemPartyButton = null);
		
		var itemPartyInterval = null;
		var itemPartyRowWidth = $itemPartyRow.outerWidth(true);
		var itemPartyCurrent = 0;
		var itemPartySpeed = 500;
		var itemPartyTerm = 4000;
		var itemPartyLength = Math.round($itemPartyRow.length / 2);
		
		function itemPartInit() {
		$itemPartyList
		  .on('mouseenter', function() {
		    clearInterval(itemPartyInterval);
		  })
		  .on('mouseleave', function() {
		    itemPartyStart();
		  });
		itemPartyStart();
		itemPartyNavi();
		itemPartyIndicator();
		}
		
		function itemPartyNavi() {
		$itemPartyNavi
		  .show()
		  .on('click', function(e) {
		    e.preventDefault();
		    $(this).hasClass('slide-prev') ? itemPartyMove(-1) : itemPartyMove(1);
		  })
		  .on('mouseenter', function() {
		    clearInterval(itemPartyInterval);
		  })
		  .on('mouseleave', function() {
		    itemPartyStart();
		  });
		}
		
		function itemPartyIndicator() {
		for (var i = 0; i < itemPartyLength; i++) {
		  if (!i) {
		    $itemPartyIndicator.append('<span class="on"></span>');
		  } else {
		    $itemPartyIndicator.append('<span></span>');
		  }
		}
		$itemPartyButton = $itemSlideParty.find('.indicator span');
		}
		
		function itemPartyMove(direction) {
		if (direction > 0) {
		  itemPartyCurrent = itemPartyCurrent >= itemPartyLength - 1 ? 0 : itemPartyCurrent + 1;
		  $itemPartyList.animate({ left: itemPartyRowWidth * direction * -1 }, itemPartySpeed, function() {
		    $itemPartyList.stop().append($('.slide-container .slide-row').first()).append($('.slide-container .slide-row').first()).css({ left: 0 });
		  });
		} else {
		  itemPartyCurrent = itemPartyCurrent == 0 ? itemPartyLength - 1 : itemPartyCurrent - 1;
		  $itemPartyList
		    .stop()
		    .prepend($('.slide-container .slide-row').last())
		    .prepend($('.slide-container .slide-row').last())
		    .css({ left: -itemPartyRowWidth + 'px' });
		  $itemPartyList.animate({ left: 0 }, itemPartySpeed);
		}
		$itemPartyButton.removeClass('on').eq(itemPartyCurrent).addClass('on');
		}
		
		function itemPartyStart() {
		itemPartyInterval = setInterval(function() {
		  itemPartyMove(1);
		}, itemPartyTerm);
		}
		
		if (itemPartyLength > 4) {
		itemPartInit();
		}
	});
}
