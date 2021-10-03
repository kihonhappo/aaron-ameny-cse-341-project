


    let file = '';
    
    let error = '';
        
    loadJSON = function(file){
        const fs = require('fs');
        fs.readFile(file, (err, data) => {
            if (err) {
                this.error = err;
            } 
            else{
                this.items = JSON.parse(data);
            }
          });
          
    }
    filterData = function(term){
        
        let filtered = items.filter(x => x.tags.indexOf(term) > -1);
        return filtered;
    }

    module.exports = fetcher;

