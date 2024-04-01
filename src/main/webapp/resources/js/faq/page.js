// tab 버튼 url에 맞춰서 active 클래스 넣기
var tab = document.querySelectorAll('.faq-tab a');
var search = window.location.search;
if (search.includes('?i_type=A')) {
	tab[0].classList.add('active');
	tab[1].classList.remove('active');
	tab[2].classList.remove('active');
	tab[3].classList.remove('active');
} else if(search.includes('?i_type=B')) {
	tab[0].classList.remove('active');
	tab[1].classList.add('active');
	tab[2].classList.remove('active');
	tab[3].classList.remove('active');
} else if(search.includes('?i_type=C')) {
	tab[0].classList.remove('active');
	tab[1].classList.remove('active');
	tab[2].classList.add('active');
	tab[3].classList.remove('active');
} else if(search.includes('?i_type=D')) {
	tab[0].classList.remove('active');
	tab[1].classList.remove('active');
	tab[2].classList.remove('active');
	tab[3].classList.add('active');
}