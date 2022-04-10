const client = require("../connection");

const getDirectors = (req, res) => {
  client.query("SELECT * FROM director", (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(404).send({ error: "Technical issue" });
    } else {
      res.status(200).send(result.rows);
    }
  });
};
const insertUser = async (fullname, description, imageurl) => {
  try {
    const data = await client.query(
      `INSERT INTO "director" ("fullname", "description","imageurl")  
             VALUES ($1,$2,$3) RETURNING *`,
      [fullname, description, imageurl]
    );
    return { data: data.rows[0] };
  } catch (error) {
    return { error };
  }
};

const addNewDirector = async (req, res) => {
  const { fullname, description, imageurl } = req.body;
  const data = await insertUser(fullname, description, imageurl);
  if (data.data) {
    res.status(200).send(data);
  } else {
    res.status(404).send({ error: "technical issue" });
  }
};

const getDirectorById = (req, res) => {
  const directorId = req.params.id;
  const queryString = `SELECT * FROM director WHERE id=${directorId}`;
  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ error: "Technical issue" });
    } else {
      console.log(result);
      return res.status(200).send(result.rows);
    }
  });
};

const editDirector = (req, res) => {
  const directorId = req.params.id;
  const { fullname, description, imageurl } = req.body;
  const queryString = `UPDATE director SET fullname='${fullname}', description = '${description}', imageurl = '${imageurl}' WHERE id='${directorId}' RETURNING *`;
  client.query(queryString, (error, result) => {
    if (error || result.rowCount == 0) {
      res.status(404).send({ error: "Technical issue" });
    } else {
      res.status(200).send({ data: result.rows[0] });
    }
  });
};
const deleteDirector = (req, res) => {
  const directorId = req.params.id;
  const queryString = `DELETE FROM director WHERE id='${directorId}' RETURNING *`;
  client.query(queryString, (error, result) => {
    if (error || result.rowCount === 0) {
      return res.sendStatus(500).send({error:'Technical issue'});
    } else {
      return res.status(200).send({data:result.rows[0]});
    }
  });
};

module.exports = {
  getDirectors,
  addNewDirector,
  getDirectorById,
  editDirector,
  deleteDirector,
};
