
function processDelivery(orderId, callback){
    
    findNearbyRestaurants(orderId, (err, restaurants) => {
        if (err) return callback(`Error finding restaurants: ${err}`);        
        
        placeOrder(orderId, (err, orderDetails) => {
            if(err) return callback(`${err}`);

            assignDeliveryPerson(orderDetails, ()=> {
                
            })
        })
        
    })
}

function findNearbyRestaurants(){
    // return restrunent name

}

function placeOrder(){

}

function assignDeliveryPerson(){

}

function trackDelivery(){

}

const orderId = 878281;

processDelivery(orderId, (err, result)=>{ 
    if(err){
        console.log(`order not placed`) 
    } else{
        console.log(`order placed`);
    }
})