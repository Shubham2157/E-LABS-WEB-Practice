const  fs = require('fs');

//console.log('hello world');
fs.appendFile('hello.text','Hello world',(err)=> {
    if(err)
    {
        console.log(' An Error occured')
    }
};
