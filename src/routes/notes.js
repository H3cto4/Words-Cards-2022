const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes/agregar', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    //let id = req.params.id;
    console.log(req.body);
    const {palabra, tipo, significado} = req.body
    const errors = [];
    if(!palabra) {
        errors.push({texto: 'Escriba una palabra.'});
    }
    if(!tipo) {
        errors.push({texto: 'Escriba un tipo.'});
    }
    if(!significado) {
        errors.push({texto: 'Escriba un significado.'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            palabra,
            tipo,
            significado
        });
    } else {
        const newNote = new Note({palabra, tipo, significado});
        //console.log(newNote)
        await newNote.save();
        res.redirect('/notes')
        // res.send('Palabra Guardada.');
    }   
})

router.get('/notes',async (req, res) => {
        //res.send('Notas de la Base de Datos');
        const notes = await Note.find().sort({date: 'desc'});
        res.render('notes/all-notes',{notes});
    }
);

router.get('/notes/edit/:id', async (req, res) =>{
     const note = await Note.findById(req.params.id);
     res.render('/notes/edit-note', {note});  

});

router.put('/notes/edit/:id', async (req, res) => {
        const { palabra, tipo, significado } = req.body;
        Note.findByIdAndUpdate(req.params.id, {palabra, tipo, significado});
        res.redirect('/notes');

})

router.delete('/notes/delete/:id', async (req, res) => {

        await Note.findByIdAndDelete(req, params.id);
        redirect('/notes');

});



module.exports = router;
