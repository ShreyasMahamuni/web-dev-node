const User = require("../Models/User-model");
const Contact = require("../Models/Contact-model");

const getAllUsers = async (req, res) => {
     try{
        const users = await User.find({}, { password: 0 }); //get all data from database so use find method - not show password
        if(!users || users.length === 0) {
            return res.status(404).json({ message : "No users found"});
        }
        return res.status(200).json(users);

     } catch (error) {
        next(error);
     }
};

//edit user
const getUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

//update user
const updateUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedUserData = req.body;    //user get updated data -input field  
        const updatedData = await User.updateOne(
            { _id: id }, 
            {
              $set: updatedUserData,
            }
        );
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

//delete user
const deleteUserById = async (req, res) => {
    try { 
      const id = req.params.id;
      await User.deleteOne({ _id: id});
      return res.status(200).json({ message: "User Deleted successfully"});
    } catch (error) {
      next(error);
    }
}

const getAllContacts = async (req, res) => {
    try{
        const contacts = await Contact.find(); //get all data from database(contact)
        if(!contacts || contacts.length === 0) {
            return res.status(404).json({ message : "No contacts found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

//delete contact data
const deleteContactById  = async (req, res) =>{
    try {
       const id = req.params.id;
       await Contact.deleteOne({ _id: id});
       return res.status(200).json({ message: "ContactData Deleted successfully"});
    } catch (error) {
       next(error);
    }
} 

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };