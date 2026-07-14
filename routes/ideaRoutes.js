import express from 'express'
const router = express.Router()
import Idea from '../models/Idea.js'
import mongoose from 'mongoose'

router.get('/', async (req, res, next) => {
  try {
    const ideas = await Idea.find()
    res.json(ideas)
  } catch (err) {
    console.log(err)
    next(err)
  }  
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
      throw new Error('Idea not found.')
    }

    const idea = await Idea.findById(req.params.id)
    
    if (!idea) {
      res.status(404)
      throw new Error('Idea not found.')
    }
    
    res.json(idea)
  } catch (err) {
    console.log(err)
    next(err)
  }  
})

router.post('/', (req, res) => {
  const { title, description } = req.body
  console.log(description)
  res.send(title)
})


export default router