const publicKey = "BMLSy7oAs3uK_DkXpWfChedHKhAScADf0d-MWntEexffluMgKlsYDr0YuP2TF5Na9PlR7xyzjNufD5Tw7hFvgXs";

    
//check for server worker
if ('serviceWorker' in navigator) {
    send1().catch(err => console.log(err));
}
// hàm send( tin nhắn)
async function send1() {
    console.log("danng ky service worker");
        const register = await navigator.serviceWorker.register("../assets/js/worker.js", {
            scope: "/assets/js/"
        });   
    console.log('da dang ky server worker');
    // dang ky thong bao day
    console.log("dang dang ky day");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    console.log("sending push");
    await fetch('/thongbao1', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push send');
}
async function send2() {
    console.log("danng ky service worker");
    const register = await navigator.serviceWorker.register("../assets/js/worker.js", {
        scope: "/assets/js/"
    });
    console.log('da dang ky server worker');
    // dang ky thong bao day
    console.log("dang dang ky day");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    console.log("sending push");
    await fetch('/thongbao2', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push send');
}
async function send3() {
    console.log("danng ky service worker");
    const register = await navigator.serviceWorker.register("../assets/js/worker.js", {
        scope: "/assets/js/"
    });
    console.log('da dang ky server worker');
    // dang ky thong bao day
    console.log("dang dang ky day");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    console.log("sending push");
    await fetch('/thongbao3', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push send');
}
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

