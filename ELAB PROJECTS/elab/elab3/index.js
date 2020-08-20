const express = require('express');
const app = express();
app.use(express.json());
const schools = [
    {id:1,name: 'CSE'},
    {id:2,name: 'Electrical'},
];
app.get('/',(req,res)=> {
 res.send('KIIT UNIVERSITY');
 });
 app.get('/school/branch',(req,res)=> {
    res.send(schools);
 });
 app.post('/school/branch',(req,res)=> {
    
       const school = {
           id: schools.length+1,
           name: req.body.name
        };
        schools.push(school);
        res.send(schools);
    });
  app.put('/school/branch/:id',(req,res) =>{
    const ide = schools.find(c=> c.id==parseInt(req.params.id));
   if(!ide){
       return res.status(404).send('Request id not found');
   }
    ide.name= req.body.name;
    res.send(ide);
});


app.delete('/school/branch/:id',(req,res) => {
    const ide = schools.find(c => c.id==parseInt(req.params.id));
    if(!ide){
        return res.status(404).send('Requested Id not found');
    }
    const index =schools.indexOf(ide);
    schools.splice(index,1); // (kya hatana hai, kitna no wala hatana )

    res.send(ide);
});

const port = process.env.PORT;

 app.listen(port, () => {
    console.log(`listning to the port ${port}......`);
});