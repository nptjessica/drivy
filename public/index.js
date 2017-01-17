'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//Exercice 1 - Euro-Kilometers
function rentalPrice1(){
    for(var i=0; i< rentals.length;i++){
        //convert json data into javascript date before manipulating it
        var pickupDate = new Date(rentals[i].pickupDate);   //rentals[i].pickupDate == rentals[i]['pickupDate']
        var returnDate = new Date(rentals[i].returnDate);

        //calculate the rental price
        var time = (returnDate.getDate() - pickupDate.getDate() + 1) * cars[i].pricePerDay; //getDate() method return the day of the month
        var distance = rentals[i].distance * cars[i].pricePerKm;
        var rentalPrice = time + distance;
        rentals[i].price = rentalPrice;
    }
}
rentalPrice1();

//Exercice 2 - Drive more, pay less
function rentalPrice2(){
    for(var i=0; i< rentals.length;i++){
        //convert json data into javascript date before manipulating it
        var pickupDate = new Date(rentals[i].pickupDate);
        var returnDate = new Date(rentals[i].returnDate);

        //calculate the rental price
        //now, it depends on the number of rental days
        var rentalTime = (returnDate.getDate() - pickupDate.getDate() + 1); //getDate() method return the day of the month
        //price per day decreases by 10% after 1 day
        if(rentalTime>=1 && rentalTime<4){
            var newPricePerDay =  (1 - 0.10) * cars[i].pricePerDay;
            var time = rentalTime * newPricePerDay;
        }
        //price per day decreases by 30% after 4 day
        else if(rentalTime>=4 && rentalTime<10){
            newPricePerDay =  (1 - 0.30) * cars[i].pricePerDay;
            time = rentalTime * newPricePerDay;
        }
        //price per day decreases by 50% after 10 day
        else if(rentalTime>=10){
            newPricePerDay = (1 - 0.50) * cars[i].pricePerDay;
            time = rentalTime * newPricePerDay;
        }

        var distance = rentals[i].distance * cars[i].pricePerKm;
        var rentalPrice = time + distance;
        rentals[i].price = rentalPrice;
    }
}
rentalPrice2();

//Exercice 3 - Give me all your money
function commissionPrice(){
    for(var i = 0; i < rentals.length; i++){
        //calculate commission
        //Drivy take a 30% commission on the rental price
        var totalCommission = 0.3 * rentals[i].price;

        //commission is split into: insurance, roadside assisntance and drivy
        //insurance is half of commission
        rentals[i].commission.insurance = totalCommission/2;

        //roadside assistance is 1€ per day
        //convert json data into javascript date before manipulating it
        var pickupDate = new Date(rentals[i].pickupDate);
        var returnDate = new Date(rentals[i].returnDate);
        var rentalTime = (returnDate.getDate() - pickupDate.getDate() + 1); //getDate() method return the day of the month
        rentals[i].commission.assistance = rentalTime;

        //drivy is the rest of the commission
        rentals[i].commission.drivy = totalCommission - (rentals[i].commission.insurance + rentals[i].commission.assistance);
    }
}
commissionPrice();

//console.log(cars);
console.log(rentals);
//console.log(actors);
//console.log(rentalModifications);
