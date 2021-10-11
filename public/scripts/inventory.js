const checkall = document.querySelector('#check-all');
const row_checks = document.querySelectorAll('input[type=checkbox].row-check');
//alert(row_checks.length);
checkall.addEventListener('change', function(event){
    //alert('checked');
    if(checkall.checked){
        row_checks.forEach(function(chk){
            if(chk.checked){

            }
            else{
                chk.checked = true;
            }
        });
    }
    else{
        row_checks.forEach(function(chk){
            if(chk.checked){
                chk.checked = false;
            }
            else{
                
            }
        });
    }
});