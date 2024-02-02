
const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');

// Create a new student
router.post('/add', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get('/getAll', async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a student by roll number
router.get('/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a student by roll number
router.patch('/:rollNumber', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { rollNumber: req.params.rollNumber },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student by roll number
router.delete('/:rollNumber', async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ rollNumber: req.params.rollNumber });
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
