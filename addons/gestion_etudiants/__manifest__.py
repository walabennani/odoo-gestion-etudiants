{
'name': 'School',
'version': '1.0',
'category': 'School Management',
'summary': 'Gestion des étudiants, classes et notes',
'depends': ['base','web'],
'data': [
'security/ir.model.access.csv',
'views/menus.xml',
'views/etudiant_views.xml',
'views/classe_views.xml',
'views/note_views.xml',

],
'assets': {
'web.assets_backend': [
'gestion_etudiants/static/lib/bootstrap/css/bootstrap.min.css',
'gestion_etudiants/static/lib/bootstrap/js/bootstrap.bundle.min.js',
'gestion_etudiants/static/lib/chartjs/chart.min.js',
'gestion_etudiants/static/src/css/dashboard.css',
'gestion_etudiants/static/src/xml/dashboard.xml',
'gestion_etudiants/static/src/js/dashboard.js',


],
},
'installable': True,
'application': True,
}