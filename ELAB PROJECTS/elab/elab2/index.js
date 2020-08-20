//console.log('hello');
const express = require('express');//express framework is used
const app = express();
app.use(express.json());
const movies = [
    {id:1,genre: 'horror'},
    {id:2,genre: 'thriller'},
    {id:3,genre: 'adventure'},
];
app.get('/',(req,res)=> {
 res.send('hello');
 });
 app.get('/api/movies',(req,res)=> {
    res.send(movies);
});
// app.get('/movies/:id',(req,res) => {
    //const genh= movies.find(g => g.id===parseInt(req.params.id));
     //if(!genh)
     //return res.status(404).send('Request id not found');
   
     //res.send(genh.genre);
     //});

app.post('/api/movies',(req,res)=> {
    const{ error }= ValiditeMovies(req.body);
    if(error){
       return res.status(404).send(error.detail[0].message);
    }
   else {
       const movie = {
           id: movies.length+1,
           genre: req.body.genre
        };
        movies.push(movie);
        res.send(movies);
  }
});


// app.put('/api/movies/:id',(req,res) =>{
//     const ide = movies.find(c=> c.id==parseInt(req.params.id));
   // if(!ide){
       // return res.status(404).send('Request id not found');
   // }
    //const{ error }= ValiditeMovies(req.body);
    //if(error){
      // return res.status(404).send(error.detail[0].message);
    //}

//     ide.genre= req.body.genre;
//     res.send(ide);
// });

app.listen(3000,()=>{
    console.log('listning to the port 3000');
});
function validateRes(genre){
    const schema ={
        genre: Joi.string().min(4).require()
    };
    return Joi.validate(genre,schema);
}