import 'zone.js';

// Asynchrone Aufgaben
function myFancyAsyncOperations() {
    console.log('### Inside Zone:', Zone.current.name);

    // Beispiel mit setTimeout
    setTimeout(() => {
        console.log('###### Timeout completed');
    }, 1000);

    // Beispiel mit Fetch API (simuliert einen Netzwerkaufruf)
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            console.log('###### Fetch completed:', data);
        })
        .catch(error => {
            console.error('###### Fetch error:', error);
        });
}

// Definieren einer neuen custom Zone
const mySuperFancyCustomZone = Zone.current.fork({
    name: 'mySuperFancyCustomZone',
    onScheduleTask: (delegate, current, target, task) => {
        console.log(`+++Task scheduled: ${task.source}`);
        return delegate.scheduleTask(target, task);
    },
    onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
        console.log(`+++Task invoked: ${task.source}`);
        return delegate.invokeTask(target, task, applyThis, applyArgs);
    },
    onHasTask: (delegate, current, target, hasTaskState) => {
        if (!hasTaskState.macroTask && !hasTaskState.microTask) {
            // Keine ausstehenden Aufgaben mehr
            // => z.B wäre jetzt der Zeitpunkt, um Daten neu zu rendern :)
            console.log('+++All asynchronous tasks completed');
        } else {
            console.log('+++Has pending tasks:', hasTaskState);
        }
        delegate.hasTask(target, hasTaskState);
    },
    onInvoke: (parentZoneDelegate, currentZone, targetZone, callback, applyThis, applyArgs, source) => {
        console.log(`+++Zone ${currentZone.name} is invoking the task`);
        return parentZoneDelegate.invoke(targetZone, callback, applyThis, applyArgs, source);
    }
});

console.log('*** Outside of any Zone (before invoking)');

// Verwenden der neuen Zone für asynchrone Vorgänge
mySuperFancyCustomZone.run(myFancyAsyncOperations);

console.log('*** Outside of any Zone (after invoking)');