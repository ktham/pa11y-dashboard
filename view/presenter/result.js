'use strict';

var _ = require('underscore');

module.exports = presentResult;

function presentResult (result) {

    // Add additional info
    result.href = '/' + result.task + '/' + result.id;
    result.hrefCsv = '/' + result.task + '/' + result.id + '.csv';
    result.hrefJson = '/' + result.task + '/' + result.id + '.json';

    // Parse date
    result.date = new Date(result.date);

    // Split out message types
    if (result.results) {
        var groupedByType = _.groupBy(result.results, 'type');
        ['error', 'warning', 'notice'].forEach(function (type) {
            var pluralType = type + 's';
            var results = groupedByType[type] || [];
            var groupedByCode = _.groupBy(results, 'code');
            result[pluralType] = _.keys(groupedByCode).map(function (group) {
                var firstMessage = groupedByCode[group][0];
                firstMessage.count = groupedByCode[group].length;
                return firstMessage;
            });
        });
    }

    return result;
}
