define(['app'], function storeManager(app) {
    const STORE = 'SCDrdApp'
    var store = {};

    store.getStore = function getStore () {
        var store;

        try {
            store = JSON.parse(localStorage.getItem(STORE));
        }
        catch (e) {
            if (e instanceof SyntaxError)
                store = localStorage.SCDrdApp = {};
            else throw e;
        }

        return store;
    };

    store.setItem = function setItem(key, value) {
        var storeInstance = this.getStore();
        
        storeInstance[key] = value;

        localStorage.setItem(STORE, JSON.stringify(storeInstance));
    }

    return store;
})