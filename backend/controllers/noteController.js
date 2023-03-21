const Note = require('../db/models/note')

class NoteActions{
    //get one note
    async getOneNote(req, res){
        let note
        try{
            note = await Note.findOne({_id: req.body.id})
            return res.status(200).json(note)
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    //download all
    async getAllNotes(req, res){
        let note
        try{
            note = await Note.find({owner: req.params.owner})
            return res.status(200).json(note)
        }catch(err){
            return res.status(500).json({message: err.message})
        }    
    }

    //add note
    async addNotes(req, res){
        try{
            let note
            const title = req.body.title
            const description = req.body.description
            const taskStatus = req.body.taskStatus
            const owner = req.body.owner

            note = new Note({ title, description, taskStatus, owner })
            await note.save()   
            return res.status(201).json({message: 'added'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    //update note
    async updateNote(req, res){
        try{
            const id = req.params.id
            const note = await Note.findOne({_id: id})
            note.title = req.body.title
            note.description = req.body.description
            note.prioritet = req.body.prioritet
            note.taskStatus = req.body.taskStatus

            await note.save()

            return res.status(201).json(note)
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    //delete note
    async deleteNotes(req, res){
        try{
            const id = req.params.id
            await Note.deleteOne({_id: id})
            }catch(err){
                return res.status(500).json({message: err.message})
            }
            
            res.status(200).json({message: 'Note was delete'})
    }
}

module.exports = new NoteActions()