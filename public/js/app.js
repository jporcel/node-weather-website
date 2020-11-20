console.log('Client side javascript loaded.')


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const fullAddress = document.querySelector('#fullAddress');
const message = document.querySelector('#message');



weatherForm.addEventListener('submit',(event)=>{

    event.preventDefault();
    message.textContent = 'Loading...';
    const address = search.value;
    const weatherUrl = '/weather?address=' + address;
    fetch(weatherUrl).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            fullAddress.textContent = data.address;
            message.textContent = data.forecast;
        });
    });
});

