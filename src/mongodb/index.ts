import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userInfo: {
    id: { type: String, required: true },
    name: { type: String, required: false },  
    image: { type: String, required: false },
    email: { type: String, required: false }  
  },
});

const adminRequestsSchema = new mongoose.Schema({
  userId: String,
});

// Avoid overwriting existing models if they already exist
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
const AdminRequest =
  mongoose.models.AdminRequest ||
  mongoose.model("AdminRequest", adminRequestsSchema);

// Export both models
export { Admin, AdminRequest };
