from odoo import models, fields

class Note(models.Model):
    _name = "gestion.note"
    _description = "Note"

    note = fields.Float(string="Note", required=True)
    matiere = fields.Char(string="Matière", required=True)

    etudiant_id = fields.Many2one(
        'gestion.etudiant',
        string='Étudiant',
        required=True
    )
