import { Router } from "express";
import * as ctl1 from "../controllers/indexCtl.js"

const app = Router();

app.get("/", ctl1.getIndex );

app.get("/clickPic", ctl1.getClick );
app.post("/clickPic", ctl1.postClick);

app.get("/match", ctl1.getMatch );
app.get("/match/labels", ctl1.getLabelImages);

app.get("/path/:path", ctl1.getPath);

export default app;