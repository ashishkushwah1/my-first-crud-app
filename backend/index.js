const express = require("express");
const { cards } = require("./db");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const response = await cards.find({});
        res.json(response);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
});
app.post("/", async (req, res) => {
    try {
        const newCard = req.body;
        const card = await cards.create(newCard);
        if (card) {
            res.status(201).json({
                msg: "Card created successfully",
                card
            });
        } else {
            res.status(500).json({
                msg: "Internal server error"
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCard = await cards.findByIdAndDelete(id);
        if (deletedCard) {
            res.json({ msg: "Card deleted successfully" });
        } else {
            res.status(404).json({ msg: "Card not found" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
})

app.listen((3000), () => {
    console.log("app running on port 3000");
})