const express = require('express');
const app = express();

const quotesRouter = express.Router();


const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/api/quotes',quotesRouter);


quotesRouter.get('/random',(req,res,next) => {
    const quote = getRandomElement(quotes);
    //res.set('Content-Type', 'application/json');
    res.send({quote});
});

quotesRouter.get('/',(req, res, next) => {
    if(req.query.person){
        //console.log(req.query);
        const person = req.query.person;
        const quoteArray = [];
        quotes.forEach(
            quote => {
                if(quote.person === person){
                    quoteArray.push(quote);
                }
            }
        );
        res.send(quoteArray);
    }else{
        res.send(quotes);
    }
});

quotesRouter.post('/',(req,res,next) => {
    const person = req.query.person;
    const quote = req.query.quote;
    if(person && quote){
        quotes.push(req.query);
        res.send(req.query);
    }else{
        res.status(400).send("you got provide a person name and quote to create successfully.");
    }
    console.log(quotes);
});


app.listen(PORT);
console.log(`server is running at ${PORT}`);


