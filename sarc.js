const host = 'https://sarc.onrender.com'
// const host = 'http://localhost:8000'
const sarc = {
    course: undefined,
    create(name, description, students, skills) {
        return new Promise( function(resolve, reject) {
            const info = {
                name: name,
                description: description, 
                students: students,
                skills: skills
            }

            fetch(`${host}/snippets/create/course/`, {
                method: "POST",
                body: JSON.stringify(info), 
                headers: { "Content-Type": "application/json" }
            })
            .then((response) => response.json())
            .then((course) => {
                sarc.course = course;
                console.log(course)
                document.getElementById('annotation').innerHTML = "Curso criado, treinando..." 
                resolve(course)
            })
            .catch((error) => { 
                console.error("Error:", error) 
                reject(error)
            });
        });
    },
    fit(data) {
        return new Promise( function(resolve, reject) {
            fetch(`${host}/snippets/create/model/`, {
                method: "POST",
                body: JSON.stringify({ 'course': sarc.course.pk, 'data': data }), 
                headers: { "Content-Type": "application/json" }
            })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById('annotation').innerHTML = "Curso treinado, pode responder o questionário" 
                resolve(data)
            })
            .catch((error) => { 
                console.error("Error:", error) 
                reject(error)
            });
        });
    },
    predict(answers) {
        return new Promise( function(resolve, reject) {
            const info = {
                course: sarc.course.pk,
                answers: answers
            }

            fetch(`${host}/snippets/update/course/`, {
                method: "POST",
                body: JSON.stringify(info), 
                headers: { "Content-Type": "application/json" }
            })
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => { 
                console.error("Error:", error)
                reject(error)
            });
        });
    }
};

export default sarc;