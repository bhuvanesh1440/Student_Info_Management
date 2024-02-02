const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Marks =require('../models/marks.model')


router.get('/',(req,res)=>{
    res.send("Hello World");
})


// Add marks for a student
router.post('/add', async (req, res) => {
    const marks = new Marks({
        studentName: req.body.studentName,
        rollNumber: req.body.rollNumber,
        sem1: req.body.sem1 || [],
        sem2: req.body.sem2 || [],
        sem3: req.body.sem3 || [],
        sem4: req.body.sem4 || [],
        sem5: req.body.sem5 || [],
        sem6: req.body.sem6 || [],
        sem7: req.body.sem7 || [],
        sem8: req.body.sem8 || [],
    });

    try {
        const newMarks = await marks.save();
        res.status(201).json(newMarks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




// Get marks for a student by roll number
router.get('/:rollNumber', async (req, res) => {
    try {
        const marks = await Marks.findOne({ rollNumber: req.params.rollNumber });

        if (!marks) {
            return res.status(404).json({ message: 'Marks not found for the provided roll number' });
        }

        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Middleware function to get marks by roll number
async function getMarksByRollNumber(req, res, next) {
    try {
        const marks = await Marks.findOne({ rollNumber: req.params.rollNumber });

        if (!marks) {
            return res.status(404).json({ message: 'Marks not found for the provided roll number' });
        }

        res.marks = marks;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Get marks for a specific semester by roll number
router.get('/:rollNumber/:semester', async (req, res) => {
    try {
        const { rollNumber, semester } = req.params;

        // Check if the semester is valid (e.g., 'sem1', 'sem2', etc.)
        if (!/^sem[1-8]$/.test(semester)) {
            return res.status(400).json({ message: 'Invalid semester format' });
        }

        const marks = await Marks.findOne({ rollNumber });

        if (!marks) {
            return res.status(404).json({ message: 'Marks not found for the provided roll number' });
        }

        const semesterMarks = marks[semester];

        if (!semesterMarks) {
            return res.status(404).json({ message: 'Marks not found for the provided semester' });
        }

        res.json({ semester, marks: semesterMarks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Add or update marks for a specific semester
router.post('/:rollNumber/update/:semester', getMarksByRollNumber, async (req, res) => {
    try {
        const { semester } = req.params;

        // Check if the semester is valid (e.g., 'sem1', 'sem2', etc.)
        if (!/^sem[1-8]$/.test(semester)) {
            return res.status(400).json({ message: 'Invalid semester format' });
        }

        // Update or add marks for the specified semester
        res.marks[semester] = req.body.marks;

        const updatedMarks = await res.marks.save();
        res.json(updatedMarks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});














module.exports=router;