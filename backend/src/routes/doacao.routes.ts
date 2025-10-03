import { Router } from "express";
import { criarDoacao } from "../controllers/doacao.controller";

const router = Router();
router.post("/", criarDoacao);
export default router;