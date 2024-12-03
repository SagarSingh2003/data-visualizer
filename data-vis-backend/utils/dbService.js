import mongoose from "mongoose";
const { Schema } = mongoose;

class DatabaseService {
  constructor() {
    this.connection = null;
  }

  async connect(uri) {

    if (this.connection) return this.connection;

    try {
      this.connection = await mongoose.connect(uri);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
    return this.connection;
  }

  async disconnect() {
    if (!this.connection) return;
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }

  async create(model, data) {
    try {
      const newDocument = new model(data);
      await newDocument.save();
      return newDocument;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  async find(model, query = {}, projection = {}) {
    try {
      const result = await model.find(query, projection);
      return result;
    } catch (error) {
      console.error('Error finding documents:', error);
      throw error;
    }
  }

  // Find one document
  async findOne(model, query = {}, projection = {}) {
    try {
      const result = await model.findOne(query, projection);
      return result;
    } catch (error) {
      console.error('Error finding document:', error);
      throw error;
    }
  }

  async update(model, id, updateData) {
    try {
      const result = await model.findByIdAndUpdate(id, updateData, { new: true });
      return result;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  async delete(model, id) {
    try {
      const result = await model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}

export default new DatabaseService();
