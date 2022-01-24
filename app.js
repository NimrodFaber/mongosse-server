const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  port = 9000,
  student = require("./models/contact");
grade = require("./models/grades");

app.use(express.static("models"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://0.0.0.0:27017/mySchool")
  .then(() => {
    app.listen(port, () => {
      console.info(`listening on port ${port}`);
    });
  })
  .catch((e) => console.error(e));
/* 
app.get("/students", (req, res) => {
  res.send("hello");
}); */
let students = new student();
app.get("/student", (req, res) => {
  students = new student({
    name: "yosi",
    grade: 78,
    age: 27,
  });
  students.save((err, student) => {
    console.log(err);
    console.log(student);
    res.send("1111");
  });
});

app.get("/grades", (req, res) => {
  const grades = new grade({
    grade: 78,
    student_id: students.id,
  });
  grades.save((err, grades) => {
    console.log(err);
    console.log(grades);
    res.send("1111");
  });
});

app.get("/student/:name", (req, res) => {
  let studentName = req.params.name;
  student.find(
    {
      name: studentName,
    },
    function (err, student) {
      if (err) {
        console.log(err);
      } else {
        res.json(student);
      }
    }
  );
  students.save((err, student) => {
    console.log(err);
    console.log(student);
    res.send("1111");
  });
});

app.post("/student", (req, res) => {
  students = new student(req.body.name);
  students.save((err, student) => {
    console.log(err);
    console.log(student);
    res.send("1111");
  });
});
app.post("/student", (req, res) => {
  students = new student(req.body.name);
  students.delete((err, student) => {
    console.log(err);
    console.log(student);
    res.send("1111");
  });
});

app.get("/findstudentname", (req, res) => {
  student.find({ name: "nimrod" }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});
app.get("/findallstudentname", (req, res) => {
  student.find({}, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});
app.get("/update", (req, res) => {
  student.findOneAndUpdate({ name: "nimrod" }, { age: 150 }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
    }
  });
});

app.get("/deletthisone", (req, res) => {
  students.deleteOne({ name: "nimrod" }, function (err, student) {
    if (err) {
      console.log(err);
    } else {
      res.json(student);
    }
  });
});
app.get("/deletthisoneid", (req, res) => {
  students.deleteOne(
    { _id: "61ed4e231aa580c411070d8a" },
    function (err, student) {
      if (err) {
        console.log(err);
      } else {
        res.json(student);
      }
    }
  );
});
