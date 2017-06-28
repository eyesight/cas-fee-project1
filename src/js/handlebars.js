/**
 * Created by claudia on 20.06.17.
 */
view = (function() {
    'use strict';
    function _setHandlebarsHelper() {
        Handlebars.registerHelper('ratingCounter', function () {
            let ratingNumber = Handlebars.escapeExpression(this.rating);
            let stars = "";
            switch (ratingNumber) {
                case "1":
                    stars = "★☆☆☆☆";
                    break;
                case "2":
                    stars = "★★☆☆☆";
                    break;
                case "3":
                    stars = "★★★☆☆";
                    break;
                case "4":
                    stars = "★★★★☆";
                    break;
                case "5":
                    stars = "★★★★★";
                    break;
                default:
                    stars = "keine Priorität";
            }
            return new Handlebars.SafeString(
                stars
            );
        });
        Handlebars.registerHelper('FormatedDate', function (date, language) {
            moment.locale(language);
            let momentDate = moment(date);
            let today = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
            let days = moment(date, "LLLL");
            let calendarDate = moment(date).calendar();
            let dateDiff = momentDate.diff(today, 'days');
            if (dateDiff > 0) {
                return new Handlebars.SafeString('<span> Erledigen bis am <br>' + calendarDate + ' </span>');
            } else if (dateDiff == 0) {
                return 'Heute erledigen';
            } else {
                return new Handlebars.SafeString('<span class="outdated"> Überfällig seit <br>' + calendarDate + ' </span>');
            }
        });

        Handlebars.registerHelper('FormatedDateSimple', function (date, language) {
            moment.locale(language);
            let formatedDate = moment(date).format('L');
            return formatedDate;
        });
    }

    return {
        setHandlebarsHelper: _setHandlebarsHelper
    };
}() || {});