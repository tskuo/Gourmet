import { Router } from 'express';

// import model
import { Article } from '../models';

const articleRouter = new Router();

/*
articleSchema = {
  id: String,
  title: String,
  author: String,
  userId: String,
  tags: [],
  location: String,
  content: String,
  popularity: Number,
}
*/

// /api/articles/
articleRouter.get('/', (req, res) => {
	// Get all articles
	Article.find({}).sort({popularity: -1}).exec((err, articles) => {
		if(err) return res.status(500).send(err);
		return res.json(articles);
	});
});

articleRouter.get('/query', (req, res) => {
  // Get articles using query
  // Example: /api/articles/query?title=john&...
  // There are "id, title, author, tags, location, popularity, num" to be in a query.
  console.log('get query: ', req.query);
  let query = req.query;
  let num = 1;
  let constraint = { popularity: -1 };

  if(query.hasOwnProperty('num')) {
    num = parseInt(query.num);
    delete query['num'];
  }
  if(query.hasOwnProperty('userId')) {
    constraint = { created_at: -1 };
  }

  Article.find(query).limit(num).sort(constraint).exec((err, articles) => {
    if(err) return res.status(500).send(err);
    return res.json(articles);
  });
});

articleRouter.get('/:id', (req, res) => {
	// Get one article by id
	const id = req.params.id;
	Article.findById(id, (err, articles) => {
    if(err) res.status(500).send(err);
    return res.json(articles);
  });
});

articleRouter.post('/', (req, res) => {
	// Post one article
  console.log('post article: ', req.body);
	const { title, content, tags, author, location, userId } = req.body;
	let { popularity } = req.body;
	popularity = +popularity;

	Article.create({
		title, content, tags, author,	location, userId, popularity
	}, (err, article) => {
		if(err) res.status(500).send(err);
    return res.json(article);
	});
});

articleRouter.put('/:id', (req, res) => {
	// Update one article by id
	const { title, content, tags, author, location } = req.body;
  const query = { _id: req.params.id };

console.log('put article', req.body);

  Article.findOneAndUpdate(query, { title, content, tags, author },
    { new: true }, (err, article) => {
      if(err) res.status(500).send(err);
      return res.json(article);
  });
});

articleRouter.delete('/:id', (req, res) => {
	// Delete one article by id
  const id = req.params.id;

  Article.findByIdAndRemove(id, (err, article) => {
    if(err) res.status(500).send(err);
    return res.send('  content of id: ' + id + ' is : \n' + article + '\n  has been removed.');
  });
});

export default articleRouter;
