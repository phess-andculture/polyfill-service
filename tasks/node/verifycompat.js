'use strict';

const fs = require('graceful-fs');
const path = require('path');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);
const _ = require('lodash');
const UA = require('../../lib/UA');
const compatFile = path.join(__dirname, '/../../docs/assets/compat.json');

(async function () {
	try {
		let filedata = await readFile(compatFile, 'utf-8');
		filedata = JSON.parse(filedata);
		const features = _.map(filedata, (browsers, feature) => {
			return _.reduce(_.map(browsers, (data, browser) => {
				return {
					[feature]: _.reduce(_.flattenDeep(_.map(data, (status, version) => {
						return {
							[browser + '/' + version]: status
						};
					})), (obj, currentObj) => {
						return _.merge(obj, currentObj);
					}, {})
				};
			}), (obj, currentObj) => {
				return _.merge(obj, currentObj);
			}, {});
		});

		for (const feature of features) {
			const featureName = Object.keys(feature)[0];
			const browsersdata = feature[featureName];
			const browsers = Object.keys(browsersdata);
			let meta = await readFile(path.join(__dirname, '/../../polyfills/__dist/', featureName, 'meta.json'), 'utf-8');
			meta = JSON.parse(meta);
			for (const browser of browsers) {
				const ua = new UA(browser);
				const isBrowserMatch = (meta.browsers && meta.browsers[ua.getFamily()] && ua.satisfies(meta.browsers[ua.getFamily()]));
				const status = browsersdata[browser];
				if (status === 'native' && isBrowserMatch) {
					console.log(`Serving ${featureName} to ${browser} when it is natively supported.`)
				}

				if (status === 'polyfilled' && !isBrowserMatch) {
					console.log(`Not serving ${featureName} to ${browser} when it requires polyfill.`)
				}

			}
		}
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
}());
