/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart, onMounted, useRef } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class Dashboard extends Component {
    setup() {
        this.orm = useService("orm");
        this.state = useState({
            students: 0,
            classes: 0,
            notes: 0,
            average: 0,
            classNames: [],
            classAverages: [],
        });

        onWillStart(async () => {
            // COUNTS
            this.state.students = await this.orm.searchCount("gestion.etudiant", []);
            this.state.classes = await this.orm.searchCount("gestion.classe", []);

            const notes = await this.orm.searchRead(
                "gestion.note",
                [],
                ["note", "etudiant_id"]
            );
            this.state.notes = notes.length;

            if (notes.length) {
                const sum = notes.reduce((a, n) => a + n.note, 0);
                this.state.average = (sum / notes.length).toFixed(2);
            }

            // FETCH CLASSES
            const classes = await this.orm.searchRead(
                "gestion.classe",
                [],
                ["name", "etudiant_id"]
            );

            this.state.classNames = classes.map(c => c.name);

            // COMPUTE AVERAGES PER CLASS
            this.state.classAverages = classes.map(cls => {
                let classNotes = [];

                for (const studentId of cls.etudiant_id) {
                    const studentNotes = notes.filter(
                        n => n.etudiant_id && n.etudiant_id[0] === studentId
                    );
                    classNotes.push(...studentNotes);
                }

                if (!classNotes.length) return 0;

                const total = classNotes.reduce((a, n) => a + n.note, 0);
                return (total / classNotes.length).toFixed(2);
            });
        });

        onMounted(() => {
            const canvas = document.getElementById("class-chart");
            if (!canvas) return;

            new Chart(canvas, {
                type: "bar",
                data: {
                    labels: this.state.classNames,
                    datasets: [{
                        label: "Moyenne des notes",
                        data: this.state.classAverages,
                        backgroundColor: "#0f2e8b",
                    }],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                },
            });
        });
    }
}

// Link template
Dashboard.template = "gestion_etudiants.Dashboard";

// Register client action
registry.category("actions").add("dashboard_main", Dashboard);