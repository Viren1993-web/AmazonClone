const stripe=require('stripe')('sk_test_51JLnAXF9xIr8obobYmS8WkwCSIyncN6VfUaKRnDiLWjIANQExdQ0WGA6tlplhat4BTFEhD0kAlOBFW6HupjiuTJs00AJW104Zm')

exports.handler = async (event) => {
   const {typeName,arguments}=event;

   if(typeName!=='Mutation'){
       throw new Error('Request is not a mutation');
   }
   if(!arguments?.amount){
       throw new Error('Amount is required');
   }
       //create payment intent
       const paymentIntent=await stripe.paymentIntent.create({
           amount:arguments.amount,
           currency:'usd'
       });
       return{
           clientSecret:paymentIntent.client_secret,
       }
   };
