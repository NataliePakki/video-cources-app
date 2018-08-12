const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start || 0,
			to = +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
		
			if (!!query.textFragment) {
				courses = courses.filter((course) => course.title && course.title.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
			}

		if (courses.length < to || !to) {
			to = courses.length;
		}
		courses = courses.sort(function(a, b) {
			if (new Date(a.creationDate).getTime() > new Date(b.creationDate).getTime()) {
				return 1;
			} else {
				return -1;
			}
		});
		courses = courses.slice(from, to);

		res.json(courses);
	});

	return router;
};
