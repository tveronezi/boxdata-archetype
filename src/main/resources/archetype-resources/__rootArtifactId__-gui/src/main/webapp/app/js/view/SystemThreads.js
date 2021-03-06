/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function () {
    'use strict';

    Ext.define('${rootArtifactId}.view.SystemThreads', {
        title: ${rootArtifactId}.i18n.get('application.threads'),
        extend: '${rootArtifactId}.ux.Chart',
        alias: 'widget.${rootArtifactId}-threads-panel',

        tools: [
            {
                itemId: 'refresh',
                type: 'refresh',
                handler: function (event, target, owner) {
                    owner.ownerCt.fireEvent('refreshpanel');
                }
            }
        ],

        getCategoryName: function (row) {
            return 't' + row.get('id');
        },

        legend: 'right',

        tooltip: function (params) {
            return '<b>' + params.seriesName + '</b>: ' + params.dataItem.get(params.seriesName);
        },

        xAxis: {
            'category-axis': {
                type: 'category'
            }
        },

        yAxis: {
            'count-axis': {
                right: true,
                type: 'column',
                tooltip: function (value) {
                    return this.tooltip.apply(this, arguments);
                }
            },
            'time-axis': {
                type: 'column',
                tooltip: function (value) {
                    return this.tooltip.apply(this, arguments);
                }
            }
        },

        getNonEmpty: function (row, column) {
            var value = row.get(column);
            if (value < 1) {
                return null;
            }
            return value;
        },

        getCountValue: function (row, column) {
            return this.getNonEmpty(row, column);
        },

        getTimeValue: function (row, column) {
            return this.getNonEmpty(row, column);
        },

        series: [
            {
                xId: 'category-axis',
                yId: 'count-axis',
                xField: function (row) {
                    return this.getCategoryName(row);
                },
                yField: function (row) {
                    return this.getCountValue(row, 'blockedCount');
                },
                seriesName: 'blockedCount'
            },
            {
                xId: 'category-axis',
                yId: 'time-axis',
                xField: function (row) {
                    return this.getCategoryName(row);
                },
                yField: function (row) {
                    return this.getTimeValue(row, 'blockedTime');
                },
                seriesName: 'blockedTime'
            },
            {
                xId: 'category-axis',
                yId: 'count-axis',
                xField: function (row) {
                    return this.getCategoryName(row);
                },
                yField: function (row) {
                    return this.getCountValue(row, 'waitedCount');
                },
                seriesName: 'waitedCount'
            },
            {
                xId: 'category-axis',
                yId: 'time-axis',
                xField: function (row) {
                    return this.getCategoryName(row);
                },
                yField: function (row) {
                    return this.getTimeValue(row, 'waitedTime');
                },
                seriesName: 'waitedTime'
            }
        ]

    });

}());
