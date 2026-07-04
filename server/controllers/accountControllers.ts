import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { Account } from "../models/Account.js";
import zernio from "../config/zernio.js";


export const getAccounts= async (req: AuthRequest,res : Response) : Promise<void>=>{
    try{
        const accounts = await Account.find({user: req.user._id})
        res.status(201).json(accounts)
    }
    catch(error:any){
        res.status(500).json({message:error?.message||"Server error"});

    }
}

export const addAccounts= async (req: AuthRequest,res : Response) : Promise<void>=>{
    try{
        const {platform,handle,avatarUrl}= req.body;

        const accounts = await Account.find({user: req.user._id, platform,handle,avatarUrl})
        res.status(201).json(accounts)
    }
    catch(error:any){
        res.status(500).json({message:error?.message||"Server error"});
        
    }
}

export const disconnectAccounts= async (req: AuthRequest,res : Response) : Promise<void>=>{
    try{
        const account = await Account.findOne({_id:req.params.id,user:req.user._id});
        if(!account){
            res.status(404).json({message:"Account Not found"});
            return;
        }
        if(account.zernioAccountId){
            try{
                await zernio.accounts.deleteAccount({path:{accountId:account.zernioAccountId}})

            }
            catch(error:any){
                res.status(500).json({message:error?.response?.data?.message||error?.message});
                return
            }
        }
        await account.deleteOne()
        res.json({message:"Account disconnected successfully"})
    }
    catch(error:any){
        res.status(500).json({message:error?.message||"Server error"});
        
    }
}