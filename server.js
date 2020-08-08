const express=require('express')
const cors=require('cors')
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

//init app
const app=express()

//middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
	res.send('it works')
})


app.post('/payment',(req,res)=>{
	//we pass a product and token from the client
	const {product,token}=req.body
	//this key ensures that the user is not charged twice
	const idempotencyKey=uuidv4()
//first we create a customer
//on the customer we create a charge for the customer
//with   amount currency and customer
	return stripe.customers.create({
		email:token.email,
		source:token.id,
	}).then(customer=>{
		stripe.charges.create({
        amount:product.price*100,
        currency:'usd',
        customer:customer.id,
        receipt_email:token.email,
        description:product.name,
		},{idempotencyKey})
	}).then(result=>{
		res.status(200).json(result)
	}).catch(err=>{
		console.log(err)
	})
})
const Port =process.env.PORT ||5000

app.listen(Port,()=>console.log(`server is listening on port ${5000}`))