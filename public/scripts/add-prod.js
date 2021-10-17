

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
const test_load = {
    title: 'OVAL and Out - Rose Gold',
    price: 5,
    description: 'A shiny series of glistening rose gold discs and oval frames delicately link around the wrist, creating a casual statement. Features an adjustable clasp closure.',
    category: 'Bracelets',
    image: 'https://vw-paparazzi.storage.googleapis.com/thumbnails/products/56628_1image1gold16-75_1.jpg.960x960_q85.jpg',
    quantity: 1
}

document.querySelector('#image').addEventListener('blur', function(event){
    let src = this.value;
    document.querySelector('.product-image').src = src;
});

const auto_load = document.getElementById('load-prod');
auto_load.addEventListener('click', (event) => {
    Object.entries(test_load).forEach(([key, value]) => {
        Array.from(frm.elements).forEach((ele) => {
            if(ele.id == key){
                ele.value = value;
            }
        });
    });
});

const sels = frm.querySelectorAll('select');
sels.forEach(function(sel){
    //let options = sel.options;
    let selected_val = sel.getAttribute('data-selected');
    sel.value = selected_val;
    //alert(selected_val);
    //options[selected].text;
});