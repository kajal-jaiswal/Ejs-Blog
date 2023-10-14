import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
const homeStartingContent =
  " Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const aboutContent =
  "It is a long established fact that a reader will beon distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by acc";

const contactContent =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let posts = [];


app.get('/posts/:topics',(req,res)=>{

 const requiredTitle = _.lowerCase(req.params.topics);

 posts.forEach((element) => {
  const storedTitle = _.lowerCase(element.title);



  if(requiredTitle === storedTitle){
    res.render("post.ejs",{
      postTitle: element.title,
      postBody: element.content,
    })
  }
 });

})
app.get("/", (req, res) => {
  res.render("home.ejs", {
    Home: homeStartingContent,
    post: posts,
    
  });
});
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    About: aboutContent,
  });
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    Contacts: contactContent,
  });
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
    
});
app.post("/compose",(req,res) =>{
   
    const post = {
        title :req.body["pTitle"],
        content :req.body["pBody"]
    }
    posts.push(post);
    res.redirect("/");


})
app.listen(3000, () => {
  console.log("server has been running on port 3000");

});
