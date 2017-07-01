/**
 * Created by claudia on 24.06.17.
 */
shared = (function () {
    "use strict";

    function _sessionValue(key, value, def = undefined) {
        let val = sessionStorage.getItem(key) || def;
        if (!val) {
            sessionStorage.setItem(key, value);
        }
        return val;
    }

    return {
        sessionValue: _sessionValue
    };
}() || {});