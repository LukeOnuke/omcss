function militaryTime(number) {
    return number.toString().padStart(2, '0');
}

// Known server list
export const knownServers = [{
        "alias": "hideysmp",
        "serverUrl": "api.pequla.one/hideysmp"
    },
    {
        "alias": "commando",
        "serverUrl": "api.pequla.one/commando"
    }
];

export { militaryTime };