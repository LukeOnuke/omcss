let subscribers = [];

export let latestError = undefined;

export function subscribe(func) {
    subscribers.push(func);
    console.debug("Added to report subscribers", func, subscribers);
}

export function unsubscribe(func) {
    subscribers.splice(subscribers.indexOf(func), 1);
}

function triggerEvent(eventBody) {
    console.debug("Report event triggered", eventBody);
    subscribers.forEach((e) => {
        console.debug("Sending event body to", e);
        e.apply(this, [eventBody]);
    });
}

export function report(header, body, severity) {
    latestError = { header: header, body: body, severity: severity, time: Date.now() };
    triggerEvent(latestError);
}

export const Severity = {
    fatal: "fatal",
    warn: "warn",
    info: "info"
};