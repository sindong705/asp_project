let principal;

async function getPrincipal() {
    try {
        const response = await fetch('/member/api/currentUser.json', {
            cache: 'no-cache'
        });
        const userPrincipal = await response.json();
        principal = userPrincipal.principal;
    } catch (e) {
        console.log(e);
    }
}
getPrincipal();
