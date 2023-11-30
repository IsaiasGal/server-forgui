import { Router } from "express";
import Estate from '../models/EstateModel'
import { config } from "dotenv";
import User from "../models/UsersModel";

const bcrypt = require('bcrypt');
const router = Router();

router.get("/Estate",async (req,res)=>{
    const estate = await Estate.find();
    res.send(estate)
});
    
router.post("/Estate", async (req,res) => {
    const{ImgURL, title, /*author*/ type, status, description, ubication, price, lapse, postDate} = req.body
    const estate = new Estate ({ImgURL, title, /*author*/ type, status, description, ubication, price, lapse, postDate})
    await estate.save()
    res.json(estate)
});

router.get("/Estate/:id",async(req,res)=>{
  try{
      const estate = await Estate.findById(req.params.id);
      if(!estate) return res.status(404).json({message: "Task not found"})

      return res.send(estate)
  }catch(error){
      return res.status(500).send(error);
  }
});

router.delete("/Estate/:id",async(req,res)=>{
  try{
      const estate = await Estate.findByIdAndDelete(req.params.id);
      if(!estate) return res.status(404).json({message: "Task not found"})

      return res.send(estate)
  }catch(error){
      return res.status(500).send(error);
  }
});
  
router.put("/Estate/:id", async (req,res)=>{
  try {
    const updatedEstate = await Estate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
  })
  return res.status(200).json({x: updatedEstate, id: req.params.id});
  } catch {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
});

router.put('/update/:id', async (req, res) => {
  try {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).send({error:error});
  }
});

  


// Method for the Category layout
router.get('/search', async (req, res) => {
  try {
    const text = req.query.text;
    const estates = await Estate.find({
      $or: [
        { title: { $regex: text, $options: 'i' } },
        { description: { $regex: text, $options: 'i' } },
        { ubication: { $regex: text, $options: 'i'}},
      ],
    });

    res.json(estates);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
  

router.get("/register",async (req,res)=>{
  const task = await User.find();
  res.send(task)
});

router.post('/register', async (req, res) => {

   try {
    
      const { name, username, email, passw, imgURL, description, phone } = req.body;

    
      const hashedPassword = await bcrypt.hash(passw, 10);
  
      const newUser = new User({
        name, 
        username, 
        email, 
        passw : hashedPassword ,
        imgURL,
        description, 
        phone,
        
      }); 
     
      await newUser.save();
    
      res.json(newUser)
    } catch (error) {
      return res.status(500).send(error)
    }
  });
  
  
  
  router.post('/login', async (req, res) => {
    try {
      const { username, passw } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas', IsUserValid: false, IdUser: 0 });
      }
  
      const isPasswordValid = await bcrypt.compare(passw, user.passw);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas', IsUserValid: false, IdUser: 0 });
      }
  
      return res.status(200).json({ message: 'Inicio de sesión exitoso',
                                    IsUserValid: true, 
                                    IdUser: user.id,
                                    Password: user.passw, 
                                    Name: user.name, 
                                    Description: user.description, 
                                    Email: user.email, 
                                    Phone: user.phone,
                                    
                                  });
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor', IsUserValid: false, IdUser: 0 });
    }
  });



export default router;