import { Labels } from "../models/person.js";

export const getIndex = (req, res) => {
    res.render("index");
};

export const getClick = (req, res) => {
    res.render("clickPic");
};
export const postClick = async (req, res) => {
    const data = new Labels({
        name: req.body.name,
        imageURL: req.body.imageURL
    });
    await data.save();
    res.send("Done");
};

export const getLabelImages = async (req, res) => {
    let labelImages = await Labels.find()
    res.send(labelImages);
};

export const getMatch = async (req, res) => {
    res.render("match"); 
};

export const getPath = (req, res) => {
    try {
        let { path } = req.params;
        res.render(path)
    } catch (error) {
        res.render("path")
    }

}