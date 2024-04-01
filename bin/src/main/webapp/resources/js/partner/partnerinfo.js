getPrincipal().then(() => {
	partnerInfo();
})

function partnerInfo() {
	document.getElementById("bank").value = principal.member.bank;
	document.getElementById("bank_number").value = principal.member.bank_number;
}