const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose')
const app = express();
const Movie = require('./model/movie');
app.use(express.json());
mongoose.connect('mongodb+srv://shubham1:Shubham2157@shubham-uqgnc.mongodb.net/test?retryWrites=true');
const movies = [
    {id:1,genre: 'horror'},
    {id:2,genre: 'thriller'},
    {id:3,genre: 'adventure'},
];
app.get('/api/genres',(req,res)=> {
    res.send(movies);
});
app.get('/genres',(req,res) => {
    // const genh= movies.find(g => g.id===parseInt(req.params.id));
    //  if(!genh)
    //  return res.status(404).send('Request id not found');
   
    //  res.send(genh.genre);
    Movie.find().exec()
    .then(doc =>{
        if(doc)
        {
            res.status(200).json(doc);
        }
        else
        {
            res.status(404).json({message : "no entry found"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({error : err});
    });
     });


     app.get('/api/genres/:id',(req,res) => {
        // const genh= movies.find(g => g.id===parseInt(req.params.id));
        //  if(!genh)
        //  return res.status(404).send('Request id not found');
       
        //  res.send(genh.genre);
const mid = req.params.id;
if(!mid)
     {
         return res.status(404).send("Requsted Id Not Found")
     }

        Movie.findById(mid).exec()
        .then(doc =>{
            if(doc)
            {
                res.status(200).json(doc);
            }
            else
            {
                res.status(404).json({message : "no entry found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error : err});
        });
         });


     app.post('/api/genres',(req,res)=> {
    //     const{ error } = validateRes(req.body);
    // if(error)
    // {
    //    return res.status(404).send(error.details[0].message);
    // }

    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        genre: req.body.genre

    });
    movie.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "successful Entry",
            createdMovie: result
        });
    }).catch(err => console.log(err));


        //    const movie = {
        //        id: movies.length+1,
        //        genre: req.body.genre
        //     };
        //    movies.push(movie);
        //      res.send(movies);
         });

app.patch('/api/genres/:id',(req,res) =>{
    const mid = req.params.id;
    
    const updateOps = {};
    for(const ops in req.body){
        updateOps[ops.propName]= ops.value;
    }
    Movie.update({_id: mid }, {$set: updateOps})
     .exec()
     .then(result => {
         console.log(result);
         res.status(200).json(result);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err
         });
     });
});
        app.put('/api/genres/:id',(req,res) =>{
            const{ error } = validateRes(req.body);
            if(error)
            {
               return res.status(404).send(error.details[0].message);
            }
    const ide = movies.find(c=> c.id==parseInt(req.params.id));
//    if(!ide){
//        return res.status(404).send('Request id not found');
//    }
  
    ide.genre= req.body.genre;
    res.send(ide);
});
app.delete('/api/genres/:id',(req,res) => {
    // const ide = movies.find(c => c.id==parseInt(req.params.id));
    // if(!ide){
    //     return res.status(404).send('Requested Id not found');
    // }
    // const index =movies.indexOf(ide);
    // movies.splice(index,1);

    // res.send(ide);

    const mid = req.params.id;
    if(!mid)
         {
             return res.status(404).send("Requsted Id Not Found")
         }
    
            Movie.remove({_id : mid}).exec()
            .then(doc =>{
                if(doc)
                {
                    res.status(200).json(doc);
                }
                else
                {
                    res.status(404).json({message : "no entry found"});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({error : err});
            });



});

app.listen(3000,()=>{
    console.log('listning to the port 3000');
});
function validateRes(genre){
    const schema = {
        genre: Joi.string().min(4).required()
    };
    return Joi.validate(genre,schema);
}