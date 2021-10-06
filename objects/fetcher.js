
module.exports = class Fetcher{
    constructor(file){
        this.file = file;
        this.error = '';
        this.items = [];
    }
    
        
    loadJSON(cb){
        const fs = require('fs');
        fs.readFile(this.file, (err, data) => {
            if (err) {
                this.error = err;
                cb([]);
            } 
            else{
                cb(JSON.parse(data));
                //return this.items;
                //console.log(this.items);
                //list = this.items;
            }
          });

          
    }
    filterData(term){
        
        let filtered = this.items.filter(x => x.tags.indexOf(term) > -1);
        return filtered;
    }

}

   
  

