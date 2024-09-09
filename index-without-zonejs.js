// Herausforderung: Manuell verfolgen, ob alle asynchronen Aufgaben abgeschlossen sind
let tasksCompleted = 0;

function taskCompleted() {
    tasksCompleted++;
    if (tasksCompleted === 2) {
        console.log('+++All asynchronous tasks completed');
    }
}

// Manuelle Überwachung der asynchronen Aufgaben
setTimeout(() => {
    console.log('###### Timeout completed');
    taskCompleted();
}, 1000);

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => {
        console.log('###### Fetch completed:', data);
        taskCompleted();
    })
    .catch(error => {
        console.error('###### Fetch error:', error);
        taskCompleted();
    });

console.log('***Monitoring asynchronous tasks manually...');