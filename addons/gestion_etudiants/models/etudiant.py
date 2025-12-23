from odoo import models, fields

class Etudiant(models.Model):
    _name = 'gestion.etudiant'
    _description = 'Étudiant'

    name = fields.Char(string="Nom complet", required=True)
    email = fields.Char(string="Email")
    phone = fields.Char(string="Téléphone")
    date_naissance = fields.Date(string="Date de naissance")
    image_1920 = fields.Image(string="Photo")
    classe_id = fields.Many2one(
        'gestion.classe',
        string="Classe"
    )

    note_ids = fields.One2many(
        'gestion.note',
        'etudiant_id',
        string='Notes'
    )
