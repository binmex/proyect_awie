const { pool } = require("../db")

exports.setProduct = async (req, res) => {
    try{
        console.log('test')

    }catch(error){
        return res.status(500).json({message: "something goes wrong"})
    }
}

exports.putProduct = async (req, res)=>{
    try{
        console.log('test')

    }catch(error){
        return res.status(500).json({message: "something goes wrong"})
    }
}

exports.deleteProduct = async (req, res)=>{
    try{
        console.log('test')

    }catch(error){
        return res.status(500).json({message: "something goes wrong"})
    }
}
exports.getProduct = async (req, res)=>{
    try{
        console.log('test')

    }catch(error){
        return res.status(500).json({message: "something goes wrong"})
    }
}