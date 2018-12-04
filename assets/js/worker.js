console.log("server worker loaded");
self.addEventListener('push',e=>{
    const data = e.data.json();
    console.log('push recieved');
   
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'http://limeorange.vn/assets/images/favicon.ico',
        dir: 'rtl',
        data:{
            url: '/'
        }

    })
    
})
