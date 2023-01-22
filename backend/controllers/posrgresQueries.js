const pg = require('pg');

const config = {
  user: 'chelsea',
  database: 'comments',
  password: 'password',
  port: 5432,
  host: 'localhost',
};

const pool = new pg.Pool(config);

const getAll = (request, response) => {
  pool.query("SELECT * FROM commnts", (error, results) => {
    if (error) {
      console.log(pool);
      throw error;
    }
    response.status(200).json(JSON.stringify(results.rows));
  });
};

const addComment = (request, response) => {
  const comment = request.body.content;
  pool.query(
    `INSERT INTO comments (comment) VALUES ('${comment}')`,
    error => {
      if (error) {
        console.log(error);
        response.status(500).json("Internal server error");
      } else {
        response.status(201).json();
      }
    }
  );
};

const updateComment = (request, response) => {
  const id = request.params.id;
  const comment = request.body.content;
  pool.query(
    `UPDATE comments SET comment = '${comment}' WHERE id = '${id}'`,
    error => {
      if (error) {
        console.log(error);
        response.status(500).json("Internal server error");
      } else {
        response.status(201).json();
      }
    }
  );
};

const deleteComment = (request, response) => {
  const id = request.params.id;
  pool.query(`DELETE FROM comments WHERE id = '${id}'`,
  error => {
    if (error) {
      console.log(error);
      response.status(500).json("Internal server error");
    } else {
      response.status(201).json();
    }
  });
};

const postgresQueries = {
  getAll,
  addComment,
  updateComment,
  deleteComment
};

export default postgresQueries;