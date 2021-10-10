
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
                let json = JSON.parse(data);
                let cats = [];
                json.forEach(function(item){
                    cats.push(item.category);
                });
                
                cb(JSON.parse(data));
                //return this.items;
                //console.log(this.items);
                //list = this.items;
            }
          });
    }
    getCategories(cb){
        const fs = require('fs');
        fs.readFile(this.file, (err, data) => {
            if (err) {
                this.error = err;
                cb([]);
            } 
            else{
                let json = JSON.parse(data);
                let cats = [];
                json.forEach(function(item){
                    cats.push(item.category);
                });
                
                cb(cats);
                //return this.items;
                //console.log(this.items);
                //list = this.items;
            }
          });
    }

    addItem(item){
        
    }

    filterData(term){
        let filtered = this.items.filter(x => x.tags.indexOf(term) > -1);
        return filtered;
    }

}

   
  

