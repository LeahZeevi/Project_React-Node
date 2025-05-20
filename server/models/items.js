const mongoose = require('mongoose');
const ItemsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:[true,"userId of item is require"]
    },
    itemName: {
        type: String,
        required: [true, "name of item is require"]
    },
    url: {
        type: String,
          require:[true,"item must include picture"]
    },
    categoryName: {
        type: String,
        enum: ["חולצות", "חצאיות", "שמלות","מכנסים", "נעלים"],
        require: [true, "Item nust include category"]
    },
    session: {
        type: String,
        enum: ["חורף", "קיץ", "כללי"],
        default: "כללי"
    },

    inUse: {
        type: Boolean,
        default: false
    },
    countWear: {
        type: Number,
        default: 0
    },
    style: {
        type: String,
        enum: ["ביסיק", "ספורט", "ספורט אלגנט", "אלגנט", "אחר"],
        default: "אחר"
    }
})
module.exports = mongoose.model('items', ItemsSchema);
