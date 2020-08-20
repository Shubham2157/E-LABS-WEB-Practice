const  fs = require('fs');
const os =require('os');
const see = require('./app');
const Emitt = require('events');
const http = require('http');
const server = http.createServer((req,res)=>{
  if(req.url=='/')
  {
  res.write('hello world');
  res.end();
}
if(req.url=='/api')
{
  res.write(JSON.stringify(see.show(6,5)));
  res.end();
}
});
server.listen(3000);
console.log('listing to the port 3000')
//const emitt = new Emitt();
//emitt.on('messanger',()=>{
  //console.log('messanger called')
//});
//emitt.emit('messanger');

see.show(6,5);
//const user = os.userInfo();
//console.log(user);

//const totalMem = os.totalmem();
//console.log(totalMem);

//const freeMem = os.freemem();
//console.log(freeMem);
//console.log('hello world');
//fs.appendFile('hello.text','Hello world',(err)=>{ //or function(err)
   // if(err)
   //{
    //  console.log('An Error occured');
  //  }
//});
//fs.readFile('hello.text', (err, data) => {
  //if (err) throw err;
  //var data1=data;
  //fs.appendFile('index.txt',data1,(err)=>{ 
    // if(err)
  //{
    // console.log('An Error occured');
    //}
  //});
 