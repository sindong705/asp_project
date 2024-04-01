window.onload = function(){
	if(document.getElementById("load-more-btn")){
		getPrincipal()
		.then(()=> {
			notifyList();
		})
	}
}

//파티 리스트
let page = 1;

function notifyList() {
	let sendData;
	let msg;
	
	sendData = 'id=' + principal.member.id + '&page=' + page;
	
    fetch('/alarm/items?' + sendData)
        .then(response => response.json())
        .then(data => {
        	msg = '';
        	
        	if(data.length < 15){
        		document.querySelector("#load-more-btn").style.display = 'none';
        	}
        	if(data.length != 0){
        		data.forEach(vo => {
            		if(vo.checked == 'N'){
            			msg += '<tr>';
            			msg += '<td><input type="checkbox" class="alarm-checkbox" value="' + vo.a_idx + '"></td>';
            			msg += '<td>' + vo.reg_date + '</td>';
            			msg += '<td><a target="_blank" href="' + vo.url + '" onclick="changeChecked(this)" a_idx="' + vo.a_idx + '">[<b>' + vo.from_id + '</b>]' +  vo.content + '</a></td>';
            			msg += '</tr>';
            		}
            		else{
            			msg += '<tr style="background-color: #f9f9f9">';
            			msg += '<td><input type="checkbox" class="alarm-checkbox" value="' + vo.a_idx + '"></td>';
            			msg += '<td>' + vo.reg_date + '</td>';
            			msg += '<td><a target="_blank" href="' + vo.url + '" style="color: gray" a_idx="' + vo.a_idx + '">[<b>' + vo.from_id + '</b>]' + vo.content + '</a></td>';
            			msg += '</tr>';
            		}
            	})
        	}else{
        		document.querySelector("thead").style.display = 'none';
        		
        		msg += '<tr>';
    			msg += '<td colspan="3" style="padding-left: 50px; color: gray">도착한 알림이 없습니다.</td>';
    			msg += '</tr>';
        	}
        	
            document.querySelector("tbody").innerHTML += msg;
            page++; // 페이지 번호 증가
        })
        .then(()=>{
        	btnClickEvent();
        	addCheckboxEvent();
        })
        .catch(error => console.error('Error:', error));
}

//확인한 알림
function changeChecked(aEle){
	let a_idx = aEle.getAttribute("a_idx");
	
	fetch('/alarm/changestatus',{
		method : 'post',
		body : a_idx,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.text())
	.then(data => {
		if(data == 'success'){
			aEle.style.color = 'gray';
			aEle.parentNode.parentNode.style.backgroundColor = '#f9f9f9';
		}
	})
	.catch(err => console.log(err));
}

//더보기 버튼 클릭 이벤트 
function btnClickEvent(){
	document.getElementById('load-more-btn').addEventListener('click', () => {
		notifyList(); 
	});
}

//전체선택
const selectAllCheckbox = document.getElementById('selectAll');

selectAllCheckbox.addEventListener('click', function() {
    const isChecked = selectAllCheckbox.checked;

    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        if (isChecked) {
            checkbox.parentNode.parentNode.classList.add('selected');
        } else {
            checkbox.parentNode.parentNode.classList.remove('selected');
        }
    });
});

// 체크박스 선택 이벤트 추가
function addCheckboxEvent() {
    const checkboxes = document.querySelectorAll('.alarm-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkbox.parentNode.parentNode.classList.add('selected');
            } else {
                checkbox.parentNode.parentNode.classList.remove('selected');
            }
        });
    });
}

//선택된 알림 읽음
document.querySelector("#allCheck").addEventListener('click', () => {
	const selectedRows = document.querySelectorAll('.selected');
    const selectedIdx = [];
    selectedRows.forEach(row => {
        const checkbox = row.querySelector('.alarm-checkbox');
        if (checkbox.checked) {
        	selectedIdx.push(checkbox.value);
        }
    });
    
    if (selectedIdx.length === 0) {
        alert('선택된 알림이 없습니다.');
        return;
    }
    
    if (confirm('선택된 알림을 읽음 처리하시겠습니까?')) {
        fetch('/alarm/check', {
            method: 'post',
            body: JSON.stringify(selectedIdx),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            location.reload();
        })
        .catch(err => console.log(err));
    }
})

//선택된 알림 삭제
function deleteNotifications() {
    const selectedRows = document.querySelectorAll('.selected');
    const selectedIdx = [];
    selectedRows.forEach(row => {
        const checkbox = row.querySelector('.alarm-checkbox');
        if (checkbox.checked) {
        	selectedIdx.push(checkbox.value);
        }
    });
    
    if (selectedIdx.length === 0) {
        alert('선택된 알림이 없습니다.');
        return;
    }
    
    if (confirm('선택된 알림을 삭제하시겠습니까?')) {
        fetch('/alarm/delete', {
            method: 'post',
            body: JSON.stringify(selectedIdx),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            location.reload();
        })
        .catch(err => console.log(err));
    }
}
