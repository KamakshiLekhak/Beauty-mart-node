import type { Request, Response } from "express";

export function notFound(req : Request , res : Response){
    return res.status(404).json({error:'Route ${req.path} not found'})
}