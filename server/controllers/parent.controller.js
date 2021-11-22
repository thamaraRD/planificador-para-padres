const Parent = require("../models/parent.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.registerParent = async (req, res) => {
  try{
    const parent = await Parent.create(req.body);
    return res.json({ parent })
  } catch(err){
      console.log(err);
      return res.status(500).json({ error: err });
    };
};

module.exports.loginParent = async (req, res) => {
  try{
    const parent = await Parent.findOne({ email: req.body.email });
    if(!parent){
      return res.status(403).json({ msg: 'Credenciales inválidas' })
    } else{
      const isValidPassword = await bcrypt.compare(req.body.password, parent.password);
      if(isValidPassword){
        const newJWT = jwt.sign({_id: parent._id}, process.env.SECRET_KEY)
        return res.cookie("parenttoken", newJWT, process.env.SECRET_KEY, {
          httpOnly: true
        })
        .json({ parentName: parent.parentName, _id: parent._id, childName: parent.childName, email: parent.email });
      }else {
        res.status(403).json({ msg: 'Credenciales inválidas' });
      }
  
  }
}catch(err){
    return res.status(403).json({ msg: 'Credenciales inválidas' });
  }
};

module.exports.greeting = async (_, res) =>{
  try{
    return res.json({ msg: 'Validación correcta' });
  }catch(err){
    return res.status(403).json(err);
  }
  
};

module.exports.logout = async (req, res) =>{
  try{
    // const parent = await Parent.findOne({ email: req.body.email });
    // if(parent){
    //     res.clearCookie('parenttoken');
    //     return res.json({ parent });
    // }
    res.clearCookie('parenttoken');
    return res.json({  msg: 'exito' });
  }catch(err){
    return res.status(500).json({ msg: 'Todo falló' })
  }
}
