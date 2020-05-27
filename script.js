const express = require('express'); // import express
const Joi = require('Joi'); // Import Joi
const app = express(); //Create Express application on the app variable
app.use(express.json()); // used the json file thats why express.json
// also app.use as we have to use the variable created for express application
// we need a database like mongo db sql etc so we don't have that so we used JSON which has stored the data

// Give data to the server
// intially server has this data after that we will be changing it
const customers = [
    {title: 'Vishal', id: 1},
    {title: 'Rahul', id: 2},
    {title: 'Shubham', id: 3},
    {title: 'Rohit', id: 4},
    {title: 'Aadi', id: 5}
]

// HTTP methods
// Read Request Handlers
// Display the Messages when the URL consist of '/'
app.get('/',(req,res) => {
    res.send("Welcome to the First REST Api!!");
});
// here req is the client request and res it the response given

// Display the List of Customers when URL consists of api customers
app.get('/api/customers', (req,res) => {
    res.send(customers); // it will give the list of the customers
}); // it is basically returning the customer object

// Display the Information of specific Customer when you mention the id.
app.get('/api/customers/:id', (req,res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    // if there is no valid customer id then display error
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkered;">Oops... Try Something else!!</h2>');
    res.send(customers);
});

//CREATE Request Handler
// CREATE New Customer Information
app.post('/api/customers', (req,res) => {
    const { error } = validateCustomer(req.body); // check for validation int the function
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //Increment the customer id
    const customer = {
        id: customers.length +1,
        title: req.body.title
    };
    customers.push(customer); // increasing the stack
    res.send(customer);
});

// Update Request hanlder
// update Existing Customer Information
app.put('api/customers/:id', (req,res) => {
    //first check if customer is there or not
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkered;">Oops... Customer not found!!</h2>');

    const { error } =  validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    customer.title =  req.body.title;
    res.send(customer);
    
});

//Delete Request Handler
// Delete Customer Details
app.delete('/api/customers/:id', (req,res) => {
    //first check if customer is there or not
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkered;">Oops... Customer not found!!</h2>');

    const index = customers.indexOf(customer);
    customers.splice(index,1);
    res.send(customer);
});


//Validate Information
function validateCustomer(customer){
    const schema = {
        //validation is size of 3 title size
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}




// When a client sends request to the server intially the server needs to be running
// PORT environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
// port is automatically assinged to an environemnt variable so we have assinged it to 8080 
// now  we don't need to do it again and again so server will be running on 8080 port
// now to show that it is running on it and server is synced we have displayed this message
