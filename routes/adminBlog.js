const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

/** Get all blogs in the blog table via '/blog' */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM blog;', (error, result) => {
        if(error)
          res.send(error);
        else{
          var results = {'blogs' : result.rows};
          res.render('pages/allBlogs', results);
        }
    })
})

/** Create New Blog page via '/blog/new' */
router.get('/new', (req,res) => res.render('pages/newBlog'));

/** Show content of a blog via '/blog/:title' */
router.get('/:title', (req,res) => {
    var getBlogQuery = `SELECT * FROM blog WHERE title='${req.params.title}';`;
    pool.query(getBlogQuery, (error, result) =>{
        if(error)
            res.send(error);
        else{
            var results = {'blogs': result.rows};
            res.render('pages/showBlog', results);
        }
    })
})

/** Get blog components in the blog table
 *  Redirect to /allBlogs page or homepage 
 */
router.post('/', (req,res) => {
    const{title, summary, content} = req.body;
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    console.log(content);
    var query = `INSERT INTO blog VALUES (DEFAULT, '${title}', '${summary}', '${content}', '${date}');`;
    pool.query(query, (error, result) => {
        if(error){
          res.send(error);
          console.log(error);
        }  
        else{
          res.redirect('/blog/');
        }
    });
});

/** Delete blog */
router.post('/del/:title', (req,res) => {
    var query = `DELETE FROM blog WHERE title='${req.params.title}'`;
    pool.query(query, (error,result) => {
        if(error){
          res.send(error);
        }  
        else{
          res.redirect('/blog/');
        } 
    })
})

/** Render /blog/edit/:title to edit page */
router.get('/edit/:title', (req,res) => {
    var query = `SELECT * FROM blog WHERE title='${req.params.title}';`
    pool.query(query, (error, result) => {
        if(error)
          res.send(error);
        else{
          var results = {'blogs' : result.rows};
          res.render('pages/editBlog', results);
        }
    })
})

/** Update blog edit in the blog table */
router.post('/edit/:title', (req,res) => {
    const{title, summary, content} = req.body;
    var editQuery = `UPDATE blog SET title='${title}', summary='${summary}', content='${content}' WHERE title='${req.params.title}';`;
    pool.query(editQuery, (error, result) =>{
        if(error)
          res.send(error);
        else{
          res.redirect(`/blog/${title}`);
        }
    })
})

module.exports = router;