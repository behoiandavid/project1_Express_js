const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;



app.use(express.static(path.join(__dirname, "public")));


const users = [
    { id: 1, name: "Іван", age: 25 },
    { id: 2, name: "Марія", age: 30 },
    { id: 3, name: "Олег", age: 20 },
];

const articles = [
    { id: 1, title: "Node.js основи", content: "Node.js — це JavaScript на сервері." },
    { id: 2, title: "Express.js", content: "Express — популярний фреймворк." },
];


app.set("views", path.join(__dirname, "views/pug"));
app.set("view engine", "pug");

app.get("/users", (req, res) => {
    res.render("users", { users });
});

app.get("/users/:userId", (req, res) => {
    const user = users.find(u => u.id == req.params.userId);
    if (!user) return res.status(404).send("Користувача не знайдено");
    res.render("user", { user });
});


app.engine("ejs", require("ejs").__express);
app.set("views", path.join(__dirname, "views")); 

app.get("/articles", (req, res) => {
    res.render("ejs/articles.ejs", { articles });
});

app.get("/articles/:articleId", (req, res) => {
    const article = articles.find(a => a.id == req.params.articleId);
    if (!article) return res.status(404).send("Статтю не знайдено");
    res.render("ejs/article.ejs", { article });
});


app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});