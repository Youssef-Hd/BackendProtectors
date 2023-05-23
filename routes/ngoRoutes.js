import express from 'express';
import NGOControllers from "../controllers/ngoControllers.js"
const router = express.Router();

router.route("/").get(NGOControllers.getAllNgos);
router.route("/:id").get(NGOControllers.getNgo);
router.route("/").post(NGOControllers.postNgo);
router.route("/:id").put(NGOControllers.updateNgo);
router.route("/:id").delete(NGOControllers.eraseNgo);


export default router;

