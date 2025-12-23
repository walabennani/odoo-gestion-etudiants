from odoo import models, fields

class GestionClasse(models.Model):
    _name = "gestion.classe"
    _description = "Classe"

    name = fields.Char(string="Nom Classe", required=True)
    niveau = fields.Char(string="Niveau")

    etudiant_id = fields.One2many("gestion.etudiant", "classe_id", string="Étudiants")
