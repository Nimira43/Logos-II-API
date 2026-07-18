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

router.post('/', async (req, res, next) => {
  try {
    const { title, summary, description, tags } = req.body

    if (!title?.trim() || !summary?.trim() || !description?.trim()) {
      res.status(400)
      throw new Error('Title, summary and description are required.')
    }

    const newIdea = new Idea({
      title,
      summary,
      description,
      tags: typeof tags === 'string'
        ? tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
        : Array.isArray(tags)
          ? tags
          : []
    })

    const savedIdea = await newIdea.save()
    res.status(201).json(savedIdea)

  } catch (err) {
    console.log(err)
    next(err)
  }

  // res.send(title)
})


export default router