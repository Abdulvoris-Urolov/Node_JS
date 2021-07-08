const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error
        ('MongoDBga ulanish vaqtida xato ro`y berdi...', err);
    });

    const inventorySchema = new mongoose.Schema({
        item: String,
        qty: Number,
        size: { String },
        status: String
    },
    {collection: 'inventory'});

    const Inventory = mongoose.model("Inventory", inventorySchema);

    async function getInventory(){
        const inventory = await Inventory
            .find({status: /^A/})  //Statusning A harfi bilan boshlanganlarini topib beradi
            .sort({ item: 1, })
            .select({item: 1, qty: 1});
        console.log(inventory);
    }
    //inventorySchema();
    getInventory();