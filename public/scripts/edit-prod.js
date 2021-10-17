

//alert('hello');

/*document.querySelector('#showProds').addEventListener('click', function() {
    let windowFeatures = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=600,height=300,left=100,top=100`;
    let redirectWindow = window.open('https://paparazziaccessories.com/shop/9e79099ae355d078c0ef/', windowFeatures);
    //redirectWindow.location;
});*/
const frms = document.querySelectorAll('form');
const frm = frms[0];
//alert(frm.elements);

const sels = frm.querySelectorAll('select');
alert(sels.length);
