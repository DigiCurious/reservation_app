var reservations = [{batchId: 1, item_id: '123123'}, {batchId: 2}, {batchId: 2}];

var reservationsByBatchId = reservations.reduce(function (acc, reservation) {
    if (acc[reservation.batchId] !== undefined) {
        acc[reservation.batchId] = [];
    }
    
    acc[reservation.batchId].push(reservation);
    return acc;
}, {})

var obj = {
    '1': [
        {reservation},
        {...}
    ],
    '2': [
        {},
        {}
    ]
}

var muuttuja = '1'

obj[muuttuja]

reservation.itemId = obj[reservation.itemId];


reservation.findAll();
item.findAll({ $in: reservations.map(function (res) { return res.item_id; }) })


var obj = {a: 1, b:2 };
Object.keys(obj) => ['a', 'b']

Object.keys(reservationsByBatchId).forEach(function (batchId) {
    reservationsByBatchId[batchId].forEach(function (reservation) {
        <%= resrvation.item.name %>
    })
})



Reservation
.findAll()
.populate('item')
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log('The item is %s', reservation._item.name);
  // prints "The creator is Aaro
});

http://mongoosejs.com/docs/populate.html