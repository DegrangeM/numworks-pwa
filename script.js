// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;
let timeout;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    document.getElementsByTagName('button')[0].classList.remove('wait');
    document.getElementsByTagName('button')[0].textContent = "Installer l'application";
    clearTimeout(timeout);
});
window.addEventListener('load', function () {

    if (location.protocol !== 'file:') {
        navigator.serviceWorker.register('sw.js');
    }

    document.getElementsByTagName('button')[0].addEventListener('click', async function () {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcom } = await deferredPrompt.userChoice;
            console.log(outcom);
        }
    });

    timeout = setTimeout(function () {
        document.getElementsByTagName('button')[0].textContent = "Navigateur incompatible ou application déjà installée";
    }, 5000);

});

window.addEventListener('DOMContentLoaded', function () {

    let overHeight = window.outerHeight - document.getElementsByTagName('iframe')[0].offsetHeight;

    window.resizeTo(parseInt((screen.availHeight - overHeight) * 1160 / 2220), screen.availHeight);

});